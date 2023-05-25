FROM node:18-alpine
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm install -g @angular/cli
EXPOSE 4200
CMD npm start