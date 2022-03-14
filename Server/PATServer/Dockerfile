FROM ubuntu:latest

WORKDIR /Server
COPY ./* /Server/

RUN echo "Build start..."
# apt-get更新
RUN echo "apt-get Update and Upgrade"
RUN apt-get update && apt-get -y upgrade

#curlインストール
RUN apt-get install -y curl

#nodejsのインストール
#バージョンは17.x
RUN echo "Nodejs install"
RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs

#npmをglobalにインストール
RUN echo "npm global install"
RUN npm install -g npm


#nodeのライブラリをインストール(package.jsonを参照してる)
RUN echo "node library install"
RUN npm install 

EXPOSE 4000

CMD [ "node","index.js",4000]