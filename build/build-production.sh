#!/bin/bash

npm run build
cp -a /app/verification/ ./dist
node ./build/deployment_socket.js