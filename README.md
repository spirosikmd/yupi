# yupi

[![CircleCI](https://circleci.com/gh/spirosikmd/yupi.svg?style=svg)](https://circleci.com/gh/spirosikmd/yupi)

A simple tool to create gmail events on a specific date!

> Follow google apis [quickstart](https://developers.google.com/google-apps/calendar/quickstart/nodejs#step_1_turn_on_the_api_name)
to create a project with calendar and google+ access, generate `client_secret.json` file with credentials,
and put it in the project root.

## Installation

Install the package globally with

```bash
yarn global add yupi
```

or

```bash
npm i -g yupi
```

## Usage

The first time, you will need to give google calendar access for the tool to create events.

### CLI

```bash
yupi "next wednesday"
```

### Node

```javascript
const yupi = require('yupi');
yupi('next wednesday');
```
