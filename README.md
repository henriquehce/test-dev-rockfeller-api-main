# API de Teste - Estágio em Programação

Você recebeu uma API base para utilizar neste teste.

Seu objetivo é executar o projeto localmente e realizar as alterações solicitadas nas instruções da missão.

## Tecnologia utilizada

- Node.js
- Express

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
Example app listening on port 3009
```

## URL local da API

Servidor local:

```text
http://localhost:3009
```

Exemplo de rota disponível:

```text
GET http://localhost:3009/students
```

## Como testar no Insomnia ou Postman

Com o servidor rodando, crie uma requisição do tipo `GET` para:

```text
http://localhost:3009/students
```

Envie a requisição e verifique se a API retorna a lista em JSON.

## Onde alterar ou criar novas funções

As rotas da API estão no arquivo `app.js`.

Se for necessário criar uma nova funcionalidade, o ponto inicial é adicionar uma nova rota nesse arquivo.

Exemplo:

```js
app.get('/nova-rota', (req, res) => {
  res.json({ message: 'Nova rota funcionando' })
})
```

## Missões

### Instruções Iniciais
Você pode usar ORM como o https://typeorm.io ou fazer a leitura diretamente no banco.

O código desenvolvido deve ser versionado e disponibilizado no GitHub.

Se você criar um projeto separado para o frontend, ele também deve estar no GitHub.

Você pode utilizar IA para desenvolvimento, desde que consiga entender e explicar o código criado.


### Missão 1

A rota de estudantes atualmente retorna dados mockados no código.

Sua missão é alterar essa funcionalidade para ler os estudantes de um banco SQLite.


### Missão 2

Crie um endpoint para salvar novos estudantes no banco de dados.

Você pode definir a estrutura da rota e a forma de persistência da maneira que considerar mais adequada.

### Missão 3

Crie uma aplicação frontend para consumir esta API e listar os estudantes em uma tabela.

O principal objetivo desta missão é exibir os dados da API em tela.

## Orientações para a Missão 3

O frontend deve ser criado em um projeto novo e separado deste projeto da API.

Durante o desenvolvimento, você terá dois projetos rodando localmente: a API e o frontend.

O frontend deverá consumir os dados disponibilizados por esta API.

Antes de desenvolver o frontend, confirme que a API está rodando e que a rota `GET /students` funciona corretamente.

Se o frontend não conseguir consumir a API no navegador, verifique se existe alguma configuração necessária para permitir essa comunicação local entre os dois projetos.

Como recomendação, você pode criar o frontend com Next.js e utilizar a biblioteca de UI `shadcn/ui`, pois essa é uma estrutura que usamos na empresa.

Para a listagem, a recomendação é usar o componente `data-table` do `shadcn/ui`.

Documentação de referência:

- Next.js Getting Started: https://nextjs.org/docs/app/getting-started/installation
- shadcn/ui: https://ui.shadcn.com/
- shadcn/ui Data Table: https://ui.shadcn.com/docs/components/radix/data-table#basic-table

Essa estrutura é apenas uma recomendação.

O frontend também pode ser feito de outra forma, com a tecnologia de sua preferência.

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
