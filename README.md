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
- WeatherAPI: Used for fetching real-time weather data. (The reason for not using the WeatherStackApi, is because only current weather is available on the free tier)
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
