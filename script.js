var n=0;
var ale = [];
var anterior = document.querySelector("main");
var main = document.querySelector("main");
var cartaTras;
var cartaFrente;
var trancaMesa = true;
var contaJogadas = 0;
var contaAcertos = 0;
var recomeça = "sim";
function nDeCartas()        //função que pega o numero de cartas pelo prompt
{
    while(n%2!=0 || n<4 || n>14)
        n = parseInt(prompt("Digite a quantidade de cartas:"));   
    return n;   
}
function montarJogo()       //função que seta as divs "containers" pra carta-frente e carta-tras
{
    var i = 0;
    var main = document.querySelector("main");
    if(n>7)
        main.style.maxWidth = ("calc("+n/2+"*135px + 134px)");
    else
        main.style.width = ("96%");
    var novaDiv ;
    while(i<n)
    {
        novaDiv = (document.createElement("div"));
        main.appendChild(novaDiv);
        var div = document.querySelector("div:nth-child("+(i+1)+")");
        div.setAttribute("onclick","viraCarta(this)");
        div.classList.add("carta");
        i++; 
    }    
}
function DistribCartasTras()    //função que insere as divs com classe carta-tras e verso
{
    var i=0;
    var novaDiv;
    while(i<n)
    {
        novaDiv = document.createElement("div");
        var viraCarta = document.querySelector("main > div:nth-child("+(i+1)+")");
        viraCarta.appendChild(novaDiv);
        var div = document.querySelector(" main > div:nth-child("+(i+1)+") div:first-child ");
        div.classList.add("verso");
        div.classList.add("carta-tras");
        div.innerHTML = "<img src='imagens/front.png' alt='papagaio'></img>";
        i++;
    }
}
function DistribCartasFrente() //função que insere as divs com classe carta-frente e verso
{
    var i=0;
    var novaDiv;
    while(i<n)
    {
        novaDiv = document.createElement("div");
        var viraCarta = document.querySelector("main > div:nth-child("+(i+1)+")");
        viraCarta.appendChild(novaDiv)
        var div = document.querySelector(" main > div:nth-child("+(i+1)+") div:last-child ");
        div.classList.add("verso");
        div.classList.add("carta-frente");
        div.innerHTML = `<img src='imagens/${ale[i]}' alt='papagaio'></img>`;
        i++;
    }
}
function viraCarta(elemento)    //funçao que vira a carta clicada uma vez que a mesa n esteja "trancada"
{
    if(trancaMesa)
    {
        cartaTras = elemento.children[0];
        cartaFrente = elemento.children[1];
        if(verificaCarta(elemento))
        {
            cartaTras.classList.toggle("carta-tras-virada");
            cartaFrente.classList.toggle("carta-frente-virada");
        }
    }        
}
function embaralha() //função pra embaralhar os arrays
{
    return Math.random() - 0.5;
}
function papagaioAleatorio() //função que seta uma array de papagaios aleatorios pra serem inseridos na DistribCartasFrente()
{
    var i = 0;
    var String = ['bobrossparrot.gif','explodyparrot.gif','fiestaparrot.gif','metalparrot.gif','revertitparrot.gif','tripletsparrot.gif','unicornparrot.gif'];
    
    var embaralhado = [];
    var tamanho = [];
    
    embaralhado = String.sort(embaralha)
    
    while(i<n/2)
    {
        tamanho[i] = embaralhado[i];
        i++;
    }  
    ale = concatenarArrays(tamanho,tamanho);
    ale = ale.sort(embaralha);
}
function concatenarArrays(lista1, lista2) { //função que junta 2 arrays, usada pra duplicar os papagaios na papagaioAleatorio()
    var i = 0;
    while (i<n/2)
    {
      lista1.push(lista2[i]);
      i++;
    }
    return lista1;
  }
function verificaCarta(elemento)    //função que verifica se a carta ja está virada, se virou um par certo e se virou um par errado
{
    cartaTras = elemento.children[0];
    cartaFrente = elemento.children[1];
    if(cartaTras.classList.contains("carta-tras-virada"))
    {
        anterior = cartaFrente;
        return false;
    }
    else if (anterior.innerHTML!==main.innerHTML)
    {
        if(anterior.innerHTML===cartaFrente.innerHTML)
        {
            anterior.parentElement.removeAttribute("onclick");
            elemento.removeAttribute("onclick");
            anterior = document.querySelector("main");
            contaAcertos++;
            jogadas();
            return true;
        }
        else
        {
            cartaTras.classList.toggle("carta-tras-virada");
            cartaFrente.classList.toggle("carta-frente-virada");
            setTimeout(esperar1seg, 1000);
            trancaMesa = false;
            return false;
        }
    }
    else
    {
        anterior = cartaFrente;
        jogadas();
        return true;
    }         
}
function esperar1seg() //função que espera 1 seg pra desvirar as cartas 
{
    cartaTras.classList.toggle("carta-tras-virada");
    cartaFrente.classList.toggle("carta-frente-virada");
    var anteriorAtras = anterior.parentElement.children[0];
    anteriorAtras.classList.toggle("carta-tras-virada")
    anterior.classList.toggle("carta-frente-virada")
    anterior = document.querySelector("main");
    trancaMesa = true;
    jogadas();
}
function jogadas() //funçao que manda um alerta mostrando quantas jogadas foram
{
    contaJogadas++;
    if(contaAcertos===n/2)
    {
        setTimeout(alerta,1000);
    }
}
function alerta()   //alerta pra entrar no setTimeout da função jogadas()
{
    alert("Você ganhou em "+contaJogadas/2+" jogadas!");
    recomeça = prompt("Você quer jogar novamente?");
    recomeçar();
}
function executaJogo()
{
    nDeCartas(); //pega o numero de cartas
    montarJogo(); //seta a mesa pra inserir as cartas
    DistribCartasTras(); // insere as cartas de tras com papagaio.jpg
    papagaioAleatorio(); // cria a string com os papagaios de forma randômica
    DistribCartasFrente(); //insere a parte da frente da carta com os papagaios.gif
}
function reiniciarJogo()
{
    main.innerHTML = "";
    contaJogadas = 0;
    contaAcertos = 0;
    anterior = document.querySelector("main");
}
function recomeçar()
{
    if(recomeça==="sim"||recomeça==="s"||recomeça==="Sim"||recomeça==="S")
    {
        reiniciarJogo();
        executaJogo();
    }        
}
executaJogo();

