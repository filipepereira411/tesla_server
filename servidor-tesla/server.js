const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();

app.use(cors()); 

// ROTA QUE VAI DISPARAR O TEU FICHEIRO .BAT
app.get('/executar', (req, res) => {
    
    // AQUI COLOCAS O CAMINHO REAL DO TEU .BAT (Substitui "o_teu_caminho" pela tua pasta real)
    const caminhoScript = '"C:\(\o_teu_caminho\gerar_exe.\)bat"'; 

    exec(caminhoScript, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao executar: ${error}`);
            return res.status(500).send('Erro ao executar o ficheiro.');
        }
        res.send('Ficheiro executado com sucesso!');
    });
});

app.listen(3001, () => {
    console.log('Servidor local a rodar em http://localhost:3001');
});
