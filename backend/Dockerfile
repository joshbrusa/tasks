FROM node
WORKDIR /code
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
CMD [ "npm", "start"]