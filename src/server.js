const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// rotas
const usuarioRoutes = require('./routes/usuario.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const despesaRoutes = require('./routes/despesa.routes');

// Middlewares
app.use(express.json());

// Rotas da API
app.get('/', (req, res) => {
    res.send('API Financeira do ERP no ar!');
});

app.use('/usuarios', usuarioRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/despesas', despesaRoutes);


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});