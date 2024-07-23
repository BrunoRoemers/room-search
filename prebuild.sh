#!/usr/bin/env bash

# make secrets.json available to nextjs backend
echo "$GOOGLE_APPLICATION_CREDENTIALS_BASE64" | base64 --decode > secrets.json

# compile bookmarklet.ts to downloadable bookmarklet.js
tsc src/bookmarklet.ts --outFile public/bookmarklet.js