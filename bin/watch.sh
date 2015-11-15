#!/usr/bin/env sh

# html
cpx "src/**/*.html" app -w &

# js
babel src -d app -w &

wait
