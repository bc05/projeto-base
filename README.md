# Projeto Base

intro

## Requisitos

- TypeScript 4.1
- NodeJS 16.14.0
- MongoDB 5.0

## Tecnologias

- [NestJs](https://docs.nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

## Guias de desenvolvimento

### Instalação

- Instalação dos pacotes: `npm install`;
- Prepara o husky: `npm run prepare`;
- (Opcional) Docker:
  - Necessário a instalação e configuração do [Docker](https://www.docker.com/get-started) e [docker-compose](https://docs.docker.com/compose/install/);
  - Executar o build das imagens: `docker-compose build`;
  - Subir todos os containers: `docker-compose up -d`;
  - Subir apenas o container do banco de dados: `docker-compose up -d database`;
- Subir aplicação: `npm run start:dev`.
  - Por padrão, a aplicação utiliza a porta 3000.

### Commits

O Projeto utiliza o [Husky](https://typicode.github.io/husky/#/) para garantir o uso dos padrões de estilo de código e mensagens de commit ([Convertional Commits](https://www.conventionalcommits.org/en/v1.0.0/)).

### Desenvolvendo uma nova funcionalidade

**_À ser definido._**
