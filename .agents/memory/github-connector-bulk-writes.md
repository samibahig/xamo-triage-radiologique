---
name: GitHub connector bulk writes
description: Environment-specific limitation observed when publishing many repository files through the GitHub connector.
---

GitHub repository creation and small reads can succeed while repeated REST writes, Git-tree creation, or workflow-file uploads are blocked by the Replit connector proxy.

**Why:** Git-tree creation returned an unexplained 404 and workflow-file creation triggered a Replit Cloudflare block, even though normal file writes worked.

**How to apply:** Back up the remote branch first. If authenticated Git push is unavailable, split the tracked files into GraphQL `createCommitOnBranch` additions of roughly 0.5 MB or less per batch. Advance `expectedHeadOid` after each commit, remove transfer-only files, then fetch the public branch and compare its tree and contents with the local branch.