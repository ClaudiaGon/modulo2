//teremos eventos na nossa calculadora//
/**
 * objetivo será configurar todos os elementos da minha calcurladora
 */
function configurar() {
console.log("configurar");
configurarAbrirHistorico();
configurarfecharHistorico();
configurarClicksTeclas();
configurarTeclasTeclado();
}

function configurarTeclasTeclado() {
    document.addEventListener("keydown", (event)=>{
        console.log(event.keyCode, event.shiftKey);

        if (event.keyCode >= 48 && event.keyCode <= 57){
            let valor = String.fromCharCode(event.keyCode);
            registrarExpressaoPainel(valor);
        } else if (event.keyCode == 27) { //ESC
            limparPainel();
        } else if (event.keyCode == 13) { //ENTER
            calcular();
        }
    });
}

//#region  Funcoes do painel
function    registrarExpressaoPainel(valor){
    let expressaoAovivo = document.getElementById("expressaoAovivo");
    expressaoAovivo.innerText += valor;
}

function    limparPainel() {
    let expressaoAovivo = document.getElementById("expressaoAovivo");
    expressaoAovivo.innerText = "";

    let expressaoDigitada = document.getElementById("expressaoDigitada");
    expressaoDigitada.innerText += valor;
}

function configurarAbrirHistorico() {
    console.log("configurarAbrirHistorico");

    let abrirHistorico = document.getElementById("abrirHistorico");
    abrirHistorico.addEventListener("click",(event) =>{
        let historicoLista = document.getElementById("historicoLista");
        historicoLista.style.visibility = "visible";

        carregarHistorico();
    });
}

function carregarHistorico () {
    let historico = JSON.parse(localStorage.getItem("historico"));
    let historicolistaIteins = document.getElementById("historicolistaIteins");
        historicolistaIteins.innerHTML = "";
        for (const item of historico){
            let itemFormatado = `
                    <div class="item-historico">
                    <span class="expressao">${item.expressao}</span>
                    <span class="sinal">=</span>
                    <span class="resultado">${item.resultado}</span><br>
                    </div>
            `;
            historicolistaIteins.innerHTML += itemFormatado;
        }
}
function configurarfecharHistorico() {
    console.log("configurarfecharHistorico");

let fecharHistorico = document.getElementById("fecharHistorico");
    fecharHistorico.addEventListener("click",(event) =>{
        let historicoLista = document.getElementById("historicoLista");
        historicoLista.style.visibility = "hidden";
    });
}
//#endregion

//#region   funcoes do teclado da calculadora 
function configurarClicksTeclas() {
    console.log("configurarClicksTeclas");

    let botoes = document.getElementsByClassName("botao");

    for (const botao of botoes) {
        botao.addEventListener("click", (event) =>{

            let valorbotao = event.target.getAttribute("data-value");
            let expressaoAovivo = document.getElementById("expressaoAovivo");

            if(valorbotao == "AC") {
                expressaoAovivo.innerText = "";
            } 
            else if (valorbotao == "=") {
                calcular();
            } else if (valorbotao == "+" ||
                        valorbotao == "-"||
                        valorbotao == "/"||
                        valorbotao == "x"
            ) { 
                //interpolação
                //expressaoAoVivo.innerText -= ` ${valorbotao}` ;

                expressaoAovivo.innerText += valorbotao;
            } else {
                expressaoAovivo.innerText += valorbotao;
            }
        });
    }

    console.log("botões", botoes);
}
//#endregion


//#region | Historico
function registrarHistorico(expressao, resultado){
    console.log("registrarHistorico", expressao, resultado);

    let historicoCalculos = [];

    if (localStorage.getItem("historico")){
        historicoCalculos = JSON.parse(localStorage.getItem("historico"));
    }

    let historicoItem = {
        expressao: expressao,
        resultado: resultado
    }
    historicoCalculos.push(historicoItem);

    localStorage.setItem("historico", JSON.stringify(historicoCalculos));

}
//#endregion
//#region Operações da calculadora
function calcular() {
    console.log("Criar mecanismo que calculo");

    let expressaoAovivo = document.getElementById("expressaoAovivo");
    let expressaoDigitada = document.getElementById("expressaoDigitada");

    let expressaoSoma = expressaoAovivo.innerText.split("+");
    let expressaoSubtracao = expressaoAovivo.innerText.split("-");
    let expressaoDivisao = expressaoAovivo.innerText.split("/");
    let expressaoMultiplicacao = expressaoAovivo.innerText.split("x");

    let resultado = 0;
    if (expressaoSoma){
        resultado = parseFloat(expressaoSoma[0]) + parseFloat(expressaoSoma[1]);
    } else if (expressaoSubtracao){
        console.log("implementar subtração");
    } else if (expressaoDivisao) {
        console.log("implementar divisão");
    } else { 
        console.log("implementar Multiplicação");
    }

    expressaoDigitada.innerText = expressaoAovivo.innerText + " = ";
    registrarHistorico(expressaoAovivo.innerText, resultado);
    expressaoAovivo.innerText = resultado; 
}
//#endregion