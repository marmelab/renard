# Dockerfile Templates

## Node 10 (yarn included)

This Dockerfile is just exposed here for documentation purpose.
In the case you just need this image, prefer to use `docker run node:10-alpine` with the correct user, volumes, working directory and ports.

Image source: [node:10-alpine](https://github.com/nodejs/docker-node/blob/master/10/alpine/Dockerfile)

```
FROM node:10-alpine

WORKDIR /app
```
