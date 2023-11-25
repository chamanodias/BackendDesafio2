const express = require('express');
const morgan = require('morgan');
const users = require('./usuarios.json');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

// Rota para a raiz
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de autenticação!');
});

// Rota para criar usuário (sign up)
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // Verifica se o e-mail já existe
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: 'E-mail já existente' });
  }

  // Adiciona novo usuário (simulação de persistência)
  users.push({ email, password });
  res.status(201).json({ message: 'Cadastro bem-sucedido' });
});

// Rota para autenticação (sign in)
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Verifica as credenciais
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    res.json({ message: 'Login bem-sucedido' });
  } else {
    res.status(401).json({ error: 'E-mail ou senha incorretos' });
  }
});

// Rota para buscar usuário
app.get('/buscar-usuario', async (req, res, next) => {
  // Lógica para buscar o usuário
  res.send('Endpoint de busca de usuário');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
