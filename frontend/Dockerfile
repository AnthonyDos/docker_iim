# # Étape de build
# FROM node:18 AS builder
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build

# # Étape de production
# FROM nginx:alpine
# COPY --from=builder /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev", "--", "--host"]
