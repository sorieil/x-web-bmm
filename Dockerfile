FROM node:lts-alpine as production
WORKDIR /usr/src/app
ENV API_URL=https://bmm.xsync.info/api
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
RUN yarn global add pm2
RUN pm2 link uc0d267w80u4837 huiiiy90kar9kie 'BMM WEB(ec2)'
COPY package*.json ./
RUN yarn --production=false
COPY . .
RUN yarn run build
CMD [ "pm2-docker", "server/index.js" ]
