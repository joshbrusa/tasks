FROM node as build

ARG VITE_BACKEND_ORIGIN

WORKDIR /code
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /code/dist /usr/share/nginx/html