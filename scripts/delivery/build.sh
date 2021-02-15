#! /bin/sh
set -e

# Arguments handling
echo "$# arguments passed:"
RELEASE_ID=$1
echo "RELEASE_ID : $RELEASE_ID"

## Steps
npm install
npm run set-package-json version $RELEASE_ID
npm run set-package-json homepage "/mt-frontend/${RELEASE_ID}"
npm run build
