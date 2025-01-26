//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';


/** o codigo acima se repete so muda a tag e o texto, nesses
 * casos qdo ha um padrao q se repete, o ideal é usar functions
 */
//  let campo = document.querySelector(tag)
//  campo.innerHTML = texto


let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();/* essa variavel guarda o return da funcao gerarNumAleatorio*/
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

//exibirTextoNaTela('h1', 'Jogo do número secreto');
//exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
function exibirMensagemInicial() {
        exibirTextoNaTela('h1', 'Jogo do número secreto');
        exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
    }

exibirMensagemInicial();   

function verificarChute() {
    //console.log('O botão foi clicado!')
    let chute = document.querySelector('input').value;
    //console.log(numeroSecreto);
    // console.log(chute == numeroSecreto);
   
   // Verifica se o chute contém apenas dígitos numéricos, é mais precisa do que isNan
        if (!/^\d+$/.test(chute)) {
                exibirTextoNaTela('p', 'Por favor, insira apenas números.');
                return;
        }
    //chute = parseInt(chute);
    if (chute == numeroSecreto) {
        //exibirTextoNaTela('h1', 'Acertou!');
        //exibirTextoNaTela('p', 'Você descobriu o número secreto!');
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
                if (chute > numeroSecreto) {
                        exibirTextoNaTela('p', 'O número secreto é menor');
                } else {
                        exibirTextoNaTela('p', 'O número secreto é maior');
                }
                tentativas++;
                limparCampo();
        }
}
   



function gerarNumeroAleatorio() {
        let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
        let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

        if (quantidadeDeElementosNaLista == numeroLimite) {
                listaDeNumerosSorteados = [];
        }
        if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
                return gerarNumeroAleatorio();
        } else {
                listaDeNumerosSorteados.push(numeroEscolhido);
                console.log(listaDeNumerosSorteados)
                return numeroEscolhido;
        }
}

   // return parseInt(Math.random() * 10 + 1);
   function limparCampo() {
        chute = document.querySelector('input');
        chute.value = '';
    }
    
    function reiniciarJogo() {
        numeroSecreto = gerarNumeroAleatorio();
        limparCampo();
        tentativas = 1;
        exibirMensagemInicial();
        document.getElementById('reiniciar').setAttribute('disabled', true)
    }