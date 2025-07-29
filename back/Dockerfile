FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm i && npm cache clean --force
COPY tsconfig.json tsconfig.build.json ./
COPY . .
CMD ["npm", "run", "start:dev"]