FROM nginx
COPY dist/virtual-labs /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
