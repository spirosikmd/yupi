#!/usr/bin/env node

const yupi = require('../index');

const givenDate = process.argv[2];

yupi(givenDate).catch(console.error);
