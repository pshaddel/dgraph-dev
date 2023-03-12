#!/bin/bash

check=$(curl -X POST http://127.0.0.1:8080/admin/schema --data-binary "@schema.graphql");
echo $check;
# check if string "error" is in the response
if grep -q "error" <<< "$check" ; then exit 1 ; fi
exit 0
