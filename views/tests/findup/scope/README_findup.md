[checkmark]: https://raw.githubusercontent.com/mozgbrasil/mozgbrasil.github.io/master/assets/images/logos/logo_32_32.png "MOZG"

![valid XHTML][checkmark]

# findup

- https://github.com/mozgbrasil/node-labs/tree/develop/views/tests/findup/scope

## API / Back-End

### Repositório

- https://github.com/mozgbrasil/node-labs

#### 1. Importar dados

`npx ts-node scripts/PatientSeeder.ts`

#### 2. REST API

- Baseado no framework [Express.js](https://expressjs.com/)
- Suporte ao uso do framework [Swagger](<https://en.wikipedia.org/wiki/Swagger_(software)>)
- Swagger é um conjunto de ferramentas de código aberto construído em torno da especificação OpenAPI que pode ajudá-lo a projetar, construir, documentar e consumir APIs REST.
- A seguir acesso a url do Swagger no projeto [https://node-labs-nine.herokuapp.com/doc/](https://node-labs-nine.herokuapp.com/doc/)
- A seguir acesso a url do de registro no projeto [https://node-labs-nine.herokuapp.com/users/613253b83d4bfc65cd4113b3](https://node-labs-nine.herokuapp.com/users/613253b83d4bfc65cd4113b3)

#### 3. Extras

1. `$(npm bin)/jest ./test/z_findupit.test`
2. Na pasta .devcontainer temos o container Docker construido pela equipe do vscode para execução do ambiente
3. @TODO - "Escrever esquema de segurança nos endpoints" / O projeto já contêm prática de autorização, mas não foi integrado aos novos endpoints nesse momento
4. Não implantado a especificação "Open API 3.0" devido a ausencia de biblioteca de automação, oque me demandaria maior tempo para geração da documentação da API

## Front-end

### Repositório

- https://github.com/mozgbrasil/react-berry

### Implantando em

- https://react-berry.vercel.app/react-berry/patients

#### 1. Extras

1. @TODO
2. @TODO
3. @TODO
4. @TODO
5. @TODO
6. @TODO

#### 2.

@ TODO: Pesquisa
@ TODO: exibir os paginadores restantes
