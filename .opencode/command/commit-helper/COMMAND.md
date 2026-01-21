---
name: commit-helper
description: Analyze staged changes and generate conventional commit messages using the Git Commit Helper skill
usage: /commit-helper [options]
options:
  - name: --amend
    description: Generate message for amending the last commit
    type: boolean
  - name: --all
    description: Include all unstaged changes in analysis
    type: boolean
---

# Git Commit Helper Command

Quick command to analyze Git changes and generate conventional commit messages.

## Usage

```bash
/commit-helper              # Analyze staged changes
/commit-helper --all        # Analyze all changes (staged + unstaged)
/commit-helper --amend      # Generate message for amending last commit
```

## How it works

This command automatically loads the **Git Commit Helper skill** which contains:

- Conventional commits format guidelines
- Commit message best practices
- Examples and templates
- Type definitions (feat/fix/refactor/etc.)

The command will:

1. Load the skill's detailed guidelines
2. Analyze your git changes (`git status` and `git diff`)
3. Generate a properly formatted commit message
4. Provide the message for you to review and use

For detailed documentation on commit message format and best practices, see the Git Commit Helper skill.
