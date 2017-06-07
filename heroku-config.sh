#!/bin/sh
heroku config:set \
  S3_ENDPOINT="$S3_ENDPOINT" \
  S3_BUCKET="$S3_BUCKET" \
  S3_BUCKET_PATH="$S3_BUCKET_PATH" \
  AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
  AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
  PAGE_TITLE="$PAGE_TITLE" \
  PORT="$PORT"
