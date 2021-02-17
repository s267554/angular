FROM node:latest AS compile-image

WORKDIR /opt/ng

COPY package.json  ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH" 

COPY . ./
RUN ng build --prod

FROM nginx
COPY --from=compile-image /opt/ng/dist/virtual-labs /usr/share/nginx/html
