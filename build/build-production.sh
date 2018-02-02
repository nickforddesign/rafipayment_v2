#!/bin/bash

npm run build
cp -r /app/verification/. ./dist
node ./build/deployment_socket.js