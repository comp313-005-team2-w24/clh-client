# USE COPY .ENV TO SETUP VITE_API_URL=http://gateway:8081

FROM node:20.10-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chown nginx:nginx /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]