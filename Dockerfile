FROM node:lts-alpine as production
WORKDIR /usr/src/app
ENV API_URL=https://bmm.xsync.info/api
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
RUN yarn global add pm2
RUN pm2 link zl9w6h8yv3fvo00 au03usckn2kv01a 'BMM APP'
COPY package*.json ./
RUN yarn --production=false
COPY . .
RUN yarn run build
CMD ["pm2-docker", "start", "ecosystem.config.js", "--env=production"]
