# Dockerfile Templates

## Node 10 with Yarn

```
FROM node:10

RUN echo "===> Installing essentials..." && \
    apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y --no-install-recommends --force-yes \
        apt-transport-https ca-certificates unicode-data

RUN echo "===> Installing Yarn..." && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends yarn

WORKDIR /app

```
