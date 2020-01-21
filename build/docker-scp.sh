#!/bin/bash
set -e
scp -i ./build/bmm-web.pem frontend.tar ubuntu@52.79.120.204:/home/ubuntu
