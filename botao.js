const botaoMais = document.querySelector(".mais");
const botaoMenos = document.querySelector(".menos");
const velocidadeElement = document.querySelector(".velocidadeElement");

//pegando o valor do intervalo do armazenamento local
let valorIntervalo = localStorage.getItem("valorIntervalo") || 25;
velocidadeElement.innerText = `Velocity: ${valorIntervalo}`;

let intervalo = localStorage.getItem("intervalo") || 125;

//botão pra aumentar e diminuir a velocidade
botaoMais.addEventListener("click", () => {
    if (valorIntervalo >= 1 && valorIntervalo <= 49)
    {
        intervalo = Number(intervalo) - 5; //como o localStorage armazena em string tem que transformar pra número :(
        valorIntervalo = Number(valorIntervalo) + 1;
        localStorage.setItem("intervalo", intervalo); //atualizando o localStorage
        localStorage.setItem("valorIntervalo", valorIntervalo);
        velocidadeElement.innerText = `Velocidade: ${valorIntervalo}`;
        location.reload();
    }
});

botaoMenos.addEventListener("click", () => {
    if (valorIntervalo >= 2 && valorIntervalo <= 50)
    {
        intervalo = Number(intervalo) + 5; //como o localStorage armazena em string tem que transformar pra número :(
        valorIntervalo = Number(valorIntervalo) - 1;
        localStorage.setItem("intervalo", intervalo);
        localStorage.setItem("valorIntervalo", valorIntervalo);
        velocidadeElement.innerText = `Velocity: ${valorIntervalo}`;
        location.reload();
    }
});