FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm i && npm cache clean --force
COPY tsconfig.json tsconfig.node.json ./
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]