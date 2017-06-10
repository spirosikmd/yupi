#!/usr/bin/env node

const workFromHome = require('../index');

const givenDate = process.argv[2];

workFromHome(givenDate);
