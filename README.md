# web-xsync-2.0-bmm

> Business match making

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm dev-live-api //라이브 api 와 연동시


# also you can connect with live api.
npm dev //로컬 api로 실행시
npm dev-local //로컬 개발자 서버와 연동시


# build for production and launch server
npm build
npm start

# generate static project (Not server side)
npm generate

# Start server development mode.
docker-compose up

# Docker attach shell, npm 관련 명령어를 넣어야 한다면, 여기서 해야 한다.
- docker exec -it container_hash /bin/sh -c "[ -e /bin/bash ] && /bin/bash || /bin/sh"
- 접속후
npm install package_name

# 문법 에러가 날 경우 위 방식으로 접속후 아래 명령어 입력
npm run lint
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## API (Postman)

[LINK](https://documenter.getpostman.com/view/105985/SVtWyTtJ)
