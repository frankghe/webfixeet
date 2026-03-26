The purpose of the project, as well as technical guidelines, are described in the file @docs/project.md, while the high level product architecture is defined in @docs/architecture.md.

The test infrastructure is documented in docs/test_strategy.md

## Tech Stack

This is a web application built with:
- **Next.js** (App Router)
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **TypeScript**

## Environment Setup

For every bash command that you need to run, use the project's Node.js environment. Common commands:
- `npm run dev` - start development server
- `npm run build` - production build
- `npm run lint` - run linter
- `npm test` - run tests

Environment variables: load `.env.local` before running commands that require configuration (API keys, database URLs, etc.). Next.js loads this automatically during `npm run dev` and `npm run build`.

## shadcn/ui Components

When adding new shadcn/ui components, use the CLI: `npx shadcn@latest add <component-name>`. Do NOT manually create component files that shadcn/ui provides. Always check `components/ui/` for existing components before adding new ones.

## Work Tracking

Work items being worked on (and history of work items) available in work.md. When you complete a work item, move it to work_history.md so that work.md only contains items to be worked on or currently being worked on.

## Deployment

"Deploy" means pushing from `main` to a deploy branch:
- **Production**: `git push origin main:deploy/prod`
- **Test**: `git push origin main:deploy/test`

If the target (prod or test) is ambiguous, ask the user to clarify before pushing.

## Execution Rules

- When a command exits with a non-zero exit code, do NOT pause or ask for permission. Investigate the output, determine how to proceed, and continue working. Merge conflicts, test failures, and compilation errors are all expected situations that you should resolve autonomously.

## Specific Instructions

- Create a feature branch for each work item. If the work is trivial, ask the user for explicit approval before doing any work directly on the main branch
- For each new work item listed in work.md, break down the work into tasks with dependencies
- For each new feature, develop tests (unit tests for utilities/hooks, integration tests for pages/components)
- Whenever code is updated, the relevant documentation files (*.md files in the codebase) MUST be updated to reflect changes and keep documentation up to date.
- Before starting any significant task, ensure that conversation is saved so that if you (claude code) crash while working, we can retrieve the context
- After you complete a work item listed in work.md, update the file to indicate that it is completed (add a line after the task title indicating "status=completed"), and include a summary of what was done as subsection(s)
- After you exit Plan mode, and before you start implementation, update work.md with a description of the approved plan
- Use git to track progress as follows:
    * for small fixes or updates, commit to the current branch after work is finished and tested
    * for large updates, create a branch for the development, and merge back to the main branch after the user confirms that the code in the branch is properly tested and ready to be merged back to the main branch
