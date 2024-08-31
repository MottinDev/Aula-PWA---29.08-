import { MiniExpress } from './lib/mini-express';

const app = new MiniExpress();

// Middleware 1: Logger - Registra o método e a URL da requisição.
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  if (next) next(); // Passa o controle para o próximo middleware.
});

// Middleware 2: Verifica a autenticação (simulação)
app.use((req, res, next) => {
  const authenticated = true; // Simula uma verificação de autenticação.
  if (authenticated) {
    if (next) next(); // Se autenticado, passa para o próximo middleware.
  } else {
    res.statusCode = 401;
    res.end('Not authenticated'); // Encerra a resposta se não autenticado.
  }
});

// Middleware 3: Manipula a rota raiz "/"
app.use((req, res, next) => {
  if (req.url === '/') {
    res.write('Welcome to the Home Page!');
    res.end(); // Encerra a resposta para a rota raiz.
  } else {
    if (next) next(); // Passa o controle para o próximo middleware se a rota não for "/".
  }
});

// Middleware 4: Manipula a rota "/about"
app.use((req, res, next) => {
  if (req.url === '/about') {
    res.write('This is the About Page.');
    res.end(); // Encerra a resposta para a rota "/about".
  } else {
    if (next) next(); // Passa o controle para o próximo middleware se a rota não for "/about".
  }
});

// Middleware Final: Manipula todas as outras rotas
app.use((req, res) => {
  res.statusCode = 404;
  res.end('404 Not Found'); // Encerra a resposta com uma mensagem de "404 Not Found".
});

// Inicia o servidor na porta 3000.
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
