FROM osgeo/gdal:alpine-ultrasmall-3.0.4

RUN apk add --update nodejs npm
# nvm falls falsche version v. node
# COPY Quellcode rein 
VOLUME ./calc

WORKDIR ./calc

RUN npm install

CMD node main.js

