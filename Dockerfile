#배포 및 빌드 환경
FROM node:lts-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV API_URL=https://bmm.xsync.info/api
RUN yarn global add pm2
RUN pm2 link uc0d267w80u4837 huiiiy90kar9kie 'BMM WEB(ec2)'
COPY package*.json ./
RUN yarn install
COPY . /usr/src/app
# COPY --from=builder node_modules node_modules
RUN yarn run build
EXPOSE 3000
CMD [ "pm2-docker", "server/index.js"]
