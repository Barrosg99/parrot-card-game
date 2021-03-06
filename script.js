var n=0;
var aleatorio = [];
var anterior = document.querySelector("main");
var main = document.querySelector("main");
var cartaTras;
var cartaFrente;
var trancaMesa = true;
var contaJogadas = 0;
var contaAcertos = 0;
var recomeça;
var tempo = 0;
var relogio;

function nDeCartas() {     //função que pega o numero de cartas pelo prompt
    while(n%2 != 0 || n < 4 || n > 14)
        n = parseInt(prompt("Digite a quantidade de cartas:"));   
    return n;   
}

function montarJogo() {      //função que seta as divs "containers" pra carta-frente e carta-tras
    var i = 0;
    if(n > 7)
        main.style.maxWidth = ("calc("+n/2+"*135px + 134px)");
    else
        main.style.width = ("96%");
    var novaDiv ;
    while(i < n) {
        novaDiv = (document.createElement("div"));
        novaDiv.setAttribute("onclick", "viraCarta(this)");
        novaDiv.classList.add("carta");
        i++;
        main.appendChild(novaDiv);
    }    
}

function DistribCartas() {
    var i=0;
    var novaDivTras;
    var novaDivFrente;
    while(i < n) {
        novaDivTras = document.createElement("div");
        novaDivTras.classList.add("verso");
        novaDivTras.innerHTML = "<img src='imagens/front.png' alt='papagaio'></img>";

        novaDivFrente = document.createElement("div");
        novaDivFrente.classList.add("verso");
        novaDivFrente.classList.add("carta-frente");
        novaDivFrente.innerHTML = `<img src='imagens/${aleatorio[i]}' alt='papagaio'></img>`;

        
        var viraCarta = document.querySelector("main > div:nth-child("+(i+1)+")");
        viraCarta.appendChild(novaDivTras);
        viraCarta.appendChild(novaDivFrente);
        i++;
    }
}

function viraCarta(elemento) { //funçao que vira a carta clicada uma vez que a mesa n esteja "trancada"
    if(trancaMesa) {
        cartaTras = elemento.children[0];
        cartaFrente = elemento.children[1];
        if(verificaCarta(elemento)) {
            cartaTras.classList.toggle("carta-tras-virada");
            cartaFrente.classList.toggle("carta-frente-virada");
        }
    }        
}

function embaralha() {  //função pra embaralhar os arrays
    return Math.random() - 0.5;
}

function papagaioAleatorio() {  //função que seta uma array de papagaios aleatorios pra serem inseridos 
    var i = 0;                  //na DistribCartasFrente()
    var parrotArray = ['bobrossparrot.gif','explodyparrot.gif','fiestaparrot.gif','metalparrot.gif','revertitparrot.gif','tripletsparrot.gif','unicornparrot.gif'];
    
    var embaralhado = [];
    var tamanho = [];
    
    embaralhado = parrotArray.sort(embaralha)
    
    while(i < n/2) {
        tamanho[i] = embaralhado[i];
        i++;
    }  
    aleatorio = concatenarArrays(tamanho,tamanho);
    aleatorio = aleatorio.sort(embaralha);
}

function concatenarArrays(lista1, lista2) { //função que junta 2 arrays, usada pra duplicar os 
    var i = 0;                              //papagaios na papagaioAleatorio()
    while (i < n/2) {
        lista1.push(lista2[i]);
        i++;
    }
    return lista1;
}

function verificaCarta(elemento) { //função que verifica se a carta ja está virada, se virou um par
    cartaTras = elemento.children[0]; //certo e se virou um par errado
    cartaFrente = elemento.children[1];
    if(cartaTras.classList.contains("carta-tras-virada")) {
        anterior = cartaFrente;
        return false;
    }
    else if (anterior.innerHTML !== main.innerHTML) {
        if(anterior.innerHTML === cartaFrente.innerHTML) {
            anterior.parentElement.removeAttribute("onclick");
            elemento.removeAttribute("onclick");
            anterior = document.querySelector("main");
            contaAcertos++;
            jogadas();
            return true;
        }
        else {
            cartaTras.classList.toggle("carta-tras-virada");
            cartaFrente.classList.toggle("carta-frente-virada");
            setTimeout(waitTurn, 1000);
            trancaMesa = false;
            return false;
        }
    }
    else {
        anterior = cartaFrente;
        jogadas();
        return true;
    }         
}

function waitTurn() { //função que espera 1 seg pra desvirar as cartas
    cartaTras.classList.toggle("carta-tras-virada");
    cartaFrente.classList.toggle("carta-frente-virada");
    var anteriorAtras = anterior.parentElement.children[0];
    anteriorAtras.classList.toggle("carta-tras-virada")
    anterior.classList.toggle("carta-frente-virada")
    anterior = document.querySelector("main");
    trancaMesa = true;
    jogadas();
}

function jogadas() {    //funçao que manda um alerta mostrando quantas jogadas foram
    contaJogadas++;
    if(contaAcertos === n/2)
    {
        setTimeout(alerta,1000);
    }
}

function alerta() { //alerta pra entrar no setTimeout da função jogadas()
    alert("Você ganhou em "+contaJogadas/2+" jogadas!\nEm "+tempo+" segundos!");
    clearInterval(relogio);
    recomeça = confirm("Você quer jogar novamente?");
    if (recomeça) {
        reiniciarJogo();
        executaJogo();
    }
}

function executaJogo() { //chama as funções principais
    nDeCartas(); //pega o numero de cartas
    relógio(); //relógio que imprime o tempo na tela
    montarJogo(); //seta a mesa pra inserir as cartas
    papagaioAleatorio(); // cria a string com os papagaios de forma randômica
    DistribCartas(); // insere as cartas na <main>   
}

function reiniciarJogo() { //reseta o html e as variáveis globais
    main.innerHTML = "";
    contaJogadas = 0;
    contaAcertos = 0;
    n = 0;
    tempo = 0;
    anterior = document.querySelector("main");
}

function relógio() {
    relogio = setInterval(timer,1000);
}

function timer() {
    tempo++;
    var divTempo = document.querySelector("time");
    divTempo.innerText = "Tempo percorrido: "+tempo+"s";
}

executaJogo();

