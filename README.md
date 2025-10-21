# Sistema de Controle de Gastos

Bem-vindo ao Sistema de Controle de Gastos, uma aplicação full-stack projetada para ajudar usuários a gerenciar suas finanças pessoais. O sistema permite o cadastro de usuários, criação de categorias de gastos e o registro detalhado de despesas.

O projeto é totalmente containerizado com Docker, permitindo que toda a pilha de tecnologia (Frontend, Backend e Banco de Dados) seja executada com um único comando, garantindo um ambiente de desenvolvimento consistente e simplificado.

---

## Funcionalidades

- **Autenticação de Usuários:** Sistema seguro de cadastro e login com tokens JWT.
- **Gestão de Categorias:** Crie e gerencie categorias personalizadas para seus gastos (ex: Alimentação, Transporte, Lazer).
- **Registro de Despesas:** Adicione novas despesas com descrição, valor, data e categoria associada.
- **Visualização e Edição:** Visualize todas as suas despesas em uma tabela, com opções para editar ou excluir cada registro.
- **Interface Moderna:** Frontend reativo e amigável construído com React e Vite.
- **Ambiente Containerizado:** Setup completo com Docker para facilitar a execução e o deploy.

---

## Tecnologias Utilizadas

- **Frontend:**
  - **React 18** com **Vite**
  - **React Router** para gerenciamento de rotas.
  - **Context API** para controle de estado global (autenticação).
  - **Axios** para requisições HTTP.
  - **React Icons** para iconografia.
  - Servido por **Apache** em um container Docker.

- **Backend:**
  - **Node.js** com **Express**.
  - **Prisma ORM** para interação com o banco de dados.
  - **PostgreSQL** como banco de dados relacional.
  - Autenticação baseada em **JWT (JSON Web Tokens)**.

- **Deployment & Infraestrutura:**
  - **Docker** e **Docker Compose** para containerização e orquestração de serviços.

---

## Estrutura do Projeto

O projeto é organizado em três diretórios principais na raiz:

- **/frontend:** Contém toda a aplicação React (Vite).
- **/api:** Contém a aplicação backend em Node.js (Express) e as configurações do Prisma.
- **/deployment:** Contém os arquivos Docker (`docker-compose.yml`, `Dockerfile` do frontend, etc.) para orquestrar e unificar a execução de todos os serviços.

---

## Executando a Aplicação com Docker (Recomendado)

Esta é a maneira mais simples e recomendada de executar o projeto, pois cuida de toda a configuração e dependências automaticamente.

### Pré-requisitos

- **Docker Desktop** instalado e em execução.

### Passo 1: Configurar Variáveis de Ambiente

Antes de iniciar, você precisa criar um arquivo para as variáveis de ambiente da API.

1.  Vá até o diretório `/api`.
2.  Crie um arquivo chamado `.env`.
3.  Copie e cole o seguinte conteúdo dentro dele:

    ```env
    # URL de conexão com o banco de dados no container Docker
    DATABASE_URL="postgresql://docker:docker@postgres:5432/gastosdb?schema=public"

    # Chave secreta para gerar os tokens JWT (pode ser qualquer string segura)
    JWT_SECRET="MINHA_CHAVE_SECRETA_123"
    ```

    **Importante:** O host do banco de dados (`postgres`) é o nome do serviço definido no `docker-compose.yml`, permitindo a comunicação entre os containers.

### Passo 2: Iniciar a Aplicação

1.  Abra seu terminal e navegue até a pasta `/deployment`:

    ```bash
    cd deployment
    ```

2.  Execute o seguinte comando para construir as imagens e iniciar todos os containers:

    ```bash
    docker-compose up --build
    ```

    Na primeira vez, o Docker fará o download das imagens base e construirá os containers do frontend e do backend. Nas próximas vezes, o processo será muito mais rápido.

### Passo 3: Acessar os Serviços

Após a conclusão do comando, os serviços estarão disponíveis nos seguintes endereços:

-   **Aplicação Frontend:** [http://localhost](http://localhost) (ou http://localhost:80)
-   **API Backend:** [http://localhost:3000](http://localhost:3000)
-   **Adminer (Gerenciador do Banco de Dados):** [http://localhost:8080](http://localhost:8080)

### Passo 4: Parar a Aplicação

Para parar todos os serviços, volte ao terminal onde o `docker-compose` está rodando e pressione `Ctrl + C`. Ou, de qualquer terminal na pasta `deployment`, execute:

```bash
docker-compose down
```

---

## Fluxo da Aplicação

1.  **Cadastro:** O usuário acessa a aplicação e cria uma nova conta fornecendo nome, email e senha.
2.  **Login:** O usuário entra com seu email e senha. A API valida as credenciais e retorna um token JWT, que é armazenado no navegador.
3.  **Navegação Segura:** A partir do login, o token é enviado em todas as requisições para a API, garantindo acesso às rotas protegidas.
4.  **Dashboard:** O usuário é direcionado para o painel principal, onde pode:
    -   Criar novas categorias para seus gastos.
    -   Adicionar novas despesas, associando-as a uma categoria existente.
    -   Visualizar, editar e excluir despesas já cadastradas.
5.  **Logout:** O usuário pode sair da sua conta, o que remove o token de autenticação do navegador.

---

<details>
<summary>Referência de Endpoints da API</summary>

### Autenticação

- **`POST /auth/login`**: Gera um token **Bearer** caso as credenciais sejam válidas.

### Usuários

-   `POST /usuarios`: Cria um novo usuário.
-   `GET /usuarios`: Lista todos os usuários.
-   `GET /usuarios/:id`: Obtém um usuário específico.
-   `PUT /usuarios/:id`: Atualiza um usuário.
-   `DELETE /usuarios/:id`: Remove um usuário.

### Categorias

-   `POST /categorias`: Cria uma nova categoria.
-   `GET /categorias`: Lista todas as categorias.
-   `GET /categorias/:id`: Obtém uma categoria específica.
-   `PUT /categorias/:id`: Atualiza uma categoria.
-   `DELETE /categorias/:id`: Remove uma categoria.

### Despesas

-   `POST /despesas`: Cria uma nova despesa.
-   `GET /despesas`: Lista todas as despesas.
-   `GET /despesas/:id`: Obtém uma despesa específica.
-   `PUT /despesas/:id`: Atualiza uma despesa.
-   `DELETE /despesas/:id`: Remove uma despesa.

</details>
