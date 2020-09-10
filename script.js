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
        main.style.maxWidth = ("calc("+n+"*135px + 134px)");
    var novaDiv = [] ;
    while(i<n)
    {
        novaDiv.push(document.createElement("div"));
        main.appendChild(novaDiv[i]);
        var div = document.querySelector("div:nth-child("+(i+1)+")");
        div.classList.add("carta-tras");
        div.innerHTML = "<img src='imagens/front.png' alt='papagaio'></img>"
        i++; 
    }    
}
nDeCartas();
montarJogo();