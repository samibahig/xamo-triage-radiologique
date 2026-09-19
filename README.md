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

## Déploiement Hugging Face

L’application est déployée dans le Space Docker :

https://huggingface.co/spaces/samibahig-md/medai-vision

Le Space utilise le port `7860` et l’API d’inférence Hugging Face. Les variables suivantes sont configurées comme **Secrets** du Space :

- `AI_PROVIDER=huggingface`
- `HUGGINGFACE_TOKEN`

Pour le développement dans Replit, le serveur continue d’utiliser `AI_INTEGRATIONS_OPENAI_BASE_URL` et `AI_INTEGRATIONS_OPENAI_API_KEY`. Aucun secret ne doit être ajouté au code ou à un fichier public.

## GitHub

Projet maintenu par [samibahig](https://github.com/samibahig).