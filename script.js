// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', () => {

    // VARIÁVEIS DO TAMANHO DA FONTE
    let tamanhoFonteAtual = 22; // Tamanho padrão em px
    const tamanhoMinimo = 16;
    const tamanhoMaximo = 34;

    // ELEMENTOS DO HTML
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    const btnReset = document.getElementById('btn-reset');
    const btnContraste = document.getElementById('btn-contraste');
    const btnLer = document.getElementById('btn-ler');

    // 1. FUNÇÃO PARA MUDAR O TAMANHO DA FONTE
    function atualizarTamanhoFonte(novoTamanho) {
        tamanhoFonteAtual = novoTamanho;
        document.body.style.fontSize = `${tamanhoFonteAtual}px`;
    }

    // Eventos dos botões de fonte
    btnAumentar.addEventListener('click', () => {
        if (tamanhoFonteAtual < tamanhoMaximo) {
            atualizarTamanhoFonte(tamanhoFonteAtual + 3);
        }
    });

    btnDiminuir.addEventListener('click', () => {
        if (tamanhoFonteAtual > tamanhoMinimo) {
            atualizarTamanhoFonte(tamanhoFonteAtual - 3);
        }
    });

    btnReset.addEventListener('click', () => {
        atualizarTamanhoFonte(22); // Volta ao padrão
    });

    // 2. FUNÇÃO DE ALTO CONTRASTE
    btnContraste.addEventListener('click', () => {
        document.body.classList.toggle('alto-contraste');
    });

    // 3. FUNÇÃO PARA LER A PÁGINA EM VOZ ALTA (SÍNTESE DE VOZ)
    let estaLendo = false;
    let synth = window.speechSynthesis;

    btnLer.addEventListener('click', () => {
        // Se a API de voz não for suportada pelo navegador
        if (!('speechSynthesis' in window)) {
            alert('Desculpe, seu navegador não suporta a leitura em voz alta.');
            return;
        }

        // Se já estiver lendo, cancela a leitura
        if (estaLendo) {
            synth.cancel();
            estaLendo = false;
            btnLer.textContent = '🔊 Ler Página';
            btnLer.classList.remove('lendo');
            return;
        }

        // Pega todo o texto principal da página
        const textoParaLer = document.querySelector('main').innerText;

        // Cria a mensagem de áudio
        const mensagem = new SpeechSynthesisUtterance(textoParaLer);
        mensagem.lang = 'pt-BR'; // Idioma em português do Brasil
        mensagem.rate = 0.9;      // Velocidade um pouco mais lenta para fácil compreensão

        // Quando começar a falar
        mensagem.onstart = () => {
            estaLendo = true;
            btnLer.textContent = '⏹️ Parar Leitura';
            btnLer.classList.add('lendo');
        };

        // Quando terminar de falar
        mensagem.onend = () => {
            estaLendo = false;
            btnLer.textContent = '🔊 Ler Página';
            btnLer.classList.remove('lendo');
        };

        // Inicia a fala
        synth.speak(mensagem);
    });
});