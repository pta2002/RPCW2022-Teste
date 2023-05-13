#!/usr/bin/env bash

docker-compose exec -T mongodb mongoimport --db CONDOMINIO --collection=fracoes --jsonArray <fracoes.json
docker-compose exec -T mongodb mongoimport --db CONDOMINIO --collection=receitas --jsonArray <receitas.json
docker-compose exec -T mongodb mongoimport --db CONDOMINIO --collection=pagamentos --jsonArray <pagamentos.json
