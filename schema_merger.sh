#!/bin/bash
# overwrite schema.graphql with the merged schema only if at least one file exists:
s=$(find ./src -name "*.graphql" -type f -print)
if [ -n "$s" ]; then
  cat $s > schema.graphql
fi