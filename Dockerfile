FROM node:lts-alpine AS production
WORKDIR /usr/src/app
ENV API_URL=https://bmm.xsync.info/api
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
RUN npm i -g pm2
RUN pm2 link uc0d267w80u4837 huiiiy90kar9kie 'BMM WEB(ec2)'
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
CMD ["pm2-docker", "server/index.js"]
