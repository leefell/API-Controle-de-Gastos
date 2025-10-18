# API de Controle de Gastos

Uma API simples para gerenciar despesas pessoais, com cadastro de usuários, categorias e despesas.

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

## Instalação

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd trabalho-dw3
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Executando a Aplicação

1. **Inicie o banco de dados:**
   Execute o comando abaixo para iniciar o container do PostgreSQL com o Docker.
   ```bash
   docker-compose up -d
   ```

2. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```env
   DATABASE_URL="postgresql://docker:docker@localhost:5432/gastosdb?schema=public"
   JWT_SECRET="sua_chave_secreta_jwt"
   ```

3. **Aplique as migrações do banco de dados:**
   Este comando irá criar as tabelas no banco de dados com base no schema do Prisma.
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Inicie o servidor:**
   ```bash
   npm run dev
   ```
   O servidor estará disponível em `http://localhost:3000`.

## Testando as Rotas

Você pode usar uma ferramenta como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar os endpoints da API.

### Autenticação

- **`POST /auth/login`**: Gera um token **Bearer** caso as credenciais sejam válidas.  
  - **Corpo da requisição (JSON):**
    ```json
    {
      "email": "usuario@exemplo.com",
      "senha": "senha123"
    }
    ```
  - **Resposta (200 - Sucesso):**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
  - **Resposta (401 - Credenciais inválidas):**
    ```json
    {
      "erro": "Email ou senha inválidos"
    }
    ```

### Usuários

-   `GET /usuarios`: Lista todos os usuários.
-   `GET /usuarios/:id`: Obtém um usuário específico.
-   `POST /usuarios`: Cria um novo usuário.
    -   Corpo da requisição (JSON):
        ```json
        {
          "email": "usuario@exemplo.com",
          "nome": "Nome do Usuário",
          "senha": "senha123"
        }
        ```
-   `PUT /usuarios/:id`: Atualiza um usuário.
-   `DELETE /usuarios/:id`: Remove um usuário.

### Categorias

-   `GET /categorias`: Lista todas as categorias.
-   `GET /categorias/:id`: Obtém uma categoria específica.
-   `POST /categorias`: Cria uma nova categoria.
    -   Corpo da requisição (JSON):
        ```json
        {
          "nome": "Nome da Categoria"
        }
        ```
-   `PUT /categorias/:id`: Atualiza uma categoria.
-   `DELETE /categorias/:id`: Remove uma categoria.

### Despesas

-   `GET /despesas`: Lista todas as despesas.
-   `GET /despesas/:id`: Obtém uma despesa específica.
-   `POST /despesas`: Cria uma nova despesa.
    -   Corpo da requisição (JSON):
        ```json
        {
          "descricao": "Descrição da Despesa",
          "valor": 100.50,
          "data": "2025-10-17T10:00:00.000Z",
          "usuarioId": 1,
          "categoriaId": 1
        }
        ```
-   `PUT /despesas/:id`: Atualiza uma despesa.
-   `DELETE /despesas/:id`: Remove uma despesa.
