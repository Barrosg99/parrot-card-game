var n=0;
var ale = [];
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
    var cartaTras = elemento.children[0];
    var cartaFrente = elemento.children[1];
    cartaTras.classList.toggle("carta-tras-virada");
    cartaFrente.classList.toggle("carta-frente-virada");
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
    console.log(tamanho)        
    ale = concatenarArrays(tamanho,tamanho);
    console.log(ale);
    ale = ale.sort(embaralha);
    console.log(ale);
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
nDeCartas();
montarJogo();
DistribCartasTras();
papagaioAleatorio();
DistribCartasFrente();
