#!/bin/bash
set -e
CLEAR_LINE='\r\033[K'
DIRECTORY=web-xsync-2.0-bmm

cd /home/centos

#TODO 다음부터는 도커로 세팅을 해놓는다.

if ! command -v node >/dev/null; then
  sudo npm install -g yarn
fi

#디렉토리가 존재 하면, 체크 아웃을 하지 않는다.
if [ ! -d "$DIRECTORY" ]; then
  git clone git@bitbucket.org:xsync_development/web-xsync-2.0-bmm.git
fi

cd $DIRECTORY

# printf "================================\n "
# git pull >/dev/null
# printf "  Git pull done \n "
# printf "================================\n "

printf "================================\n "
git fetch && git checkout -B release >/dev/null
printf "  Git reset release branch \n "
printf "================================\n "

printf "================================\n "
yarn --ignore-engines >/dev/null
printf "  Yarn Done \n "
printf "================================\n "

printf "================================\n "
npx pm2 link uc0d267w80u4837 huiiiy90kar9kie 'BMM WEB(ec2)'
printf "  PM2 plus setup \n "
printf "================================\n "

printf "================================\n "
printf "  build \n "
yarn build >/dev/null
printf "================================\n "

yarn server-start >/dev/null
printf "  Web start \n"
printf "================================\n "

curl https://sentry.io/api/hooks/release/builtin/1503535/df72bba18d3e5e725c6f0f6365101807337eaf29adf117b978853eb5b24db8de/ \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{"version": "1.0"}'
printf "  Deploy complete \n"
printf "================================\n "
