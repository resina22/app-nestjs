# NestJS - Elasticsearch  

Desenvolvida utilizando as tecnologias NestJS, MySQL e Elasticsearch sua principal função é buscar/cadastrar usuários originados da Api fake JSONPlaceholder e registrar os logs no elasticsearch.  

- [NestJS](https://nestjs.com/)  
- [Elasticsearch](https://www.elastic.co/pt/elasticsearch/)  
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)  

## Infraestrutura  

Toda estrutura da aplicação utilizar container docker estruturados com docker compose.  

- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  

Os seguintes serviços(containers) são utilizados  
- [NodeJS](https://hub.docker.com/_/node)  
- [MySQL](https://hub.docker.com/_/mysql)  
- [Elasticsearch](https://hub.docker.com/_/elasticsearch)  
- [Kibana](https://hub.docker.com/_/kibana)  

Para comunicação dos container foram criadas duas redes
- **backend:bridge** - Faz a comunicação entre node, mysql e elasticsearch  
- **elastic:bridge** - Faz a comunicação entre o kibana e elasticsearch  

## Estrutura de pastas  

- **api** -> Código da aplicação  
- **volumes** -> Destinada a organizar os volumes do docker  
- **docker-compose.yml** -> Arquivo de configuração dos containers se necessário altere o mesmo para configurar o ambiente  
- **insomnia_workspace.json** -> Workspace insomnia pode ser utilizado para realizar os testes de requisições. [Import workspace](https://support.insomnia.rest/article/52-importing-and-exporting-data)  
- **App.postman_collection.json** -> Workspace insomnia pode ser utilizado para realizar os testes de requisições. [Import workspace](https://learning.postman.com/docs/collaborating-in-postman/using-workspaces/managing-workspaces/)  


## Iniciando containers  

Antes de iniciar os containers é necessário dar permissões as pastas que vão armazenar os dados dos mesmos, acesse o diretório do projeto e execute os comandos:  

- Volume do MySQL
```bash
mkdir volumes/db
```

- Volume do Elasticsearch
```bash
mkdir volumes/elasticsearch
sudo chgrp 0 volumes/elasticsearch
chmod g+rwx volumes/elasticsearch 
```  

Iniciando principais containers  

```bash
docker-compose up -d node mysql elasticsearch
```  

Caso queira iniciar o kibana utilize  
```bash
docker-compose up -d node mysql elasticsearch kibana
```  
