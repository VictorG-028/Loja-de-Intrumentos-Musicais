

# Como executar

## Precisa ter instalado
- [NodeJS](https://nodejs.org/en/download)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Comandos
Para rodar o backend sem container
```bash
npm i
npx prisma generate
npx prisma db push
npm run dev
docker compose -f docker-compose-only-db.yml up
```

Para rodar 2 container (backend + database)
```bash
docker-compose up
```
