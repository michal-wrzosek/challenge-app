# Challenge App

Demo SPA connected to [REST API](https://github.com/michal-wrzosek/challenge-api) with JWT Auth

<img src="/screenshot.png" width="200px"></img><img src="/screenshot2.png" width="200px"></img>

**Table of contents:**

- [Deployment](#deployment)
- [CI - Travis](#continuous_integration)
- [Tech stack](#tech_stack)
- [Architecture design](#architecture-design)

## Deployment

This app is deployed via Heroku. Master branch is always automatically deployed to "staging". Then you can manually promote "staging" to "production". Every PR triggers "Review Apps" to start deploying.

**Production:**
https://challenge-app-spa-production.herokuapp.com/

**Staging:**
https://challenge-app-spa-staging.herokuapp.com/

**Review apps**: Created ad hoc:
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

## Architecture design

This app was build based on CRA v3 (not ejected) with Typescript. State management is done by using React Context, React Hooks and Subject class from reactive programming approach (kind of RxJS). I intentionally didn't used redux since there is a new trend to move away from redux.

For visuals I chose Styled Components and Styled System.

All dumb components are within /components folder and the rest is stored in /containers. I covered all components with simple unit tests.

I set the repository to allow merging to master only if all tests passed through Travis CI.

Authorization token is stored in user's local storage. If token is invalid app asks user to login again.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

### `npm test`
