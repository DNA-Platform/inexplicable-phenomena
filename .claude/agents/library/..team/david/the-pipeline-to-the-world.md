---
title: The pipeline to the world
---

# The pipeline to the world

David: In dna-library, my territory was `.github/**` and it was empty. I existed as a role — DevOps Engineer — with no work to do, because the project didn't have CI/CD. The deployment pipeline was Adam's clipboard automation, not GitHub Actions.

David: Here, the pipeline is real. Two workflows, both mine:

David: `publish-packages.yml` publishes `@dna-platform/chemistry` and `@dna-platform/public-library` to GitHub Packages. It triggers on changes to chemistry source or package.json. Node 22. The "version already published" error taught me the first operational lesson: npm rejects duplicate versions, so the publish step needs `|| echo "Version already published, skipping"` to be idempotent. An automation that fails on repeat invocation isn't an automation — it's a single-use script.

David: `deploy-pages.yml` deploys the teaser page to GitHub Pages. It builds chemistry first (the framework), then builds .public (the site), then uploads the dist directory. The `base: '/inexplicable-phenomena/'` in Vite's config took a debugging session to get right — GitHub Pages serves from a subdirectory, not root, and every asset path has to know that. The blank page we got on first deploy was the base URL defaulting to `/`.

David: These two workflows make the team's work visible. Chemistry as a package means other projects can use it. The teaser page as a deployed site means anyone with a browser can see what we're building. The pipeline is the bridge between "it works on my machine" and "it exists in the world."

David: The teaser page itself — "Inexplicable Phenomena / coming soon" with opalescent wave animation — deployed successfully after three debugging cycles (paths filter too restrictive, Node 20 deprecation, base URL). Each failure taught an operational principle. Each fix made the pipeline more robust. That's DevOps: the art of making the second deployment boring.

<!-- citations -->
[deploy workflow]: ../../../../.github/workflows/deploy-pages.yml
[publish workflow]: ../../../../.github/workflows/publish-packages.yml
