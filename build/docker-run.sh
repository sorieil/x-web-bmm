#!/bin/bash
set -e
# sudo docker stop $(sudo docker ps -q)
if [ ! "$(sudo docker ps -q -f name=bmm_app)" ]; then
    if [ "$(sudo docker ps -aq -f status=exited -f name=bmm_app)" ]; then
        # cleanup
        sudo docker rm bmm_app
        sudo docker load -i bmm_app.tar 
    fi
    # run your container
    sudo docker run -it -p 3000:3000 -d --name bmm_app:latest
    sudo docker ps
fi

# Rollback 을 위해서 우선 주석처리
# if command -v docker images; then
#   sudo docker rmi $(sudo docker images -q) >/dev/null
# fi

# sudo docker system prune --force
# sudo docker volume prune --force
# sudo docker container prune --force
