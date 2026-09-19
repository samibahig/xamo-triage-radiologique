import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface TranslationContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['fr']) => string;
}

const translations = {
  fr: {
    // Header & Consent
    'header.title': 'Vous avez un problème de santé?',
    'header.subtitle': 'Laissez-nous vous guider vers le bon examen radiologique à discuter avec votre médecin.',
    'consent.warning': 'En cas d\'urgence médicale (douleur thoracique intense, difficulté à respirer, faiblesse soudaine), appelez immédiatement le 911 ou rendez-vous aux urgences.',
    'consent.educationOnly': 'Ceci est un outil éducatif. Il ne remplace pas une consultation médicale, ne pose pas de diagnostic et ne prescrit aucun examen. Seul un médecin peut décider de la pertinence d\'un examen radiologique.',
    'consent.accept': 'Je comprends que cet outil est uniquement à but éducatif.',
    'action.start': 'Commencer l\'évaluation',
    
    // Form wizard
    'form.step1.title': 'Vos symptômes',
    'form.symptoms.label': 'Décrivez ce qui vous amène',
    'form.symptoms.placeholder': 'Ex: J\'ai mal au genou droit depuis 3 semaines, surtout quand je monte les escaliers...',
    'form.duration.label': 'Depuis combien de temps avez-vous ces symptômes?',
    'form.duration.placeholder': 'Ex: 3 jours, 2 semaines, 1 mois...',
    
    'form.step2.title': 'Votre profil',
    'form.age.label': 'Quel est votre âge?',
    'form.age.placeholder': 'Ex: 45',
    'form.sex.label': 'Sexe biologique',
    'form.sex.female': 'Femme',
    'form.sex.male': 'Homme',
    'form.sex.intersex': 'Intersexe',
    'form.sex.preferNotToSay': 'Préfère ne pas répondre',
    'form.sex.other': 'Autre',
    'form.pregnancy.label': 'Possibilité de grossesse?',
    'form.pregnancy.yes': 'Oui',
    'form.pregnancy.no': 'Non',
    'form.pregnancy.unknown': 'Je ne sais pas',
    'form.pregnancy.notApplicable': 'Non applicable',

    'form.step3.title': 'Contexte médical',
    'form.conditions.label': 'Avez-vous des problèmes de santé connus?',
    'form.conditions.placeholder': 'Ex: Diabète, hypertension, antécédent de cancer... (Optionnel)',
    'form.medications.label': 'Prenez-vous des médicaments?',
    'form.medications.placeholder': 'Ex: Aspirine, Metformine... (Optionnel)',
    'form.imaging.label': 'Avez-vous passé des examens radiologiques récemment?',
    'form.imaging.placeholder': 'Ex: Radiographie du genou il y a 2 ans... (Optionnel)',

    'action.next': 'Suivant',
    'action.back': 'Retour',
    'action.submit': 'Analyser ma situation',

    // Loading & Results
    'loading.analyzing': 'Analyse de vos symptômes...',
    'loading.consulting': 'Consultation de la base de connaissances radiologiques...',
    'loading.preparing': 'Préparation des suggestions...',
    
    'result.title': 'Voici ce que vous pourriez discuter avec votre médecin',
    'result.emergency.title': 'Attention médicale immédiate recommandée',
    'result.urgency.routine': 'Routine',
    'result.urgency.discussSoon': 'À discuter prochainement',
    'result.urgency.urgent': 'Urgent',
    'result.urgency.emergency': 'Urgence',
    
    'result.exams.title': 'Examens potentiels à considérer',
    'result.exams.modality': 'Modalité',
    'result.exams.why': 'Pourquoi cet examen?',
    'result.exams.priority.possible': 'Possible',
    'result.exams.priority.discuss_soon': 'À discuter',
    'result.exams.priority.emergency': 'Urgent',
    
    'result.questions.title': 'Questions à poser à votre médecin',
    'result.nextSteps.title': 'Prochaines étapes',
    'result.safetyNote.title': 'Note de sécurité importante',
    'action.restart': 'Nouvelle évaluation',
  },
  en: {
    // Header & Consent
    'header.title': 'Experiencing a health issue?',
    'header.subtitle': 'Let us guide you toward the right radiological exam to discuss with your doctor.',
    'consent.warning': 'In case of a medical emergency (severe chest pain, difficulty breathing, sudden weakness), call 911 immediately or go to the nearest emergency room.',
    'consent.educationOnly': 'This is an educational tool. It does not replace a medical consultation, provide a diagnosis, or prescribe any exams. Only a physician can determine if a radiological exam is appropriate.',
    'consent.accept': 'I understand this tool is for educational purposes only.',
    'action.start': 'Start evaluation',
    
    // Form wizard
    'form.step1.title': 'Your symptoms',
    'form.symptoms.label': 'Describe what brings you here',
    'form.symptoms.placeholder': 'Ex: I have been experiencing right knee pain for 3 weeks, especially when climbing stairs...',
    'form.duration.label': 'How long have you had these symptoms?',
    'form.duration.placeholder': 'Ex: 3 days, 2 weeks, 1 month...',
    
    'form.step2.title': 'Your profile',
    'form.age.label': 'How old are you?',
    'form.age.placeholder': 'Ex: 45',
    'form.sex.label': 'Biological sex',
    'form.sex.female': 'Female',
    'form.sex.male': 'Male',
    'form.sex.intersex': 'Intersex',
    'form.sex.preferNotToSay': 'Prefer not to say',
    'form.sex.other': 'Other',
    'form.pregnancy.label': 'Possibility of pregnancy?',
    'form.pregnancy.yes': 'Yes',
    'form.pregnancy.no': 'No',
    'form.pregnancy.unknown': 'I don\'t know',
    'form.pregnancy.notApplicable': 'Not applicable',

    'form.step3.title': 'Medical context',
    'form.conditions.label': 'Do you have any known health conditions?',
    'form.conditions.placeholder': 'Ex: Diabetes, hypertension, history of cancer... (Optional)',
    'form.medications.label': 'Are you taking any medications?',
    'form.medications.placeholder': 'Ex: Aspirin, Metformin... (Optional)',
    'form.imaging.label': 'Have you had any recent imaging exams?',
    'form.imaging.placeholder': 'Ex: Knee X-ray 2 years ago... (Optional)',

    'action.next': 'Next',
    'action.back': 'Back',
    'action.submit': 'Analyze my situation',

    // Loading & Results
    'loading.analyzing': 'Analyzing your symptoms...',
    'loading.consulting': 'Consulting radiological knowledge base...',
    'loading.preparing': 'Preparing suggestions...',
    
    'result.title': 'Here is what you could discuss with your doctor',
    'result.emergency.title': 'Immediate medical attention recommended',
    'result.urgency.routine': 'Routine',
    'result.urgency.discussSoon': 'Discuss soon',
    'result.urgency.urgent': 'Urgent',
    'result.urgency.emergency': 'Emergency',
    
    'result.exams.title': 'Potential exams to consider',
    'result.exams.modality': 'Modality',
    'result.exams.why': 'Why this exam?',
    'result.exams.priority.possible': 'Possible',
    'result.exams.priority.discuss_soon': 'To discuss',
    'result.exams.priority.emergency': 'Urgent',
    
    'result.questions.title': 'Questions to ask your doctor',
    'result.nextSteps.title': 'Next steps',
    'result.safetyNote.title': 'Important safety note',
    'action.restart': 'Start a new evaluation',
  }
};

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: keyof typeof translations['fr']) => {
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
