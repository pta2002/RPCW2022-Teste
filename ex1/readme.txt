Importar: docker-compose exec -T mongodb mongoimport --jsonArray --collection=cidades <cidades-array.json
jq .\"ligações\" <mapa.json | docker-compose exec -T mongodb mongoimport --jsonArray --collection=ligacoes
