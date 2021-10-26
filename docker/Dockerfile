FROM osgeo/gdal:ubuntu-small-3.0.4
#FROM osgeo/gdal:alpine-ultrasmall-3.0.4

RUN apt update && apt install wget
#RUN apt update && apt install -y wget

RUN wget https://nodejs.org/dist/v16.11.0/node-v16.11.0-linux-x64.tar.gz
# && tar -xf node-v13.0.1-linux-x64.tar.xz

RUN mkdir -p /opt/nodejs
RUN tar xvzf node-v16.11.0-linux-x64.tar.gz -C /opt/nodejs
ENV PATH=/opt/nodejs/node-v16.11.0-linux-x64/bin:$PATH

COPY ./calc/ /calc/
WORKDIR /calc
RUN npm install



EXPOSE 5050

RUN chown -R 1001:1001 "/root/.npm"

RUN ln -s /usr/bin/python3 /usr/bin/python

CMD npm start

