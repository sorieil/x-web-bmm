#!/bin/bash
set -e
sudo docker stop $(sudo docker ps -q) >/dev/null

# if command -v sudo docker ps; then
#   sudo docker stop $(sudo docker ps -q) >/dev/null
# fi

# Rollback 을 위해서 우선 주석처리
# if command -v docker images; then
#   sudo docker rmi $(sudo docker images -q) >/dev/null
# fi

# sudo docker system prune --force
# sudo docker volume prune --force
# sudo docker container prune --force

sudo docker load -i frontend.tar >/dev/null
sudo docker run -it -p 3001:3001 -d frontend:latest >/dev/null
sudo docker ps >/dev/null
