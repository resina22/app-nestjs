## Instalando dependências  

As dependências do NodeJS são instalandas ao inciar o container, o servidor do NestJS já é inciado após a instalação no modo watch.  

## Rotas  

- Lista todos os dados da api fake JSONPlaceholder  

```bash
curl localhost:3000/usuario/baixar-dados | json_pp
```  

- Salva dados da api fake(JSONPlaceholder) no banco de dados  
**Obs.:** Somente os usuários que estão em apartamentos (Apt.) são salvos  

```bash
curl -XPOST localhost:3000/usuario/salvar-dados | json_pp
```  

- Salva usuário sem utilizar dados derivados da api fake(JSONPlaceholder)  

```bash
curl \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{
    "name": "Leanne Graham",
    "username": "Bret2",
    "email": "Sincere@april.biz2",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "929983874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }' \
  localhost:3000/usuario | json_pp  
```  

- Lista todos os registros que estão no banco de dados  

```bash
curl localhost:3000/usuario | json_pp
```  

## Testes unitários  
Aplicação possuí alguns testes unitários, para rodar os testes execute o comando abaixo.  

**Obs.:** Antes de executar os testes verifique o arquivo `.env.test`, esta configuração é necessária caso queira alterar o banco de dados dos testes.  

```bash
docker exec -it nodejs_app npm run test
```  

## Consultando logs no Elasticseach  

É possível utilizar o kibana para acessar os logs registrados mas também é possível utilizar os comandos abaixo.  

```bash
curl localhost:9200/log/_search | json_pp
```  

Filtrando dados pelo tipo de log  
**Obs.:** Level é o tipo de log sendo eles:  
  - 0 - ERROR  
  - 1 - SUCCESS  
  - 2 - INFO  
  - 3 - WARN  

```bash
curl localhost:9200/log/_search \
--header "Content-Type: application/json" \
--data '{
  "query": { 
    "match": { "level": 1 }
  }
}' | json_pp
```
