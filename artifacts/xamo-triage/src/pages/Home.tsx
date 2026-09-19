import React, { useState } from 'react';
import { useTranslation, TranslationProvider } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, ArrowRight, ArrowLeft, Activity, Info, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import {
  useAnalyzeTriage,
  TriageInputSex,
  TriageInputPregnancyPotential,
  type TriageInput,
  type TriageResult,
  type TriageInputLanguage,
} from '@workspace/api-client-react';
import { motion, AnimatePresence } from 'framer-motion';

function XamoLogo() {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Simplified conceptual Xamo logo */}
        <div className="absolute inset-0 border-[3px] border-primary transform -rotate-12 rounded-sm" />
        <div className="absolute inset-0 border-[3px] border-secondary transform rotate-12 rounded-sm" />
        <span className="font-bold text-xl text-primary tracking-tighter z-10">X</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold leading-none tracking-tight text-foreground uppercase">XAMO</span>
        <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-medium">Radiologie</span>
      </div>
    </div>
  );
}

function LanguageToggle() {
  const { language, setLanguage } = useTranslation();
  return (
    <div className="flex items-center bg-white rounded-full p-1 border border-border shadow-sm">
      <button 
        onClick={() => setLanguage('fr')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${language === 'fr' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
      >
        FR
      </button>
      <button 
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${language === 'en' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
      >
        EN
      </button>
    </div>
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const { t } = useTranslation();
  const [consentAccepted, setConsentAccepted] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {t('header.title')}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          {t('header.subtitle')}
        </p>
      </div>

      <Card className="border-destructive/30 bg-destructive/5 overflow-hidden">
        <div className="h-1 bg-destructive w-full" />
        <CardContent className="p-6 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
          <p className="text-sm font-medium text-destructive md:text-base leading-relaxed">
            {t('consent.warning')}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-primary/10">
        <CardContent className="p-6 md:p-8 space-y-8">
          <div className="flex gap-4">
            <Info className="w-6 h-6 text-primary shrink-0" />
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {t('consent.educationOnly')}
            </p>
          </div>

          <div className="flex items-start space-x-3 pt-4 border-t">
            <Checkbox 
              id="consent" 
              checked={consentAccepted}
              onCheckedChange={(c) => setConsentAccepted(c as boolean)}
              className="mt-1 w-6 h-6 rounded-md"
            />
            <Label htmlFor="consent" className="text-sm md:text-base font-medium leading-snug cursor-pointer">
              {t('consent.accept')}
            </Label>
          </div>

          <Button 
            size="lg" 
            className="w-full text-base h-14 font-semibold shadow-md"
            disabled={!consentAccepted}
            onClick={onStart}
          >
            {t('action.start')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function FormWizard({ onSubmit }: { onSubmit: (data: TriageInput) => void }) {
  const { t, language } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<TriageInput>>({});

  const updateForm = <K extends keyof TriageInput>(key: K, value: TriageInput[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const isStep1Valid = formData.symptoms && formData.symptoms.length >= 10 && formData.duration;
  const isStep2Valid = formData.age !== undefined && formData.sex && formData.pregnancyPotential;
  
  const handleNext = () => {
    if (step === 1 && isStep1Valid) setStep(2);
    if (step === 2 && isStep2Valid) setStep(3);
  };

  const handleSubmit = () => {
    if (isStep1Valid && isStep2Valid) {
      onSubmit({
        ...formData,
        knownConditions: formData.knownConditions || '',
        medications: formData.medications || '',
        previousImaging: formData.previousImaging || '',
        language: language as TriageInputLanguage
      } as TriageInput);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i <= step ? 'bg-primary w-12' : 'bg-muted w-6'}`} />
          ))}
        </div>
        <span className="text-sm font-semibold text-muted-foreground">Étape {step} / 3</span>
      </div>

      <Card className="shadow-xl border-border/50">
        <CardContent className="p-6 md:p-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-foreground">{t('form.step1.title')}</h2>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-base">{t('form.symptoms.label')}</Label>
                      <Textarea 
                        placeholder={t('form.symptoms.placeholder')}
                        value={formData.symptoms || ''}
                        onChange={(e) => updateForm('symptoms', e.target.value)}
                        className="h-32 text-base focus-visible:ring-secondary/50 border-input"
                      />
                      {formData.symptoms && formData.symptoms.length < 10 && (
                        <p className="text-xs text-secondary font-medium">Veuillez décrire un peu plus vos symptômes (minimum 10 caractères).</p>
                      )}
                    </div>
                    <div className="space-y-3">
                      <Label className="text-base">{t('form.duration.label')}</Label>
                      <Input 
                        placeholder={t('form.duration.placeholder')}
                        value={formData.duration || ''}
                        onChange={(e) => updateForm('duration', e.target.value)}
                        className="text-base focus-visible:ring-secondary/50"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button 
                    className="w-full h-12 text-base shadow-sm hover:shadow-md transition-all" 
                    onClick={handleNext} 
                    disabled={!isStep1Valid}
                  >
                    {t('action.next')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-foreground">{t('form.step2.title')}</h2>
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <Label className="text-base">{t('form.age.label')}</Label>
                      <Input 
                        type="number"
                        placeholder={t('form.age.placeholder')}
                        value={formData.age || ''}
                        onChange={(e) => updateForm('age', parseInt(e.target.value))}
                        className="text-base w-32 focus-visible:ring-secondary/50"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Label className="text-base">{t('form.sex.label')}</Label>
                      <RadioGroup 
                        value={formData.sex}
                        onValueChange={(val) => updateForm('sex', val as TriageInput['sex'])}
                        className="grid grid-cols-2 gap-4"
                      >
                        {Object.entries(TriageInputSex).map(([key, value]) => (
                          <div key={value} className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => updateForm('sex', value)}>
                            <RadioGroupItem value={value} id={`sex-${value}`} />
                            <Label htmlFor={`sex-${value}`} className="cursor-pointer grow">{t(`form.sex.${key}` as any)}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-base">{t('form.pregnancy.label')}</Label>
                      <RadioGroup 
                        value={formData.pregnancyPotential}
                        onValueChange={(val) => updateForm('pregnancyPotential', val as TriageInput['pregnancyPotential'])}
                        className="grid grid-cols-2 gap-4"
                      >
                        {Object.entries(TriageInputPregnancyPotential).map(([key, value]) => (
                          <div key={value} className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => updateForm('pregnancyPotential', value)}>
                            <RadioGroupItem value={value} id={`preg-${value}`} />
                            <Label htmlFor={`preg-${value}`} className="cursor-pointer grow">{t(`form.pregnancy.${key}` as any)}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <Button variant="outline" className="h-12 w-24 shrink-0" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <Button 
                    className="flex-1 h-12 text-base shadow-sm hover:shadow-md transition-all" 
                    onClick={handleNext} 
                    disabled={!isStep2Valid}
                  >
                    {t('action.next')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-foreground">{t('form.step3.title')}</h2>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-base">{t('form.conditions.label')}</Label>
                      <Textarea 
                        placeholder={t('form.conditions.placeholder')}
                        value={formData.knownConditions || ''}
                        onChange={(e) => updateForm('knownConditions', e.target.value)}
                        className="h-24 text-base focus-visible:ring-secondary/50"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-base">{t('form.medications.label')}</Label>
                      <Textarea 
                        placeholder={t('form.medications.placeholder')}
                        value={formData.medications || ''}
                        onChange={(e) => updateForm('medications', e.target.value)}
                        className="h-24 text-base focus-visible:ring-secondary/50"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-base">{t('form.imaging.label')}</Label>
                      <Textarea 
                        placeholder={t('form.imaging.placeholder')}
                        value={formData.previousImaging || ''}
                        onChange={(e) => updateForm('previousImaging', e.target.value)}
                        className="h-24 text-base focus-visible:ring-secondary/50"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <Button variant="outline" className="h-12 w-24 shrink-0" onClick={() => setStep(2)}>
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <Button 
                    className="flex-1 h-12 text-base font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md" 
                    onClick={handleSubmit} 
                  >
                    {t('action.submit')}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function LoadingState() {
  const { t } = useTranslation();
  const messages = [
    t('loading.analyzing'),
    t('loading.consulting'),
    t('loading.preparing')
  ];
  const [msgIndex, setMsgIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex(i => (i + 1) % messages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-xl mx-auto text-center py-20 flex flex-col items-center"
    >
      <div className="relative w-24 h-24 mb-12">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <Activity className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
      </div>
      <AnimatePresence mode="wait">
        <motion.p 
          key={msgIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl font-medium text-foreground"
        >
          {messages[msgIndex]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

function ResultsScreen({ result, onRestart }: { result: TriageResult, onRestart: () => void }) {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-full mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">{t('result.title')}</h2>
      </div>

      {result.emergency && (
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="p-6 flex gap-4">
            <AlertCircle className="w-8 h-8 text-destructive shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-destructive">{t('result.emergency.title')}</h3>
              <p className="text-foreground/90 font-medium leading-relaxed">
                {result.message}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {!result.emergency && (
        <Card className="border-primary/20 shadow-lg bg-white">
          <CardContent className="p-8">
            <p className="text-lg text-foreground/90 leading-relaxed font-medium">
              {result.message}
            </p>
          </CardContent>
        </Card>
      )}

      {result.exams && result.exams.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <Activity className="w-6 h-6 text-primary" />
            {t('result.exams.title')}
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {result.exams.map((exam, i) => (
              <Card key={i} className="border-border/60 hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="text-xl font-bold text-primary">{exam.name}</h4>
                    <span className="px-3 py-1 bg-muted rounded-full text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
                      {exam.modality}
                    </span>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <p className="text-sm font-medium text-primary/80 mb-1">{t('result.exams.why')}</p>
                    <p className="text-foreground text-sm leading-relaxed">{exam.why}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 pt-8">
        {result.questions && result.questions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">{t('result.questions.title')}</h3>
            <ul className="space-y-3">
              {result.questions.map((q, i) => (
                <li key={i} className="flex gap-3 text-foreground/80 bg-white p-4 rounded-xl border shadow-sm">
                  <span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shrink-0 font-bold text-sm">
                    {i+1}
                  </span>
                  <span className="leading-snug">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-8">
          {result.nextSteps && result.nextSteps.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">{t('result.nextSteps.title')}</h3>
              <ul className="space-y-3">
                {result.nextSteps.map((step, i) => (
                  <li key={i} className="flex gap-3 items-center text-foreground/80">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <Card className="bg-muted border-none">
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center gap-2 text-foreground/70 font-semibold">
                <ShieldAlert className="w-5 h-5" />
                <h4>{t('result.safetyNote.title')}</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.safetyNote}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="pt-12 text-center">
        <Button variant="outline" size="lg" onClick={onRestart} className="h-12 px-8 font-semibold">
          {t('action.restart')}
        </Button>
      </div>

    </motion.div>
  );
}


function MainContent() {
  const [flowState, setFlowState] = useState<'welcome' | 'form' | 'loading' | 'result'>('welcome');
  const analyzeMutation = useAnalyzeTriage();

  const handleStart = () => setFlowState('form');
  
  const handleSubmit = (data: TriageInput) => {
    setFlowState('loading');
    analyzeMutation.mutate({ data }, {
      onSuccess: () => {
        setFlowState('result');
      },
      onError: (err) => {
        // Fallback for demo if API fails
        console.error("API Error", err);
        setFlowState('form');
        alert("Une erreur s'est produite lors de l'analyse.");
      }
    });
  };

  const handleRestart = () => {
    analyzeMutation.reset();
    setFlowState('welcome');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <XamoLogo />
          <LanguageToggle />
        </div>
      </header>

      {/* Main Journey Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 py-12 md:py-20 relative">
        <AnimatePresence mode="wait">
          {flowState === 'welcome' && <WelcomeScreen key="welcome" onStart={handleStart} />}
          {flowState === 'form' && <FormWizard key="form" onSubmit={handleSubmit} />}
          {flowState === 'loading' && <LoadingState key="loading" />}
          {flowState === 'result' && analyzeMutation.data && (
            <ResultsScreen key="result" result={analyzeMutation.data} onRestart={handleRestart} />
          )}
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50 mt-auto bg-white/50">
        <p>Xamo Radiologie © {new Date().getFullYear()}. Outil éducatif, non diagnostique.</p>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <TranslationProvider>
      <MainContent />
    </TranslationProvider>
  );
}
