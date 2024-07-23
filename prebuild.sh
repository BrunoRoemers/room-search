#!/usr/bin/env bash
echo "$GOOGLE_APPLICATION_CREDENTIALS_BASE64" | base64 --decode > secrets.json