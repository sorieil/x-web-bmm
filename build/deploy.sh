#!/bin/bash
set -e
ssh -i ./build/bmm-web.pem ubuntu@52.79.120.204 'bash -s' <./build/docker-run.sh
ssh -i ./build/bmm-web.pem ubuntu@52.79.120.204
