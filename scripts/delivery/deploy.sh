#! /bin/sh
set -e

# Arguments handling
echo "$# arguments passed:"
SERVER_IP=$1
RELEASE_ID=$2
echo "SERVER_IP : $SERVER_IP"
echo "RELEASE_ID : $RELEASE_ID"

## Steps
ls
ls build
ssh root@$SERVER_IP 'mkdir /var/www/html/mt-frontend/ || true'
ssh root@$SERVER_IP 'rm -rf /var/www/html/mt-frontend/'$RELEASE_ID
scp -r build/ root@$SERVER_IP':/var/www/html/mt-frontend/'$RELEASE_ID
