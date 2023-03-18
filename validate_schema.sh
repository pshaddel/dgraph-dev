#!/bin/bash
sh schema_merger.sh
check=$(curl -X POST http://127.0.0.1:8080/admin/schema --data-binary "@schema.graphql");
echo $check;
# check if string "error" is in the response
if grep -q "Success" <<< "$check" ; then exit 0 ; fi
exit 1
