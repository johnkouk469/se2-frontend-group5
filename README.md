# Codin Frontend (Software Engineering II, group 5)

Web frontend of Codin (Configure, Deploy, Inspect), a platform for building dashboards that monitor IoT-based systems, such as robotic systems, through a graphical interface, including over a remote network. Users sign in, connect MQTT or Web-STOMP data sources, and build dashboards from widgets that show live data.

## Context

Group coursework for Software Engineering II at Aristotle University of Thessaloniki, 2022-2023, by a team of three (see [Team](#team)). The course handed the class a largely complete Codin backend and frontend. The assignment was to run the project the way an agile team would, assessed continuously through the Cyclopt platform on three axes: project management and CI/CD, testing strategy and implementation, and quality analytics (improving static-analysis metrics without changing behaviour). According to the team, the metrics improved over the course; the Cyclopt reports are no longer available, so this repository quotes no values.

The backend that goes with this frontend is [`se2-backend-group5`](https://github.com/SoftwareEngineering2-Assignment/se2-backend-group5).

**Provided by the course:** the application, from the course's template frontend [`SoftwareEngineering2-Assignment/se2-frontend`](https://github.com/SoftwareEngineering2-Assignment/se2-frontend). Compared with that template, about two thirds of the files under `src/`, `public/` and `cypress/` are unchanged, among them all images. The template carries no licence of its own.

**Added or changed by the group:**

- **Refactoring** of duplicated code, without changing behaviour: shared building blocks were extracted from the widgets and pages into their own modules (`src/components/source-connected`, `base-component`, `styled-components`, `plot`, `range`, `infographics`, `change-source`, `confirmation-buttons`, `tag`, and `toolbar`, `alert`, `update-source` and `base-edit` under `edit-dashboard`), so that the widgets share one base class for connecting to a data source. A few click handlers became hyperlinks, and some basic error handling was added.
- **End-to-end tests** (Cypress, `cypress/e2e/`): the landing page, sign-in, the sources screen (list, add, edit) and the dashboards screen (open, add and cancel, add and save). The tests mock the backend's answers with `cy.intercept`.
- **Continuous integration** (GitHub Actions, `.github/workflows/ci.yaml`): on every push it installs the dependencies on Node 16, builds the app, starts it on port 3002 and runs the Cypress tests. It reads the server URL and the test values from repository secrets, which are not part of the repository.
- **Linting**: ESLint with the Airbnb rules (`npm run lint`).

## Tech stack

React 17 with Redux (redux-persist), React Router 5, Blueprint UI, styled-components and Rebass, Formik and yup for forms, ky for HTTP calls, `mqtt` and `@stomp/rx-stomp` for the live data connections, react-grid-layout for the dashboard grid, react-vis and react-gauge-chart for charts. Create React App (react-scripts 4.0.2). Cypress 11 for tests, ESLint for linting.

## Running it

```bash
cp .env.sample .env     # REACT_APP_SERVER_URL: the backend; REACT_APP_PLATFORM_URL: this app
npm ci                  # on Node 14 with npm 6 or Node 16 with npm 8
npm start               # development server on http://localhost:3002
npm run build           # production build in build/
```

Typical local values: `REACT_APP_SERVER_URL=http://localhost:3000` (the backend, see its README) and `REACT_APP_PLATFORM_URL=http://localhost:3002`. The `.env` file is read when the development server or the build starts.

Checked: `npm ci`, `npm run lint` and `npm run build` succeed on Node 14.21.3 with npm 6.14.18 and on Node 16.20.2 with npm 8.19.4, with identical bundle sizes. The lint run reports no errors and 38 warnings, mostly about quote style and blank lines. The dependencies date from 2021 and `npm ci` reports known vulnerabilities in them, so this is not a baseline for a new project.

Not checked: the app against a running copy of the backend.

## Running the tests

```bash
npm start &             # the tests expect the app on port 3002
npm test                # cypress run; use `npm run cypress` for the interactive runner
```

Cypress reads `TEST_USERNAME`, `TEST_PASSWORD`, `TEST_ID`, `TEST_EMAIL`, `TEST_TOKEN` and `REACT_APP_SERVER_URL` from the environment or from a `.env` file (see `cypress.config.js`); the sign-in answer is mocked, so any values work. The tests mock their API calls, but in `dashboards.cy.js` the landing page asks the server for its statistics before that call is mocked, so `REACT_APP_SERVER_URL` must point at something that answers; the team's pipeline pointed it at the course's backend.

Checked with Cypress 11.0.1 on Node 16.18.1 against the development server: both spec files, 12 distinct tests, passed when a stand-in server answered the statistics request, and with nothing listening one test of `dashboards.cy.js` failed on that request. The tests check the screens against canned answers; they do not test the backend.

## Live deployment

A deployment on Netlify is online at https://se2-frontend-5.netlify.app (the file `public/_redirects` is the single-page-app rule for it). The page loads; whether it can still reach a working backend is not guaranteed, because the backend it was built for ran on the course's server.

## Licence

MIT (`LICENSE`), with the copyright lines of the group and of robotics-4-all, the copyright holder named in the licence of the course's backend. The course's template frontend carries no licence of its own, so the files taken from it have no licence stated by their source other than this one.

## Team

- Pavlos Karakalidis ([@pkarakal](https://github.com/pkarakal))
- Stelios Topalidis ([@styltopa](https://github.com/styltopa))
- Ioannis Koukouras ([@johnkouk469](https://github.com/johnkouk469))
