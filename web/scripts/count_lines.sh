#!/bin/bash

# Find all files except in node_modules and .next, and excluding .json files
find . \
  -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" \) \
  -not -path "./node_modules/*" \
  -not -path "./.next/*" \
  -not -name "*.json" \
  | xargs wc -l > scripts/lines_of_code.txt
