#!/bin/bash
set -e
npm i -g nodemon
printf "Success nodemon"
npm i
printf "Success npm install"
npm run dev
printf "Server start"
