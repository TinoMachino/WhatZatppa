#!/usr/bin/env node

/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

// Exists so pnpm can link the package bin before the package has been built.
require('./dist/index.js')
