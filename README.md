# Chill Cast Web App

Chill Cast is a fast and responsive weather web app that provides real-time weather data for any location. Built using modern web technologies like React, TypeScript, Vite, and Chakra UI, this app ensures a smooth, lightweight, and interactive user experience.

# Features

- Real-time weather data: Get current weather conditions for any location worldwide.
- Modern tech stack: Built with React, TypeScript, and Chakra UI for optimal performance and responsiveness.
- User-friendly UI: Intuitive design powered by Chakra UI for accessible, customizable, and beautiful UI components.
- Lightweight & Fast: Optimized for a fast and smooth user experience, powered by Vite for quick build times.

# Technologies Used

- React: A popular JavaScript library for building user interfaces.
- TypeScript: A statically typed superset of JavaScript, improving code quality and reliability.
- Vite: A next-generation, fast, and highly optimized build tool.
- Chakra UI: A component library that provides customizable and accessible UI elements for faster development.
- WeatherAPI: Used for fetching real-time weather data. (The reason for not using the WeatherStackApi, is because only current weather is available for the free tier.)
- EmailJS: Used for sending emails directly from the frontend (optional integration).

# Run Locally

To get started, clone the repository and install dependencies:

```sh
cd chill-cast-web-app
yarn install

To start the application, run
yarn dev
```

This will start a development server, and you can open your browser to http://localhost:3000 to view the app.

# Environment Variables

To use email functionality and WeatherAPI, you’ll need to set up your .env file with the following variables:

```js
VITE_WEATHER_API_KEY=yourKey
VITE_WEATHER_API_URL=https://api.weatherapi.com/v1/
VITE_EMAIL_API_KEY=yourKey
VITE_EMAIL_SERVICE_ID=yourKey
VITE_EMAIL_TEMPLATE_ID=yourKey
```

Please request these keys via email: mmoore4361@gmail.com.

# Running Tests with Vitest

You can run tests using the following command:

```sh
for running tests
yarn test

for a full test coverage report
yarn coverage
```

# Pre-commit Linting check with Husky

To maintain high code quality and enforce consistent coding standards, I’ve implemented a pre-commit hook using Husky. This hook automatically runs whenever a commit is made, ensuring that code is properly linted and formatted before being committed to the repository. By integrating Husky, the pre-commit hook helps catch common issues such as syntax errors, unused variables, and inconsistent code styles, which can be automatically fixed through Lint-Staged.

# Linting and Unit Test Workflows with GitHub Actions

To ensure consistent code quality and maintainability throughout the development process, I set up automated linting and unit test workflows for pull requests using GitHub Actions.

## Linting Workflow

I configured a GitHub Actions workflow to automatically run ESLint on the codebase whenever a pull request is opened or updated. This ensures that code adheres to the project's linting rules and prevents any issues related to code style, syntax errors, or potential bugs from being merged into the main branch. The workflow performs the following:

- Runs ESLint to check for code quality issues and styling inconsistencies.
- Reports any errors or warnings directly in the pull request, allowing developers to fix them before merging.
- Helps enforce coding standards and ensures uniformity in the codebase.

## Unit Test Workflow

I also set up a unit test workflow using Vitest (the testing framework) in GitHub Actions. The workflow runs the unit tests for the project on every pull request to ensure that any new code changes do not break existing functionality. Here's what it does:

- Runs the Vitest tests to check the correctness of the application.
- Provides feedback on test results in the pull request, helping identify failing tests early.
- Prevents code from being merged if any tests fail, ensuring that only thoroughly tested code is integrated.

By integrating both linting and unit testing into the pull request process, these workflows improve the efficiency of the development cycle, reduce the risk of bugs, and ensure a higher level of code quality before any changes are merged into the main branch.

# Why I Chose Vite as the Build Tool

When selecting a build tool for this project, I opted for Vite because of its speed, simplicity, and modern approach to bundling JavaScript applications. Vite is designed to provide fast development builds and a smooth user experience with minimal configuration.

Here are the main reasons I chose Vite over other build tools like Webpack or Create React App:

1. Faster Development Builds: Vite leverages ES modules for development, which allows it to serve your code without bundling it first. This results in significantly faster startup times and instant module reloading as you make changes to your code, improving the development experience.

1. Out-of-the-box Optimization: Vite automatically optimizes your code for production, leveraging tools like ESBuild for extremely fast bundling. This leads to faster build times, smaller bundle sizes, and an overall smoother deployment process.

1. Native Support for TypeScript: Vite has built-in support for TypeScript, which makes setting up the project easier and reduces the need for additional configurations compared to other bundlers.

1. Modern Features and Flexibility: Vite supports modern web features such as Hot Module Replacement (HMR), tree-shaking, and code-splitting right out of the box, which makes it highly customizable and future-proof for more complex applications.

Overall, Vite was chosen for its performance advantages and ability to streamline the development and build process, making it an ideal fit for this project.

# Why I Chose Chakra UI for Styling

For styling, I chose Chakra UI over other libraries like Material-UI or Tailwind CSS for several key reasons that align with the needs of the project:

1. Ease of Use: Chakra UI offers a simple and intuitive API that allows developers to quickly build responsive and accessible UI components without requiring deep knowledge of CSS. This is particularly helpful for creating consistent and user-friendly interfaces with minimal effort.

2. Accessibility First: Chakra UI is built with accessibility in mind, ensuring that all components follow best practices for accessibility out of the box. This was important for me, as I wanted the application to be usable by as many people as possible, regardless of their abilities.

3. Customizable and Themeable: One of the standout features of Chakra UI is its theming capabilities. Chakra allows for easy customization of the app's color scheme, typography, and other styles through a theme provider, without requiring complex CSS overrides. This makes it simple to create a cohesive design system while maintaining flexibility.

4. Component-Based Design: Chakra UI provides a wide range of pre-built, responsive, and customizable components like buttons, modals, form elements, and alerts, which greatly speeds up the development process. I didn't have to build UI elements from scratch or spend time on styling intricate components.

In comparison to other libraries like Material-UI or Tailwind CSS, Chakra UI provided a balanced combination of accessibility, ease of use, flexibility, and pre-built components that allowed me to focus more on building features rather than dealing with complex design systems or layout grids.

# Why I Chose a Functional Approach Over a Class-based Approach

In this project, I adopted a functional component-based approach using React Hooks instead of the traditional class-based components. Here’s why:

1. Simplicity and Readability: Functional components are simpler and more concise compared to class-based components. They are easier to read and maintain, especially for smaller components. By using React Hooks (such as useState, useEffect, and custom hooks), the component logic becomes more declarative and manageable, avoiding the need for lifecycle methods and complex class structures.

2. Improved Reusability and Composability: Functional components encourage a compositional approach, where logic can be encapsulated within custom hooks and reused across the app. This is more efficient and scalable than dealing with complex state management within class-based components.

3. Better Performance: React's functional components, especially with Hooks, allow for optimizations such as memoization and lazy loading. These optimizations lead to better performance, as React can more efficiently re-render only the necessary parts of the UI.

4. Future-Proofing: React's team has emphasized functional components with Hooks as the future direction of React development. The majority of new React features and optimizations are designed with functional components in mind. By adopting a functional approach, this project is better aligned with React’s evolving best practices.

5. Less Boilerplate: Functional components require less boilerplate code compared to class components. There’s no need for constructors, the render() method, or managing this binding, all of which can introduce additional complexity and potential issues.

In conclusion, the functional approach, combined with the power of React Hooks, made the development process more efficient, modular, and maintainable. It also aligns with the direction React is moving toward, ensuring that the project is built on modern and best practices.

# Why I Chose useContext for State Management Over Redux or Zustand

For state management in this project, I chose useContext instead of more complex solutions like Redux or Zustand for the following reasons:

1. Simplicity and Minimalism: useContext provides a simple, lightweight solution for managing global state without the overhead of Redux or Zustand. It reduces boilerplate and setup, making it ideal for small to medium-sized applications.

2. No External Dependencies: As a built-in React hook, useContext eliminates the need to install and configure third-party libraries, ensuring the project remains lightweight and compatible with the latest React features.

3. Sufficient for the Project's Needs: For this project, useContext was enough to handle global state like authentication and user preferences. Redux and Zustand are better suited for more complex applications, but they add unnecessary complexity here.

4. Familiarity and Debugging: Since useContext is part of React, it integrates seamlessly with React’s developer tools and doesn’t require additional debugging tools like Redux DevTools.

5. Scalability: If the project grows, I can easily extend useContext with useReducer or custom hooks to manage more complex state logic, making it a flexible starting point.

Overall, useContext provided a simple, scalable, and effective solution for the project without adding unnecessary complexity.
