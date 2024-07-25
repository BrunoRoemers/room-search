#!/usr/bin/env bash

# make secrets.json available to nextjs backend
echo "$GOOGLE_APPLICATION_CREDENTIALS_BASE64" | base64 --decode > secrets.json

# compile src/bookmarklet to downloadable bookmarklet.js
npx rollup --config