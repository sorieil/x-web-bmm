#!/bin/bash
set -e
if ! command -v sudo docker ps >/dev/null; then
  sudo docker stop $(sudo docker ps -q) >/dev/null
fi

if ! command -v docker images >/dev/null; then
  sudo docker rmi $(sudo docker images -q) >/dev/null
fi

sudo docker system prune --force
sudo docker volume prune --force
sudo docker container prune --force

sudo docker load -i bmm-frontend.tar >/dev/null
sudo docker run -it -p 3000:3000 -d bmm-frontend:latest >/dev/null
sudo docker ps
