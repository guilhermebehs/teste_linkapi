FROM node:15 as builder

WORKDIR /app
COPY . .
RUN npm i
RUN npm run test
RUN npm run build

FROM node:15-alpine
WORKDIR /home/app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
RUN npm i --force --production=true
EXPOSE 3000
CMD ["npm", "run", "start"]

