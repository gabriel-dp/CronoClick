#!/bin/bash

FLAG_FILE="/docker/.prisma_initialized"

if [ ! -f "$FLAG_FILE" ]; then
  echo "🚀 First run detected: generating and pushing Prisma schema..."
  npx prisma generate
  npx prisma db push --skip-generate

  touch "$FLAG_FILE"
else
  echo "✅ Prisma already initialized. Skipping."
fi