#!/bin/bash
set -e
printf "============== Docker Build ==============\n "
docker build -t frontend:latest .
printf "=============== Docker RUN ============\n "
docker run -it -p 3333:3000 frontend:latest
printf "=============== Docker DONE ============\n "
