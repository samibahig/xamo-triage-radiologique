---
name: Free Hugging Face deployment
description: Records the non-obvious hosting constraint and production AI-provider decision for Xamo.
---

Reuse the existing `medai-vision` Docker Space for Xamo production. It retains grandfathered `cpu-basic` access, while new Gradio or Docker compute Spaces on this Hugging Face account are blocked without a paid plan.

**Why:** Hugging Face changed its policy after the older Spaces were created. Creating a new Docker Space or moving the newer Xamo Space to `cpu-basic` returned HTTP 402, while the existing Docker Space still builds and runs on free CPU.

Use Hugging Face Inference Providers in the Space, selected with `AI_PROVIDER=huggingface`; keep Replit’s OpenAI integration for development. The Replit AI gateway is local to Replit and returns `ECONNREFUSED` from Hugging Face.

**How to apply:** Preserve the provider switch when changing the triage AI client. Before replacing the reused Space again, back up its Git repository and verify the public health endpoint plus one non-urgent triage response.