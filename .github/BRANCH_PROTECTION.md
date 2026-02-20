# Branch Protection & Ruleset Setup Guide

This guide explains how to protect the `main` branch and enforce branch naming conventions for PDFX. Two ready-to-import ruleset files are provided in this directory.

> **All GitHub settings links below point to `https://github.com/akii09/pdfx/settings/…`. If this repository is ever renamed or forked, replace `akii09/pdfx` with the new owner/repo slug.**

---

## Overview of Rules

### `main` Branch Protection (`main-branch.json`)

| Rule | Setting |
|------|---------|
| Direct pushes | ❌ Blocked |
| Force pushes | ❌ Blocked |
| Branch deletion | ❌ Blocked |
| Required approvals | ✅ 1 review |
| Dismiss stale reviews on new push | ✅ Yes |
| Require CODEOWNERS review | ✅ Yes |
| Require conversation resolution | ✅ Yes |
| Required status check | ✅ `Test & Build` (CI) |
| Branch must be up to date | ✅ Yes |
| Linear history (no merge commits) | ✅ Yes |

### Branch Naming Convention (`feature-branches.json`)

All branches (except `main`) must be named using one of these prefixes:

| Prefix | Use for |
|--------|---------|
| `feat/` | New features (e.g. `feat/table-component`) |
| `fix/` | Bug fixes (e.g. `fix/heading-margin`) |
| `docs/` | Documentation changes |
| `chore/` | Maintenance, tooling, deps |
| `release/` | Release preparation |
| `refactor/` | Code refactoring |
| `test/` | Test-only changes |
| `ci/` | CI/CD changes |
| `copilot/` | Copilot / automated branches |

---

## Method 1 — Import JSON Files (Fastest)

GitHub Rulesets can be imported directly from a JSON file.

### Step 1 — Import the `main` branch protection ruleset

1. Go to **https://github.com/akii09/pdfx/settings/rules**
2. Click **"New ruleset"** → **"Import a ruleset"**
3. Upload the file **`.github/rulesets/main-branch.json`** from this repo
4. Review the settings — they should match the table above
5. Click **"Create"** to activate

### Step 2 — Import the branch naming convention ruleset

1. Still on **https://github.com/akii09/pdfx/settings/rules**
2. Click **"New ruleset"** → **"Import a ruleset"**
3. Upload the file **`.github/rulesets/feature-branches.json`** from this repo
4. Review the settings
5. Click **"Create"** to activate

---

## Method 2 — Manual Setup via GitHub UI

If you prefer to configure everything by hand, follow these steps.

### Part A — Protect the `main` branch

1. Go to **https://github.com/akii09/pdfx/settings/rules**
2. Click **"New ruleset"**
3. Fill in the form:

   **General**
   - **Ruleset name**: `Protect main branch`
   - **Enforcement status**: `Active`

   **Target branches**
   - Click **"Add target"** → **"Include by pattern"**
   - Pattern: `main`

   **Rules — check all of the following:**

   - ✅ **Restrict deletions** — prevents deleting `main`
   - ✅ **Restrict force pushes** — prevents history rewrites
   - ✅ **Require linear history** — enforces squash or rebase merges (no merge commits)

   - ✅ **Require a pull request before merging**
     - Required approvals: **1**
     - ✅ Dismiss stale pull request approvals when new commits are pushed
     - ✅ Require review from Code Owners
     - ✅ Require conversation resolution before merging

   - ✅ **Require status checks to pass**
     - ✅ Require branches to be up to date before merging
     - Click **"Add checks"** and search for: `Test & Build`
     - Select **Test & Build** from the CI workflow

4. Leave **Bypass list** empty (no one bypasses — including admins)
5. Click **"Create"**

---

### Part B — Enforce branch naming conventions

1. Go to **https://github.com/akii09/pdfx/settings/rules**
2. Click **"New ruleset"**
3. Fill in the form:

   **General**
   - **Ruleset name**: `Enforce branch naming conventions`
   - **Enforcement status**: `Active`

   **Target branches**
   - Click **"Add target"** → **"Include all branches"** (`~ALL`)
   - Click **"Add exclusion"** → **"Include by pattern"** → `main`

   **Rules — check:**

   - ✅ **Restrict branch creation** *(or use Branch name pattern below)*
   - ✅ **Branch name pattern**
     - **Operator**: `Regular Expression`
     - **Pattern**:
       ```
       ^(feat|fix|docs|chore|release|refactor|test|ci|copilot)/.+
       ```
     - This ensures every new branch starts with one of the allowed prefixes

4. Click **"Create"**

---

## Verifying the Rules Work

After setup, test that protection is active:

1. **Try to push directly to `main`** — it should be rejected:
   ```
   remote: error: GH013: Repository rule violations found for refs/heads/main.
   ```

2. **Try to create a badly named branch** — it should be rejected:
   ```bash
   git checkout -b my-random-branch
   git push origin my-random-branch
   # → rejected: branch name doesn't match pattern
   ```

3. **Open a PR against `main`** — the PR page should show:
   - 🔴 "Review required" (1 approval needed)
   - 🔴 "Test & Build" status check required
   - 🔴 "All conversations must be resolved"

---

## Ruleset vs. Branch Protection Rules (Legacy)

GitHub offers two systems. **Rulesets** (used here) are the modern replacement:

| Feature | Rulesets ✅ | Branch Protection (Legacy) |
|---------|-------------|---------------------------|
| Import/export as JSON | ✅ | ❌ |
| Apply to multiple branches at once | ✅ | ❌ |
| Enforce for repository admins | ✅ Optional | ❌ Always bypassed |
| Branch name pattern rules | ✅ | ❌ |
| Available on free public repos | ✅ | ✅ |

> **Note**: If you have existing Branch Protection Rules, you can keep them alongside Rulesets, but Rulesets take precedence. For simplicity, use only Rulesets.

---

## Recommended Merge Strategy for `main`

Once branch protection is active, configure the allowed merge methods to enforce clean history:

1. Go to **https://github.com/akii09/pdfx/settings** → scroll to **"Pull Requests"**
2. **Uncheck** "Allow merge commits"
3. **Uncheck** "Allow rebase merging" *(optional — keep if you prefer rebase)*
4. **Check** ✅ "Allow squash merging"
5. Set **Default commit message** to "Pull request title and description"
6. **Check** ✅ "Automatically delete head branches" — cleans up branches after merge

This ensures every PR lands as a single, clean commit on `main`.

---

## Setting Up the `NPM_TOKEN` Secret (for Releases)

The Release workflow needs an npm token to publish packages:

1. Sign in to npm and go to: **https://www.npmjs.com** → click your avatar → **"Access Tokens"**
   *(Direct link: `https://www.npmjs.com/settings/<your-npm-username>/tokens` — replace `<your-npm-username>` with your actual npm username)*
2. Click **"Generate New Token"** → choose **"Automation"** (works in CI without 2FA)
3. Copy the token immediately (it is only shown once)
4. Go to the repository secrets page: **https://github.com/akii09/pdfx/settings/secrets/actions**
5. Click **"New repository secret"**
   - **Name**: `NPM_TOKEN`
   - **Secret**: paste the token
6. Click **"Add secret"**

---

## Further Recommendations

| Setting | Where to configure |
|---------|-------------------|
| Enable Discussions tab | [Settings → General → Features](https://github.com/akii09/pdfx/settings) → Discussions ✅ |
| Enable Private vulnerability reporting | [Security → Code security](https://github.com/akii09/pdfx/security) → Private vulnerability reporting ✅ |
| Enable Dependabot security updates | [Settings → Code security](https://github.com/akii09/pdfx/settings/security_analysis) → Dependabot security updates ✅ |
| Enable Dependabot version updates | [Settings → Code security](https://github.com/akii09/pdfx/settings/security_analysis) → Dependabot version updates ✅ |
| Set default branch to `main` | [Settings → General → Default branch](https://github.com/akii09/pdfx/settings/branches) |
