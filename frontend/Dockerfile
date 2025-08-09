FROM node:22-alpine

WORKDIR /app

# RUN npm install -g pnpm@10.4.1

COPY package*.json .

COPY pnpm-lock.yaml .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# CMD [ "tail", "-f", "/dev/null" ]
