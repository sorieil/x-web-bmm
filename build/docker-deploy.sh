#!/bin/bash
set -e
sudo docker load -i bmm-frontend.tar
sudo docker run -it -p 3000:3000 -d bmm-frontend:latest
