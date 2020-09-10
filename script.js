var n=0;

function nDeCartas()
{
    while(n%2!=0 || n<4 || n>14)
        n = parseInt(prompt("Digite a quantidade de cartas:"));      
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
function CartasRandom()
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
        i++;
    }
}
function viraCarta(elemento)
{
    elemento.classList.add("carta-tras-virada");
    elemento.classList.add("carta-frente-virada");
}
function embaralha()
{
    return Math.random() - 0.5;
}
nDeCartas();
montarJogo();
DistribCartasTras();
CartasRandom();