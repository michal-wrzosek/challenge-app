# challenge-app
Demo SPA connected to REST API with JWT Auth

<img src="/screenshot.png" width="200px"></img>

**Table of contents:**
- [Deployment](#deployment)
- [CI - Travis](#continuous_integration)
- [Tech stack](#tech_stack)

## Deployment
This app is deployed via Heroku. Master branch is always automatically deplyed to "staging". Then you can manually promote "staging" to "production". Every PR triggers "Review Apps" to start deploying.

**Production:** *NOT YET DEPLOYED*
**Staging:** https://challenge-app-spa-staging.herokuapp.com/
**Review apps**: Created ad hoc
`https://challenge-app-spa-staging-pr-<PR_NR_HERE>.herokuapp.com`

## Continuous Integration
Every PR triggers Travis that runs unit tests to ensure that only healthy code will be deployed to master.

https://travis-ci.com/michal-wrzosek/challenge-app

## Tech Stack
- Create React App v3
- Typescript
- eslint + prettier
- jest + enzyme
- styled components + styled system
- React hooks + Subjects/Observables (reactive programming)
- no Redux
- Heroku + mars/create-react-app buildpack
- Travis CI
- GitHub
- husky for git hooks
- VSCode (suggested IDE)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
### `npm test`
