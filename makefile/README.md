# Makefile

Replace `renard` by your project name.

### Bootstrap a Makefile with a docker compose environment

```makefile
MAKEFLAGS += --silent

export UID=$(shell id -u)
export GID=$(shell id -g)

.PHONY: help install run start stop logs


ifeq ($(NODE_ENV), test)
    DOCKER_COMPOSE = docker-compose -p renard -f docker-compose.yml -f docker-compose.test.yml
else
    DOCKER_COMPOSE = docker-compose -p renard -f docker-compose.yml
endif


help:
	grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install:  ## Build docker images and install node dependencies
	$(DOCKER_COMPOSE) build
	$(DOCKER_COMPOSE) run --rm server bash -ci "yarn"

start:
	$(DOCKER_COMPOSE) up

stop:
	$(DOCKER_COMPOSE) stop

logs:
	$(DOCKER_COMPOSE) logs -f

```
