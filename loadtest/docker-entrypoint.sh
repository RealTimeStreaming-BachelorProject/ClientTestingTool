#!/bin/bash
echo Your args are: "$@"
exec npm run test "$@"