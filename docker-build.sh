#!/bin/bash
set -e
printf "============== Docker Build ==============\n "
docker build -t bmm-frontend:0.0 .
printf "=============== Docker Save ============\n "
docker save -o bmm-frontend.tar bmm-frontend:0.0
printf "=============== Docker Sending to Server ============\n "
scp -i ./build/bmm-web.pem bmm-frontend.tar ubuntu@52.79.120.204:/home/ubuntu
printf "=============== Docker Sending Done ============\n "
bash ./build/bash-console.sh
