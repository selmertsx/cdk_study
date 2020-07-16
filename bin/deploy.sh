#!/bin/sh -eu
rm -rf src/lambda/node_modules
cp package.json tmp/
cp package-lock.json tmp/
npm install --production --prefix tmp
cp -R tmp/node_modules src/lambda/
npm run build
cdk deploy
