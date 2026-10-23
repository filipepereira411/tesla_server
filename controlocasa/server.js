const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'carf.html'));
});

const PORT = 3004;
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`Painel Tesla Ativo com Câmara Local!`);
    console.log(`Acede em: http://localhost:${PORT}`);
    console.log(`==================================================`);
});
