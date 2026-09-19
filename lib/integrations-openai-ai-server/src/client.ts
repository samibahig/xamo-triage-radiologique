import OpenAI from "openai";

const useHuggingFace = process.env.AI_PROVIDER === "huggingface";
const apiKey = useHuggingFace
  ? process.env.HUGGINGFACE_TOKEN
  : process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
const baseURL = useHuggingFace
  ? "https://router.huggingface.co/v1"
  : process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;

if (!apiKey || !baseURL) {
  throw new Error(
    "Configure HUGGINGFACE_TOKEN or the Replit OpenAI integration variables.",
  );
}

export const openai = new OpenAI({
  apiKey,
  baseURL,
});
