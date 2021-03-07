#!/bin/bash
echo Your args are: "$@"
exec npm run test "$@" --output report.json
exec npm --output report.html report.json