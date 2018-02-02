#!/bin/bash

npm run build
cp -R /app/verification/ ./dist
node ./build/deployment_socket.js