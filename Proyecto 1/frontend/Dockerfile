FROM node:alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build 
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
#docker build --pull --rm -f "Dockerfile" -t serchiboi/frontend_proyecto1_arqui2:latest "./"
#docker push serchiboi/frontend_proyecto1_arqui2