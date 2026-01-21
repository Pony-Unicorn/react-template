import { z } from 'zod'

export const parameters = z.object({
  amend: z
    .boolean()
    .optional()
    .describe('Generate message for amending the last commit'),
  all: z
    .boolean()
    .optional()
    .describe('Include all unstaged changes in analysis'),
})

export default async function commitHelper(
  params: z.infer<typeof parameters>
): Promise<string> {
  const { amend, all } = params

  let prompt = `Load the "Git Commit Helper" skill and use it to help me generate a conventional commit message.

Please follow these steps:

1. First, load the skill to get the detailed guidelines and best practices

2. Run these git commands in parallel:
   - \`git status\` to see the current state
   - \`${all ? 'git diff' : 'git diff --staged'}\` to see the changes
   - \`git log --oneline -10\` to see recent commit message style

3. Analyze the changes following the skill's guidelines and determine:
   - The type of change (feat, fix, refactor, docs, style, test, chore)
   - The scope (which part of the codebase is affected)
   - A clear, concise description in imperative mood
   - Whether a body is needed to explain WHY

4. Generate a commit message following the conventional commits format from the skill

${amend ? '\n5. Note: This is for amending the previous commit, so consider the context of the last commit.' : ''}

Please provide the suggested commit message and explain your reasoning based on the skill's guidelines.`

  return prompt
}
