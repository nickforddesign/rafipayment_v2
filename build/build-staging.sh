#!/bin/bash

npm run staging
cp -r /app/verification/ ./dist
node ./build/deployment_socket.js