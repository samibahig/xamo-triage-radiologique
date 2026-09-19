---
name: GitHub connector bulk writes
description: Environment-specific limitation observed when publishing many repository files through the GitHub connector.
---

GitHub repository creation and small reads can succeed while repeated blob writes or larger GraphQL commit mutations are blocked by the Replit connector proxy.

**Why:** Multiple Git data API strategies first hit a connector request-rate limit, then consistently returned a Replit Cloudflare block page even for reduced, atomic mutations.

**How to apply:** Avoid retrying bulk GitHub writes repeatedly once this pattern appears. Preserve a clean source archive and use a normal authenticated Git push or retry the connector after its block has cleared.