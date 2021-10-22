FROM osgeo/gdal:alpine-ultrasmall-3.0.4

RUN apk add bash
 
ENV NODE_VERSION 16.11.0
ENV VERSION v16.11.0
ENV DISTRO=linux-x64

RUN apk update && apk add --no-cache wget

RUN wget https://nodejs.org/dist/v16.11.0/node-v16.11.0-linux-x64.tar.xz
# && tar -xf node-v13.0.1-linux-x64.tar.xz

RUN mkdir -p /usr/local/lib/nodejs
RUN tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs 
RUN export PATH=/usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin:$PATH
RUN apk add --upgrade npm

RUN PATH="$PATH"
#RUN . ~/.profile
#RUN npm install
#RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"


RUN node -v
