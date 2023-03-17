#!/bin/bash
cat $(find ./src -name "*.graphql" -type f -print) > schema.graphql