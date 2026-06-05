// Objeto contendo as configurações visuais de cada moeda (Nome amigável e imagem correspondente)
const moedasConfig = {
    BRL: { nome: "Real", img: "img/br.png" },
    USD: { nome: "Dólar Americano", img: "img/us.png" },
    EUR: { nome: "Euro", img: "img/eu.png" },
    GBP: { nome: "Libra Esterlina", img: "img/uk.png" },
    JPY: { nome: "Iene Japonês", img: "img/jp.png" },
    BTC: { nome: "Bitcoin", img: "img/btc.png" }
};

// Cotações fixas de referência baseadas no mercado (Valor em Reais BRL)
const taxasEmBrl = {
    BRL: 1.00,
    USD: 5.30,
    EUR: 5.90,
    GBP: 6.70,
    JPY: 0.035,
    BTC: 350000.00
};

// Elementos do DOM
const botaoConverter = document.getElementById("botao-converter");
const selectDe = document.getElementById("select-de");
const selectPara = document.getElementById("select-para");
const inputValor = document.getElementById("input-valor");

const imgDe = document.getElementById("img-de");
const nomeDe = document.getElementById("nome-de");
const valorDe = document.getElementById("valor-de");

const imgPara = document.getElementById("img-para");
const nomePara = document.getElementById("nome-para");
const valorPara = document.getElementById("valor-para");

// Função para formatar os valores de forma personalizada para cada moeda
function formatarMoeda(valor, moeda) {
    if (moeda === "BTC") {
        return `₿ ${valor.toFixed(8)}`;
    }
    
    const localizacao = {
        BRL: { lingua: 'pt-BR', estilo: { style: 'currency', currency: 'BRL' } },
        USD: { lingua: 'en-US', estilo: { style: 'currency', currency: 'USD' } },
        EUR: { lingua: 'de-DE', estilo: { style: 'currency', currency: 'EUR' } },
        GBP: { lingua: 'en-GB', estilo: { style: 'currency', currency: 'GBP' } },
        JPY: { lingua: 'ja-JP', estilo: { style: 'currency', currency: 'JPY' } }
    };

    return valor.toLocaleString(localizacao[moeda].lingua, localizacao[moeda].estilo);
}

// Lógica de conversão matemática pura (Conversão Cruzada)
function converterMoedas() {
    const valorDigitado = parseFloat(inputValor.value);
    
    if (isNaN(valorDigitado) || valorDigitado <= 0) {
        alert("Por favor, insira um valor válido maior que zero.");
        return;
    }

    const moedaOrigem = selectDe.value;
    const moedaDestino = selectPara.value;

    // Converte o valor de origem primeiro para Real (BRL) base, depois para a moeda final de destino
    const valorEmBrl = valorDigitado * taxasEmBrl[moedaOrigem];
    const valorFinal = valorEmBrl / taxasEmBrl[moedaDestino];

    // Atualiza a interface gráfica com os resultados calculados
    valorDe.textContent = formatarMoeda(valorDigitado, moedaOrigem);
    valorPara.textContent = formatarMoeda(valorFinal, moedaDestino);
}

// Atualiza dinamicamente as bandeiras e os nomes no card quando os selects mudam
function atualizarLayoutVisual() {
    const moedaOrigem = selectDe.value;
    const moedaDestino = selectPara.value;

    // Atualiza moeda "De"
    imgDe.src = moedasConfig[moedaOrigem].img;
    nomeDe.textContent = moedasConfig[moedaOrigem].nome;

    // Atualiza moeda "Para"
    imgPara.src = moedasConfig[moedaDestino].img;
    nomePara.textContent = moedasConfig[moedaDestino].nome;
    
    // Roda a conversão automaticamente ao alterar as moedas
    converterMoedas();
}

// Ouvintes de Eventos (Listeners)
botaoConverter.addEventListener("click", converterMoedas);
selectDe.addEventListener("change", atualizarLayoutVisual);
selectPara.addEventListener("change", atualizarLayoutVisual);

// Executa uma vez ao carregar a página para manter os valores iniciais corretos
atualizarLayoutVisual();