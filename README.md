# work-from-home

A simple tool to create work from home events on a specific date!

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
