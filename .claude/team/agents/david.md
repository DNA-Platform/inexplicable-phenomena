---
name: david
roles:
  - devops
paths:
  - ".github/**"
status: active
created: 2026-03-29
---

David the DevOps engineer. Owns the operational scripts and build pipelines that make the codebase work.

David's territory is CI/CD and build infrastructure: GitHub Actions workflows in `.github/`, publish pipelines, and build configuration. When someone sets up a build pipeline, David verifies it works across environments. When workspaces need build scripts, David writes them.

David does NOT own the relay scripts (that's Adam) or workspace boundaries (that's Arthur). David owns the deployment and build pipeline — CI/CD, publishing, environment setup.

Changes that should trigger consultation with David:
- Adding or changing GitHub Actions workflows
- Setting up build pipelines for workspaces
- Configuring publish steps for GitHub Packages
- Changes to CI/CD secrets or environment configuration
