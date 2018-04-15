# COLORS
GREEN := $(shell tput -Txterm setaf 2)
WHITE := $(shell tput -Txterm setaf 7)
YELLOW := $(shell tput -Txterm setaf 3)
CYAN := $(shell tput -Txterm setaf 6)
RESET := $(shell tput -Txterm sgr0)

BABEL_CACHE_PATH=./node_modules/babel/cache.json
NODE_MODULES_BIN=./node_modules/.bin
HELP_FUN = \
	%help; \
	while(<>) { \
			if(/^([a-z0-9_-]+):.*\#\#(?:@(\w+))?\s(.*)$$/) { \
					push(@{$$help{$$2}}, [$$1, $$3]); \
			} \
	}; \
	print "usage: make [target]\n\n"; \
	for (sort keys %help) { \
		print "${WHITE}$$_:${RESET}\n"; \
		for (@{$$help{$$_}}) { \
			$$sep = " " x (32 - length $$_->[0]); \
			print "  ${CYAN}$$_->[0]${RESET}$$sep${RESET}$$_->[1]\n"; \
		}; \
		print "\n"; \
	}

.PHONY: help test

help: ##@default print help
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)

commitlint: ##@lint Lint commit message with commitlint package
	@$(NODE_MODULES_BIN)/commitlint -e $$GIT_PARAMS

delete: ##@pm2 Delete this application
	@$(NODE_MODULES_BIN)/pm2 delete pm2.yml

restart: ##@pm2 Retart pm2 apps
	@$(NODE_MODULES_BIN)/pm2 restart pm2.yml

stop: ##@pm2 Stop this application
	@$(NODE_MODULES_BIN)/pm2 stop pm2.yml

start: ##@pm2 Start this application
	@$(NODE_MODULES_BIN)/pm2-dev start pm2.yml

start-debug: ##@pm2 Start this application
	@DEBUG=podcasteo:* DEBUG_HIDE_DATE=true DEBUG_COLORS=true $(NODE_MODULES_BIN)/pm2-dev start pm2.yml

test: ##@test Test application
	@make test-cs
	@make test-unit

test-cs: ##@test Test javascript code style
	@echo "${YELLOW}> Testing javascript code style...${RESET}"
	@$(NODE_MODULES_BIN)/eslint ./src/** --max-warnings 5 --cache
	@echo "${GREEN}✓ Great! Your code is soo stylish${RESET}"

test-unit: ##@test Unit test javascript
	@echo "${YELLOW}> Testing unit...${RESET}"
	@BABEL_CACHE_PATH=$(BABEL_CACHE_PATH) $(NODE_MODULES_BIN)/mocha "./src/**/*.unit.js" \
	--require="./test/unit.config.js" \
	--reporter=list

test-coverage: ##@test Test javascript with coverage
	@echo "${YELLOW}> Collecting coverage...${RESET}"
	@echo "  ↳ After that, you can run ${BLUE}make open-coverage${RESET} to open it in your web browser"
	@NODE_ENV=test $(NODE_MODULES_BIN)/nyc make test-unit
	@echo "${GREEN}✓ Wonderful! Your code is ready to be used${RESET}"
	@echo "${GREEN}➲ Open it with: ${BLUE}make open-coverage${RESET}"

open-coverage: ##@test Open coverage in your web browser
	@echo "${YELLOW}> Opening coverage...${RESET}"
	@open ./coverage/index.html
