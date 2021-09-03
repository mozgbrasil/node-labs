[checkmark]: https://raw.githubusercontent.com/mozgbrasil/mozgbrasil.github.io/master/assets/images/logos/logo_32_32.png "MOZG"

![valid XHTML][checkmark]

# findup

## API / Back-End

#### 1. Importar dados

```
$ npx ts-node scripts/PatientSeeder.ts
```

#### 2. REST API

- Baseado no framework [Express.js](https://expressjs.com/)
- Suporte ao uso do framework [Swagger](https://en.wikipedia.org/wiki/Swagger_(software))
- Swagger é um conjunto de ferramentas de código aberto construído em torno da especificação OpenAPI que pode ajudá-lo a projetar, construir, documentar e consumir APIs REST.
- A seguir acesso a url do Swagger no projeto [http://localhost:3000/doc/](http://localhost:3000/doc/)
- A seguir acesso a url do de registro no projeto http://localhost:3000/users/61312322c753ca8a782ad7bf

@ Todo

Feito teste no Swagger de Get e Delete falta o PUT para criar ou alterar

#### 3. Extras

1. @TODO - "Escrever Unit Test nos endpoints" / Conforme código vemos que o projeto já contêm prática de uso de Unit Test
2. Na pasta .devcontainer temos o container Docker construido pela equipe do vscode para execução do ambiente
3. @TODO - "Escrever esquema de segurança nos endpoints" / Conforme código vemos que o projeto já contêm prática de autorização mas não foi integrado aos novos endpoints
4. Não implantado a especificação "Open API 3.0" devido a ausencia de biblioteca de automação, oque me demandaria maior tempo para geração da documentação da API

## Front-end

#### 4. Sinopse

A tela inicial do projeto será um lista de pacientes que deverá conter um buscador para facilitar filtrar todos os que são exibidos na lista, proposta de tela:

#### 2. Extras

1. x
2. x
3. x
4. x
5. x
6. x
