# Desafio técnico - Hubify

## Como instanciar a API de contatos e negociações:

* **Passo 1**: Se preciso, instale o MySQL Community Server em sua máquina. Para Windows, siga este link: https://dev.mysql.com/downloads/installer/;
* **Passo 2**: Com o servidor MySQL em execução, utilizando uma interface visual (como MySQL Workbench ou HeidiSQL), execute os comandos disponíveis no arquivo **database_schema.sql**;
* **Passo 3**: No terminal, navegue até ao diretório onde você clonou este repositório e faça os seguintes comandos:

```
npm install
npm run build:prod
npm run start:prod
```
_**Observação**: o projeto será executado na **porta 3000**._ 

* **Passo 4**: Crie um arquivo **.env** e preencha as seguintes variáveis (lembrando que elas são genéricas, não sendo utilizadas em nenhum projeto real):
```
DB_USER=root
DB_PASSWORD=admin123
API_KEY=4561292c-10c4-4eb8-8ac0-0daeea3e9dee
```

* **Passo 5**: No Postman, importe a coleção disponível no arquivo **postman_collection.json**. Observe que ela terá duas variáveis já preenchidas com os valores necessários: **Authorization** e **baseURL**.