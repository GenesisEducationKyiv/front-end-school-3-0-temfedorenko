# ADR-001: Migration from Javascript to Typescript

## Context

Currently, our Task Management app is built using Javascript. As we plan to introduce more new features and improve existing ones, the size, and complexity of the application will increase. This leads us to face the following challenges: 

- **Maintainability**: Difficulty in the code refactoring, and understanding the data flow due to the dynamic nature of Javascript.
- **Developer Productivity**: Increased time spent on debugging runtime errors.
- **Code Quality and Reliability**: Lack of type checking leads to potential bugs and unexpected application behavior.

## Decision

We will use Typescript as the primary language for all new features, and will gradually migrate existing features from Javascript to Typescript.

During the migration, .js and .ts files will temporarily coexist within the codebase. We will leverage Typescript compiler options such as allowJs and checkJs to enable gradual type checking of existing Javascript files. Additionally, @ts-check comments may be used in specific Javascript files to opt them into type checking earlier.

## Rationale
- *Improved Code Quality and Reliability*: Typescript is statically typed, allowing type checking at compile time. This helps catch errors early in the development process, reducing the runtime errors.
- *Enhanced Maintainability*: Explicit type definitions make the codebase easier to understand, navigate, and refactor. Developers can quickly understand the expected data structures, which reduces their workload.
- *Increased Developer Productivity*: Typescript type system enables better code completion, navigation, and refactoring in IDEs, improving developer productivity. Many common Javascript errors are caught at compile time, saving debugging time.
- *Easier Onboarding*: New team members can understand the codebase more quickly by relying on type definitions, it can be used as a documentation.
- *Scalability*: Typescript features make it easier to scale applications, as the code is more organized and maintainable.

## Rejected Alternatives
- *Continuing with Javascript*: Its dynamic typing leads to runtime errors, difficult refactoring, and higher long-term maintenance costs compared to Typescript compile-time safety and improved tooling.
- *Using JSDoc*: Primarily a documentation tool, JSDoc lacks Typescript comprehensive type inference, advanced type features, and strict compile-time guarantees, leaving many potential errors undetected.
- *Using Flow*: It has a significantly smaller community, less extensive ecosystem support, and less mature tooling compared to Typescript, making Typescript a more sustainable choice.

## Status
Proposed

## Consequences

#### Positive Consequences:

- *Better Maintainability*: Significant reduction in type-related bugs reaching production. Easier to refactor code with confidence, all breaking changes are surfaced by the type checker.
- *Improved Code Readability*: Clearer understanding of data structures and function contracts.
- *Faster Development*: Developers spend less time debugging and more time building features due to better tooling and early error detection.
- *Better Developer Experience*: Better onboarding for new developers via autocomplete and type hints.

#### Negative Consequences:
- *Increased Code Complexity*: Developers new to Typescript will require time to learn the language and its concepts.
- *Increased Initial Setup*: Initial setup and configuration of Typescript with various build tools require some effort.
- *Migration Effort*: Existing Javascript code will need to be migrated, which can be a time-consuming process depending on the size and complexity of the codebase. This will be managed incrementally.
- *Build Tool and Configuration Challenges*: We are currently using Vite for our build process. It's important to note that Vite does not perform type checks during the build step. Therefore, tsc --noEmit will need to be run separately (e.g., as a pre-commit hook or part of the CI/CD pipeline) to ensure type safety. Careful configuration of tsconfig.json will be crucial to manage the mixed Javascript/Typescript codebase effectively.
- *Linting Adaptation*: ESLint setup will require updates to include @typescript-eslint/eslint-plugin to properly lint both Javascript and Typescript files and enforce consistent code style and best practices across the mixed codebase.
