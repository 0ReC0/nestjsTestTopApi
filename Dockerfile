FROM node:16-alpine3.11

# Set working directory
RUN mkdir -p /var/www/top-api-demo
WORKDIR /var/www/top-api-demo

COPY package*.json ./
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]
