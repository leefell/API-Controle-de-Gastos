# Estágio 1: Instalar dependências
FROM node:18-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Estágio 2: Construir a aplicação
FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Gera o Prisma Client
RUN npm run prisma:generate

# Estágio 3: Imagem final de produção
FROM node:18-alpine

WORKDIR /app

# Instala o cliente do postgresql para o script de espera
RUN apk add --no-cache postgresql-client

# Copia as dependências de produção
COPY --from=builder /app/node_modules ./node_modules

# Copia o código da aplicação, o schema do Prisma e o script de espera
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/wait-for-postgres.sh .

# Torna o script de espera executável
RUN chmod +x wait-for-postgres.sh

# Expõe a porta da API
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
