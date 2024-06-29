# User Management API

## Descrição
Esta é uma API backend para gerenciamento de usuários desenvolvida em Node.js utilizando MongoDB como banco de dados. A API oferece operações CRUD básicas para usuários (_create_, _read_, _update_, _delete_).

## Requisitos
Para executar esta aplicação, você precisa ter o seguinte instalado em seu ambiente:
- Node.js (v14.x ou superior)
- MongoDB

## Instalação

1. **Clonar o repositório:**

   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd <NOME_DO_DIRETORIO>
   ```

2. **Instalar dependências:**

   ```bash
     npm install express mongodb supertest jest
   ```

3. **Configurar variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```plaintext
   PORT=3000  # Porta em que a API será executada
   MONGODB_URI=mongodb://root:root@localhost:27017/users_db?retryWrites=true&writeConcern=majority  # URI de conexão com o MongoDB
   ```

   Substitua `mongodb://root:root@localhost:27017/users_db?retryWrites=true&writeConcern=majority` pela URI do seu MongoDB.

## Execução

1. **Iniciar o servidor:**

   ```bash
   npm start
   ```

   A API estará acessível em `http://localhost:3000`.

## Testes

Para executar os testes unitários e de sistema:

1. **Executar testes:**

   ```bash
   npm test
   ```

   Os testes incluem validação das operações CRUD para usuários e cenários de erro como usuário não encontrado.

## Documentação da API

- **Listar todos os usuários:**

  ```http
  GET /users
  ```

- **Detalhar um usuário:**

  ```http
  GET /users/:id
  ```

- **Criar um novo usuário:**

  ```http
  POST /users
  ```

- **Atualizar um usuário:**

  ```http
  PUT /users/:id
  ```

- **Remover um usuário:**

  ```http
  DELETE /users/:id
  ```
