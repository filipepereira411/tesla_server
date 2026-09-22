@echo off
:: Altera o título da janela temporária (opcional)
title Ativador Sistema Tesla

:: Mensagem rápida no terminal antes de fechar
echo A iniciar o executavel...

:: Abre o teu .exe. Substitui "o_teu_programa.exe" pelo nome real do teu ficheiro.
:: Se o .exe estiver noutra pasta, coloca o caminho completo (ex: "C:\Pasta\programa.exe")
start "" "o_teu_programa.exe"

:: Fecha a janela do CMD imediatamente para não ficar aberta em fundo
exit
