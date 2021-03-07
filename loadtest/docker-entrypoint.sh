#!/bin/bash
echo Your args are: "$1 $2"
exec npm run run-test $1 --target $2
exec npm run report