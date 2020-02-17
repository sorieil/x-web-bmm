#!/bin/bash
set -e
# sudo docker stop
sudo docker stop $(sudo docker ps -qa)
sudo docker rm $(sudo docker ps -qa) >/dev/null
# images
sudo docker rmi $(sudo docker images -qa) >/dev/null
sudo docker load -i bmm_app.tar

# run your container
sudo docker run -d -p 3000:3000 bmm_app:latest
sudo docker ps

# Rollback 을 위해서 우선 주석처리
# if command -v docker images; then
#   sudo docker rmi $(sudo docker images -q) >/dev/null
# fi

# sudo docker system prune --force
# sudo docker volume prune --force
# sudo docker container prune --force
