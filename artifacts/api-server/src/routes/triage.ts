import { Router, type IRouter } from "express";
import {
  AnalyzeTriageBody,
  AnalyzeTriageResponse,
} from "@workspace/api-zod";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

const redFlagPatterns = [
  /\b(chest pain|douleur (à|a) la poitrine|douleur thoracique)\b/i,
  /\b(can'?t breathe|cannot breathe|difficulty breathing|shortness of breath|difficulté (à|a) respirer|essoufflement sévère)\b/i,
  /\b(stroke|avc|face droop|slurred speech|paralysie soudaine)\b/i,
  /\b(unconscious|unresponsive|perte de connaissance|inconscient)\b/i,
  /\b(severe bleeding|saignement abondant)\b/i,
];

router.post("/triage/analyze", async (req, res) => {
  const parsed = AnalyzeTriageBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid triage information." });
    return;
  }

  const input = parsed.data;
  const hasRedFlag = redFlagPatterns.some((pattern) =>
    pattern.test(input.symptoms),
  );
  const isFrench = input.language === "fr";

  if (hasRedFlag) {
    const emergencyResult = {
      emergency: true,
      urgency: "emergency" as const,
      message: isFrench
        ? "Certains symptômes décrits peuvent nécessiter une évaluation urgente. Ne retardez pas les soins pour obtenir un examen d’imagerie."
        : "Some symptoms you described may require urgent assessment. Do not delay care to obtain an imaging test.",
      exams: [],
      questions: isFrench
        ? [
            "Dois-je appeler le 911 ou me rendre immédiatement à l’urgence?",
            "Quels symptômes dois-je signaler en priorité à l’équipe médicale?",
          ]
        : [
            "Should I call 911 or go to the emergency department now?",
            "Which symptoms should I report first to the medical team?",
          ],
      nextSteps: isFrench
        ? [
            "Appelez le 911 ou les services d’urgence locaux si la douleur est importante, soudaine, ou accompagnée d’essoufflement, malaise, confusion ou faiblesse.",
            "Ne conduisez pas vous-même si vous vous sentez faible, étourdi ou très essoufflé.",
          ]
        : [
            "Call 911 or local emergency services if the pain is severe, sudden, or accompanied by shortness of breath, faintness, confusion, or weakness.",
            "Do not drive yourself if you feel weak, dizzy, or very short of breath.",
          ],
      safetyNote: isFrench
        ? "Ce résultat est éducatif et ne remplace pas une évaluation médicale. Un médecin décide si une imagerie est indiquée."
        : "This result is educational and does not replace a medical assessment. A physician decides whether imaging is appropriate.",
    };

    res.json(emergencyResult);
    return;
  }

  const languageInstruction =
    input.language === "fr"
      ? "Réponds entièrement en français canadien clair."
      : "Respond entirely in clear Canadian English.";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
      max_completion_tokens: 8192,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a cautious radiology education assistant for patients. ${languageInstruction}
Your role is NOT to diagnose, prescribe, recommend that a patient obtain imaging directly, or replace a clinician. Explain at most three imaging modalities that a physician might consider based on the history, including when no imaging may be needed. Always mention that the physician decides after examination.
Escalate emergency warning signs. Prefer the least invasive appropriate modality and consider radiation, pregnancy potential, age, and prior imaging. Do not invent facts.
Return only JSON matching:
{"emergency":boolean,"urgency":"routine"|"discuss_soon"|"urgent"|"emergency","message":string,"exams":[{"name":string,"why":string,"modality":string,"priority":"possible"|"discuss_soon"|"emergency"}],"questions":string[],"nextSteps":string[],"safetyNote":string}
Questions should help the patient speak with a physician. safetyNote must say the content is educational, not a diagnosis or prescription, and only a physician can decide.`,
        },
        {
          role: "user",
          content: JSON.stringify(input),
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Empty AI response");
    }

    const result = AnalyzeTriageResponse.parse(JSON.parse(content));
    res.json(result);
  } catch (error) {
    req.log.error({ err: error }, "Triage analysis failed");
    res.status(500).json({
      error: isFrench
        ? "L’analyse est temporairement indisponible. Veuillez réessayer."
        : "The analysis is temporarily unavailable. Please try again.",
    });
  }
});

export default router;