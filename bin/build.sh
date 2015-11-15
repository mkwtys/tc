#!/usr/bin/env sh

# html
cpx "src/**/*.html" app

# js
babel src -d app
