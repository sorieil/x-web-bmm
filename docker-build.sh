#!/bin/bash
set -e
printf "============== Docker Build ==============\n "
docker build -t frontend:latest .
printf "=============== Docker Save ============\n "
docker save -o frontend.tar frontend:latest
printf "=============== Docker Sending to Server ============\n "
scp frontend.tar ubuntu@52.79.120.204:/home/ubuntu
printf "=============== Docker Sending Done ============\n "
bash ./build/deploy.sh
