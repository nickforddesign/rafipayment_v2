#!/bin/bash

npm run staging
cp -R /app/verification/ ./dist
node ./build/deployment_socket.js