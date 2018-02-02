#!/bin/bash

npm run build
cp /app/verification/* ./dist/
node ./build/deployment_socket.js