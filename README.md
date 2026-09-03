---
title: Xamo Triage Radiologique
emoji: 🩻
colorFrom: blue
colorTo: yellow
sdk: docker
app_port: 7860
---

# Xamo Triage Radiologique

Prototype bilingue français/anglais de prétriage radiologique éducatif pour aider un patient à préparer une discussion avec son médecin.

> **Important :** cet outil ne fournit pas de diagnostic et ne prescrit aucun examen. Les résultats sont éducatifs. Seul un médecin peut décider si une imagerie est indiquée. En cas de symptômes sévères ou soudains, appelez les services d’urgence locaux.

## Parcours

- Consentement explicite avant toute saisie
- Symptômes, durée, âge, sexe, contexte médical et possibilité de grossesse
- Suggestions d’examens possibles à discuter avec un médecin
- Questions à poser au médecin et prochaines étapes
- Détection prioritaire de plusieurs signaux d’urgence

## Développement

```bash
pnpm install
pnpm --filter @workspace/xamo-triage run dev
```

Pour activer l’analyse IA, les variables `AI_INTEGRATIONS_OPENAI_BASE_URL` et `AI_INTEGRATIONS_OPENAI_API_KEY` doivent être disponibles côté serveur.

## Hugging Face Spaces

Le dépôt est préparé pour Hugging Face Spaces avec Docker. Ajouter les deux variables IA comme **Secrets** du Space, jamais dans le code ou dans un fichier public.

## GitHub

Projet maintenu par [samibahig](https://github.com/samibahig).