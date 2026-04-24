# API de Teste - Estágio em Programação

Você recebeu uma API base para utilizar neste teste.

Seu objetivo é executar o projeto localmente e realizar as alterações solicitadas nas instruções da missão.

## Tecnologia utilizada

- Node.js
- Express
- sql.js (SQLite em JavaScript puro)
- cors

## Como rodar localmente

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
node app.js
```

Se estiver tudo certo, o terminal deve mostrar:

```bash
Dados iniciais inseridos no banco.
Example app listening on port 3009
```

> Na segunda vez que rodar, a mensagem "Dados iniciais inseridos" não aparece — os dados já estão salvos no arquivo `students.db`.

## URL local da API

Servidor local:

```text
http://localhost:3009
```

Rotas disponíveis:

```text
GET  http://localhost:3009/students
POST http://localhost:3009/students
```

## Como testar no Insomnia ou Postman

**Listar estudantes:**

Crie uma requisição do tipo `GET` para:

```text
http://localhost:3009/students
```

**Adicionar estudante:**

Crie uma requisição do tipo `POST` para:

```text
http://localhost:3009/students
```

Com o body em JSON:

```json
{
  "name": "João Silva",
  "course": "Ciência da Computação"
}
```

## Onde alterar ou criar novas funções

As rotas da API estão no arquivo `app.js`.

Se for necessário criar uma nova funcionalidade, o ponto inicial é adicionar uma nova rota nesse arquivo.

Exemplo:

```js
app.get('/nova-rota', (req, res) => {
  res.json({ message: 'Nova rota funcionando' })
})
```

---

## Missões

### Instruções Iniciais
Você pode usar ORM como o https://typeorm.io ou fazer a leitura diretamente no banco.

O código desenvolvido deve ser versionado e disponibilizado no GitHub.

Se você criar um projeto separado para o frontend, ele também deve estar no GitHub.

Você pode utilizar IA para desenvolvimento, desde que consiga entender e explicar o código criado.


### Missão 1 ✅

A rota de estudantes atualmente retorna dados mockados no código.

Sua missão é alterar essa funcionalidade para ler os estudantes de um banco SQLite.

**O que foi feito:**

A rota `GET /students` foi alterada para ler os dados de um banco SQLite, utilizando a biblioteca `sql.js` (SQLite puro em JavaScript, sem necessidade de compilação).

O banco é armazenado no arquivo `students.db` na raiz do projeto. Na primeira execução, o arquivo é criado automaticamente com 3 estudantes de exemplo. Nas execuções seguintes, os dados persistidos em disco são carregados.

```js
app.get('/students', (req, res) => {
  const result = db.exec('SELECT * FROM students')
  if (result.length === 0) return res.json([])

  const { columns, values } = result[0]
  const students = values.map(row =>
    Object.fromEntries(columns.map((col, i) => [col, row[i]]))
  )
  res.json(students)
})
```

---

### Missão 2 ✅

Crie um endpoint para salvar novos estudantes no banco de dados.

**O que foi feito:**

Foi criado o endpoint `POST /students` que recebe `name` e `course` no body da requisição e insere o novo estudante no banco SQLite. Após a inserção, os dados são salvos no arquivo `students.db` para persistir entre reinicializações do servidor.

A rota inclui validação básica: retorna erro `400` se `name` ou `course` estiverem ausentes. Em caso de sucesso, retorna o estudante criado com status `201`.

```js
app.post('/students', (req, res) => {
  const { name, course } = req.body

  if (!name || !course) {
    return res.status(400).json({ error: 'Os campos "name" e "course" são obrigatórios.' })
  }

  db.run('INSERT INTO students (name, course) VALUES (?, ?)', [name, course])
  saveDb()

  const result = db.exec('SELECT * FROM students ORDER BY id DESC LIMIT 1')
  const { columns, values } = result[0]
  const newStudent = Object.fromEntries(columns.map((col, i) => [col, values[0][i]]))

  res.status(201).json(newStudent)
})
```

---

### Missão 3 ✅

Crie uma aplicação frontend para consumir esta API e listar os estudantes em uma tabela.

**O que foi feito:**

Foi criado um frontend em HTML, CSS e JavaScript puro (sem framework), no arquivo `index.html`. Para abrir, basta dar duplo clique no arquivo com o servidor da API rodando.

Funcionalidades:
- Tabela que lista todos os estudantes consumindo o `GET /students`
- Formulário para adicionar novos estudantes via `POST /students`
- Feedback visual com loading, animações e mensagens de sucesso/erro
- Mensagem de aviso caso a API não esteja acessível

O `cors` foi adicionado à API para permitir que o frontend, rodando em um endereço diferente, consiga fazer requisições sem bloqueio do navegador.

## Orientações para a Missão 3

O frontend foi criado como um arquivo `index.html` separado da pasta da API.

Para rodar os dois ao mesmo tempo:
1. Inicie a API com `node app.js`
2. Abra o arquivo `index.html` no navegador

O frontend consome os dados da API em `http://localhost:3009`.

---

## Importante

Sempre que o arquivo `app.js` for alterado, o servidor deve ser reiniciado para carregar as mudanças.

Pare o servidor no terminal com:

```bash
Ctrl + C
```

Depois inicie novamente:

```bash
node app.js
```