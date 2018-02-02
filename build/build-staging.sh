#!/bin/bash

npm run staging
cp /app/verification/* ./dist/
node ./build/deployment_socket.js