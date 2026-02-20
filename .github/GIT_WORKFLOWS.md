# Git Workflows Guide

Common git operations for working with the PDFX repository.

---

## Cherry-Picking Commits

**Cherry-picking** lets you copy one or more specific commits from any branch and apply them onto the branch you are currently on — without merging the whole branch.

Use it when you want to bring a bug fix or a specific change into another branch without taking every commit from the source branch.

---

### Anatomy of a `git cherry-pick` command

```
git cherry-pick <commit-hash>
```

- `<commit-hash>` is the 40-character (or abbreviated 7-character) SHA shown in `git log`.
- The commit is **replayed** on top of your current branch as a new commit with a new hash.
- The original commit is **not moved or deleted** — it stays on its source branch.

---

### Step 1 — Find the commit hashes you want

```bash
# See the log of the branch that has the commits
git log --oneline origin/copilot/setup-open-source-guidelines
```

Example output for this repository:

```
77e862b chore: add branch protection rulesets and step-by-step setup guide
bb42bae chore: add open-source community health files and improve repo setup
```

---

### Step 2 — Create a new branch from `main`

Because `main` is protected (direct pushes are blocked), cherry-picked commits must land there via a Pull Request.

```bash
# Make sure you have the latest main
git fetch origin
git checkout main
git pull origin main

# Create a new branch to hold your cherry-picked changes
git checkout -b chore/cherry-pick-open-source-setup
```

---

### Step 3 — Cherry-pick the commits

#### Cherry-pick a single commit

```bash
git cherry-pick bb42bae
```

#### Cherry-pick multiple commits one by one

List them oldest-first (so they apply in the right order):

```bash
git cherry-pick bb42bae
git cherry-pick 77e862b
```

#### Cherry-pick a range of commits (oldest..newest)

The `..` notation **excludes the first hash** and applies every commit from there up to and including the second:

```bash
# Applies only 77e862b (bb42bae is excluded)
git cherry-pick bb42bae..77e862b
```

To **include** the first commit, add a `^` after it:

```bash
# Applies both bb42bae and 77e862b
git cherry-pick bb42bae^..77e862b
```

#### Cherry-pick this branch's commits (using branch name instead of hashes)

```bash
# Cherry-pick the entire range of commits that are on the source branch
# but not yet on main
git cherry-pick origin/main..origin/copilot/setup-open-source-guidelines
```

---

### Step 4 — Push and open a Pull Request

```bash
git push origin chore/cherry-pick-open-source-setup
```

Then open a PR on GitHub from `chore/cherry-pick-open-source-setup` → `main`.

---

### Handling Conflicts

If a cherry-pick hits a conflict, git will pause and tell you:

```
CONFLICT (content): Merge conflict in CONTRIBUTING.md
error: could not apply bb42bae...
hint: After resolving the conflicts, mark them with
hint: "git add <pathspec>" and run "git cherry-pick --continue"
```

**Resolution steps:**

1. Open the conflicting file(s) and resolve the `<<<<<<< / ======= / >>>>>>>` markers
2. Stage the resolved files:
   ```bash
   git add CONTRIBUTING.md
   ```
3. Continue the cherry-pick:
   ```bash
   git cherry-pick --continue
   ```
4. If you want to **abort** and go back to where you started:
   ```bash
   git cherry-pick --abort
   ```

---

### Cherry-picking this PR's commits — concrete example

This repository currently has these two commits on `copilot/setup-open-source-guidelines`:

| Short hash | Commit message |
|------------|---------------|
| `bb42bae` | `chore: add open-source community health files and improve repo setup` |
| `77e862b` | `chore: add branch protection rulesets and step-by-step setup guide` |

To cherry-pick both of them onto a fresh branch and open a PR to `main`:

```bash
# 1. Update your local repo
git fetch origin

# 2. Start from main
git checkout -b chore/cherry-pick-open-source-setup origin/main

# 3. Cherry-pick both commits (oldest first)
git cherry-pick bb42bae^..77e862b

# 4. Push and open a PR
git push origin chore/cherry-pick-open-source-setup
```

Then open a PR on GitHub: `chore/cherry-pick-open-source-setup` → `main`.

> **Tip**: GitHub also lets you merge a PR using the **"Squash and merge"** button, which effectively cherry-picks all commits from the PR as a single commit onto `main` — no manual cherry-picking needed.

---

### Quick Reference

| Goal | Command |
|------|---------|
| Cherry-pick one commit | `git cherry-pick <hash>` |
| Cherry-pick several commits | `git cherry-pick <hash1> <hash2> <hash3>` |
| Cherry-pick a range (exclusive start) | `git cherry-pick <old>..<new>` |
| Cherry-pick a range (inclusive start) | `git cherry-pick <old>^..<new>` |
| Cherry-pick without committing (stage only) | `git cherry-pick -n <hash>` |
| Continue after resolving conflicts | `git cherry-pick --continue` |
| Abort and undo | `git cherry-pick --abort` |
| Skip a conflicting commit | `git cherry-pick --skip` |

---

## See Also

- [`.github/BRANCH_PROTECTION.md`](./BRANCH_PROTECTION.md) — setting up `main` branch protection rules
- [CONTRIBUTING.md](../CONTRIBUTING.md) — branching strategy and PR workflow
- [Official git-cherry-pick docs](https://git-scm.com/docs/git-cherry-pick)
