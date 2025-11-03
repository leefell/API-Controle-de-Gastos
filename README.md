# Sistema de Controle de Gastos

Este é um sistema completo para ajudar no controle de finanças pessoais. Com ele, você pode se cadastrar, criar categorias e registrar todos os seus gastos de forma simples.

O projeto foi desenvolvido para rodar com Docker, o que torna a instalação e execução muito mais fáceis, pois todo o ambiente (aplicação, banco de dados, etc.) funciona de forma integrada.

---

## O que o sistema faz?

- **Cadastro e Login de Usuários:** Crie sua conta e acesse o sistema de forma segura.
- **Gestão de Categorias:** Organize seus gastos criando categorias como "Alimentação", "Transporte", "Moradia", etc.
- **Registro de Despesas:** Adicione seus gastos informando a descrição, o valor, a data e a qual categoria ele pertence.
- **Visualização e Edição:** Veja todas as suas despesas em uma lista e edite ou apague qualquer registro.
- **Interface Simples:** A aplicação web foi pensada para ser fácil e intuitiva de usar.

---

## Tecnologias usadas

- **Aplicação (Frontend):**
  - **React** com **Vite** (para uma experiência de uso rápida e moderna).
  - **React Router** (para navegar entre as telas).
  - **Context API** (para gerenciar o login).
  - **Axios** (para comunicar com o backend).

- **Servidor (Backend):**
  - **Node.js** com **Express** (para criar a API que recebe e envia os dados).
  - **Prisma** (para conversar com o banco de dados de forma mais fácil).
  - **PostgreSQL** (o banco de dados onde tudo fica guardado).
  - **JWT** (para garantir que só você acesse suas informações).

- **Ambiente e Infraestrutura:**
  - **Docker** e **Docker Compose** (para "empacotar" e rodar a aplicação completa).

---

## Estrutura do projeto

O código está dividido em três pastas principais:

- **/frontend:** Contém a aplicação web que você vê e usa no navegador.
- **/api:** Contém o servidor que guarda e processa suas informações.
- **/deployment:** Contém os arquivos do Docker para fazer tudo funcionar junto.

---

## Como executar a aplicação com Docker

Este é o jeito mais fácil de rodar o projeto.

### Pré-requisitos

- Ter o **Docker Desktop** instalado no seu computador.

### Passo 1: Criar o arquivo de ambiente

A API precisa de um arquivo para guardar algumas informações importantes.

1.  Vá até a pasta `/api`.
2.  Crie um arquivo chamado `.env`.
3.  Copie e cole o conteúdo abaixo dentro dele:

    ```env
    # Endereço do banco de dados que roda no Docker
    DATABASE_URL="postgresql://docker:docker@postgres:5432/gastosdb?schema=public"

    # Chave para a segurança do sistema de login (pode ser qualquer texto)
    JWT_SECRET="SUA_CHAVE_SECRETA_AQUI"
    ```

### Passo 2: Iniciar a aplicação

1.  Abra um terminal e navegue até a pasta `/deployment`:

    ```bash
    cd deployment
    ```

2.  Execute o comando abaixo para o Docker construir e iniciar tudo:

    ```bash
    docker compose up --build
    ```

    Na primeira vez, o processo pode demorar um pouco. Nas próximas, será bem mais rápido.

### Passo 3: Acessar o sistema

Quando o comando terminar, os serviços estarão disponíveis nos seguintes endereços:

-   **Aplicação principal:** [http://localhost](http://localhost)
-   **API do backend:** [http://localhost:3000](http://localhost:3000)
-   **Gerenciador do Banco de Dados (Adminer):** [http://localhost:8080](http://localhost:8080)

### Passo 4: Parar a aplicação

Para desligar tudo, volte ao terminal onde o Docker está rodando e pressione `Ctrl + C`. Ou, em um novo terminal, vá até a pasta `deployment` e execute:

```bash
docker compose down
```

---

## Como o sistema funciona

1.  **Cadastro:** Você cria sua conta com nome, email and senha.
2.  **Login:** Você entra no sistema com seu email e senha. O sistema te dá uma autorização temporária.
3.  **Uso do Painel:** Após o login, você pode:
    -   Criar e ver suas categorias.
    -   Adicionar, editar ou apagar despesas.
4.  **Logout:** Você pode sair da sua conta para encerrar o acesso.

---

<details>
<summary>Rotas da API</summary>

### Autenticação

- **`POST /auth/login`**: Entra no sistema e recebe uma autorização.
- **`GET /auth/me`**: Retorna os dados do usuário logado.

### Usuários

-   `POST /usuarios`: Cria um novo usuário (cadastro).
-   `GET /usuarios`: Lista todos os usuários.
-   `GET /usuarios/:id`: Mostra um usuário específico.
-   `PUT /usuarios/:id`: Atualiza um usuário.
-   `DELETE /usuarios/:id`: Apaga um usuário.

### Categorias

-   `POST /categorias`: Cria uma nova categoria.
-   `GET /categorias`: Lista todas as categorias do usuário logado.
-   `GET /categorias/:id`: Mostra uma categoria específica.
-   `PUT /categorias/:id`: Atualiza uma categoria.
-   `DELETE /categorias/:id`: Apaga uma categoria.

### Despesas

-   `POST /despesas`: Cria uma nova despesa.
-   `GET /despesas`: Lista todas as despesas do usuário logado.
-   `GET /despesas/:id`: Mostra uma despesa específica.
-   `PUT /despesas/:id`: Atualiza uma despesa.
-   `DELETE /despesas/:id`: Apaga uma despesa.

</details>
