# Deployment da Aplicação Completa

Este diretório contém os arquivos necessários para construir e executar a aplicação completa (Frontend, Backend e Banco de Dados) usando Docker.

## Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Como Executar

1.  **Configurar Variáveis de Ambiente:**
    
    Certifique-se de que o arquivo `.env` existe no diretório `api` (`../api/.env`) com as seguintes variáveis:
    
    ```env
    DATABASE_URL="postgresql://docker:docker@postgres:5432/gastosdb?schema=public"
    JWT_SECRET="sua_chave_secreta_jwt"
    ```
    
    **Importante:** Note que o host do banco de dados é `postgres`, que é o nome do serviço definido no `docker-compose.yml`.

2.  **Construir e Iniciar os Containers:**
    
    Navegue até este diretório (`deployment`) e execute o seguinte comando:
    
    ```bash
    docker-compose up --build
    ```
    
    Este comando irá construir as imagens para o frontend e o backend e iniciar todos os containers.

3.  **Acessar a Aplicação:**
    
    -   **Frontend:** [http://localhost:80](http://localhost:80)
    -   **Backend API:** [http://localhost:3000](http://localhost:3000)
    -   **Adminer (Gerenciador do Banco):** [http://localhost:8080](http://localhost:8080)

## Parando os Containers

Para parar todos os serviços, pressione `Ctrl + C` no terminal onde o `docker-compose` está rodando, ou execute o seguinte comando no diretório `deployment`:

```bash
docker-compose down
```
