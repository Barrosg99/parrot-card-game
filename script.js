var n=0;
var ale = [];
var anterior = document.querySelector("main");
var main = document.querySelector("main");
var cartaTras;
var cartaFrente;
var trancaMesa = true;
function nDeCartas()
{
    while(n%2!=0 || n<4 || n>14)
        n = parseInt(prompt("Digite a quantidade de cartas:"));   
    return n;   
}
function montarJogo()
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
function DistribCartasTras()
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
function DistribCartasFrente()
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
function viraCarta(elemento)
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
function embaralha()
{
    return Math.random() - 0.5;
}
function papagaioAleatorio()
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
function concatenarArrays(lista1, lista2) {
    var i = 0;
    while (i<n/2)
    {
      lista1.push(lista2[i]);
      i++;
    }
    return lista1;
  }
function verificaCarta(elemento)
{
    cartaTras = elemento.children[0];
    cartaFrente = elemento.children[1];
    if(cartaTras.classList.contains("carta-tras-virada"))
    {
        console.log("nao clica na msm carta animal")
        anterior = cartaFrente;
        return false;
    }
    else if (anterior.innerHTML!==main.innerHTML)
    {
        if(anterior.innerHTML===cartaFrente.innerHTML)
        {
            console.log("entao vc achou o par? brabo")
            anterior.parentElement.removeAttribute("onclick");
            elemento.removeAttribute("onclick");
            anterior = document.querySelector("main");
            return true;
        }
        else
        {
            cartaTras.classList.toggle("carta-tras-virada");
            cartaFrente.classList.toggle("carta-frente-virada");
            setTimeout(esperar1seg, 1000);
            trancaMesa = false;
            console.log("nao achou, lixo")
            return false;
        }
    }
    else
    {
        console.log("outros casos")
        anterior = cartaFrente;
        return true;
    } 
        
}
function esperar1seg()
{
    cartaTras.classList.toggle("carta-tras-virada");
    cartaFrente.classList.toggle("carta-frente-virada");
    var anteriorAtras = anterior.parentElement.children[0];
    anteriorAtras.classList.toggle("carta-tras-virada")
    anterior.classList.toggle("carta-frente-virada")
    anterior = document.querySelector("main");
    console.log("pera ae corno");
    trancaMesa = true;
}
nDeCartas();
montarJogo();
DistribCartasTras();
papagaioAleatorio();
DistribCartasFrente();
