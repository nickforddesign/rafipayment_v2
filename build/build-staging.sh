#!/bin/bash

npm run staging
cp -a /app/verification/ ./dist
node ./build/deployment_socket.js