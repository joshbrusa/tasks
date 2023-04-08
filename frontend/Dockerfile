FROM node as build
WORKDIR /code
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_BACKEND_ORIGIN=$VITE_BACKEND_ORIGIN
RUN npm run build

FROM nginx
COPY --from=build /code/dist /usr/share/nginx/html