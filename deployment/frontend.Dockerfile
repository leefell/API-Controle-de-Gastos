# Estágio 1: Build da aplicação React
FROM node:18-alpine AS build

WORKDIR /app

# Copia os arquivos de dependência
COPY ../frontend/package.json ./package.json
COPY ../frontend/package-lock.json ./package-lock.json

# Instala as dependências
RUN npm install

# Copia o código fonte do frontend
COPY ../frontend/ ./

# Builda a aplicação para produção
RUN npm run build

# Estágio 2: Servir a aplicação com Apache
FROM httpd:2.4-alpine

# Copia os arquivos estáticos do estágio de build para o diretório do Apache
COPY --from=build /app/dist /usr/local/apache2/htdocs/

# Copia o arquivo de configuração customizado do Apache
COPY deployment/httpd.conf /usr/local/apache2/conf/httpd.conf

# Expõe a porta 80
EXPOSE 80