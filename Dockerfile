FROM node:18
ENV VITE_API_URL=http://localhost:8081
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run","dev"]
