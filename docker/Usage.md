# Docker Usage

## Installation

In order to install the Docker ecosystem, follow the instructions in the documentation:

- [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- [Docker Compose](https://docs.docker.com/compose/install/#install-compose)


## Use the alpine version

In most cases, the alpine version is enough. It is lighter than the debian version and this will result in smaller images.

You might need the debian (jessie) version when using libraries such as ImageMagick.

## Share current user permissions in the container

Expore the current user id and the group id in environment variables:

```makefile
UID = $(shell id -u)
GID = $(shell id -g)
```

And use them to create a docker thanks to the `user` flag.

```bash
docker run --user "${UID}:${GID}" hello-world
```

Or, with docker-compose:

```yml
version: '3'

services:
    hello:
        image: hello-world
        user: "${UID}:${GID}"
```

Documentation:
    - [Docker Security](https://docs.docker.com/engine/security/security/)
    - [Isolate containers with a user namespace](https://docs.docker.com/engine/security/userns-remap/)


## Sharing /etc/passwd with read-only mode

In some rare cases, some applications need to access to specifics files in your systems (such as Postgres have to read `/etc/passwd`).
You can share a file with read-only mode thanks to a volume, like:

```bash
docker run --user "${UID}:${GID}" -v "/etc/passwd:/etc/passwd:ro" hello-world
```

```yml
version: '3'

services:
    hello:
        image: hello-world
        user: "${UID}:${GID}"
        volumes:
            - "/etc/passwd:/etc/passwd:ro"
```
