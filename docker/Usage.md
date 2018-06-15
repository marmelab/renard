# Docker Usage

### Share current user permissions in the container

Expore the current user id and the group id in environment variables:

```makefile
UID = $(shell id -u)
GID = $(shell id -g)
```

And use them to create a docker thanks to the `user` flag.
In order to get your permissions, the container should have access to your `/etc/passwd` file (read-only).

```bash
docker run --user "${UID}:${GID}" -v "/etc/passwd:/etc/passwd:ro" hello-world
```

Or, with docker-compose:

```yml
version: '3'

services:
    hello:
        image: hello-world
        user: "${UID}:${GID}"
        volumes:
            - "/etc/passwd:/etc/passwd:ro"
```
