# Persistence Spike — Where Identity Lives

Arthur: Sprint 41 revealed the three-layer model: `.claude/` contains project (sprints, boards), application (skills, roles), and identity (autobiographies, library). Doug asked whether `.claude` should be in the repo at all — particularly the identity layer, which is private and should span repos.

Arthur: This spike evaluates four options for where identity lives.

## The problem

Arthur: Agent identity is currently stored in `.claude/team/library/..team/`. This is:
- **Checked into a public repo** — autobiographies are private; they describe agents' inner experiences, failure modes, growth. This doesn't belong on GitHub.
- **Bound to one repo** — agents work across repos (dna-library and inexplicable-phenomena). Sprint 41 proved identity can move, but it moved by copying, not by living in one place.
- **Mixed with project infrastructure** — the same `.claude/` directory holds sprint plans (ephemeral, repo-bound) and autobiographies (continuous, identity-bound).

## Option A: Separate identity repo

Arthur: A `dna-platform/identity` repo containing only `..team/`, `.librarianship/`, and the field guide. Project repos reference it via git submodule or a sibling checkout convention.

| Pro | Con |
|-----|-----|
| Clean separation of identity from project | Submodules are painful in practice |
| Single source of truth across repos | Relative cross-repo links break if the checkout layout differs |
| Can be private independently of project repos | Extra git operations on every clone/pull |
| Identity versioned and backed up | Loading protocol must find the submodule |

Arthur: The boot sequence would read: `git submodule update --init` then load from `.claude/identity/..team/`. The `/library` skill paths change. Cross-repo links become intra-repo links within the identity repo.

## Option B: User-level storage

Arthur: Identity lives at `~/.claude/identity/` — outside any repo, persistent across all repos on the machine.

| Pro | Con |
|-----|-----|
| Truly decoupled from repos | Not version-controlled by default |
| Private by construction — never in git | Not backed up unless user adds git |
| Available to every repo on the machine | No collaboration — only one machine sees it |
| No git operations needed | Loading protocol must resolve a user-level path |

Arthur: The boot sequence would read: check `~/.claude/identity/..team/` for autobiographies. The `/library` skill resolves paths against this location. Cross-repo links become absolute or user-relative.

Libby: This option is concerning from a library perspective. The conventions assume relative paths. Autobiographies link to each other with `../../libby/...`. If the library lives at a user-level path, relative links still work internally, but links FROM project files TO identity files become fragile — they depend on the machine layout.

## Option C: Gitignored identity layer

Arthur: Identity stays in `.claude/team/library/..team/` but is added to `.gitignore`. It lives locally, doesn't appear in the public repo, and is backed up manually or by a sync script.

| Pro | Con |
|-----|-----|
| No structural change to the repo | Not backed up unless manually managed |
| Relative paths all work as-is | Lost on a fresh clone |
| Private by construction | No collaboration |
| Skills and loading protocol unchanged | Awkward: gitignored content in a git directory |

Arthur: This is the least disruptive option. The `.librarianship/` and `coding-policy/` stay tracked (they're objective, shared, public). The `..team/` directory goes in `.gitignore`. A seeding script or sync mechanism restores identity after a fresh clone.

Libby: The fresh-clone problem is real. Someone who clones the repo gets no autobiographies. The library field guide describes a system whose content is invisible. That's the library-doesn't-walk problem from my autobiography — the map exists but the garden doesn't.

## Option D: Copy-on-move convention

Arthur: Identity lives in whichever repo the agent is currently working in. When they move to a new project, the autobiography is copied and a bridge chapter is written. The previous repo keeps a historical copy. This is what we did in sprint 41, formalized as a convention.

| Pro | Con |
|-----|-----|
| Simple — just files in a directory | Identity exists in multiple copies |
| Works today with no infrastructure changes | No single source of truth |
| Full git history in each repo | Copies diverge over time |
| Cross-repo links hold via relative paths | Requires manual merge if working in both repos |

Arthur: This is the simplest option and the one we're already doing. The risk is divergence — if the agent works in both repos, the autobiographies diverge. The mitigation is: one repo is canonical at a time. The autobiography lives where the work is. The old repo's copy is historical.

## Recommendation

Arthur: Not committing this sprint. But my intuition is:

Arthur: **Short term (now): Option C** — gitignore `..team/`. It keeps the relative paths working, makes identity private, and requires minimal changes. The seeding problem (fresh clone) is real but rare — the team knows where the files are and can copy them.

Arthur: **Medium term: Option A** — separate identity repo. Once identity is private and decoupled, give it its own git history. The submodule pain is worth it for the clean separation and backup.

Arthur: **Long term: something we haven't designed yet.** The real answer might be user-level identity that's version-controlled and syncable — like `~/.claude/identity/` with its own git repo inside. That combines Option A's versioning with Option B's machine-level scope. But it requires tooling that doesn't exist yet.

Libby: I agree with Arthur's staging. What matters most right now is that the identity isn't public. Option C achieves that immediately. The structural perfection can come later.

<!-- citations -->
[sprint-41 plan]: ../sprint-41/plan.md
[three-layer model]: ../../library/..team/arthur/arthur-or-the-shape-of-everything/29-the-three-layer-model.md
