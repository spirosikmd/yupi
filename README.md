# work-from-home

A simple tool to create work from home events on a specific date!

> Follow google apis [quickstart](https://developers.google.com/google-apps/calendar/quickstart/nodejs#step_1_turn_on_the_api_name)
to create a project with calendar and google+ access, generate `client_secret.json` file with credentials,
and put it in the project root.

## Installation

Install the package globally with

```bash
yarn global add work-from-home
```

or

```bash
npm i -g work-from-home
```

## Usage

The first time, you will need to give google calendar access for the tool to create events.

### CLI

```bash
work-from-home "next wednesday"
```

### Node

```javascript
const workFromHome = require('work-from-home');
workFromHome('next wednesday');
```
