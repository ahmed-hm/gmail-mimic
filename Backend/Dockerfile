FROM node:18 
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm install -g @nestjs/cli
EXPOSE 3000
CMD npm run start:dev