#!/bin/bash
echo Your args are: "$@"
exec npm run test "$@"
exec npm --output report.html report.json