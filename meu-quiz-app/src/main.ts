let indicePerguntaAtual = 0;
let pontuacao = 0;
let listaDePerguntas: QuizQuestions[] = []; 

interface QuizQuestions {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers:string[];
}

interface ApiResponse {
  results: QuizQuestions[];
}

async function fetchQuestions(){

  const url = 'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=boolean';
  const response = await fetch(url);
  const data: ApiResponse =  await response.json();

  listaDePerguntas = data.results;
  renderizarQuiz()
}

function renderizarQuiz() {
  const elementoApp = document.querySelector<HTMLDivElement>('#app');
  if (!elementoApp) return;

  if (indicePerguntaAtual >= listaDePerguntas.length) {
    elementoApp.innerHTML = `<h1>Fim de jogo! Você fez ${pontuacao} pontos em um maximo de ${listaDePerguntas.length}.</h1>`;
    return;
  }

  const perguntaAtual = listaDePerguntas[indicePerguntaAtual];

  elementoApp.innerHTML = `
      <div class="quiz-container">
        <p>Pontos: ${pontuacao} | Pergunta: ${indicePerguntaAtual + 1}/10</p>
        <h2 id="question">${perguntaAtual.question}</h2>
        <div class="options">
          <button class="btn-choice" value='True'>Verdadeiro</button>
          <button class="btn-choice" value='False'>Falso</button>
        </div>
      </div>
      `;
  setupListeners(perguntaAtual.correct_answer);
}

function setupListeners(correct_answer: string) {
  const buttons = document.querySelectorAll('.btn-choice');

  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      const escolhaDoUsuario = target.value;

      console.log("Você escolheu:", escolhaDoUsuario);


      if(target.value === correct_answer) {
        alert("Acertou!");
        pontuacao++;
      } else {
        alert("Errou...")
      }
      indicePerguntaAtual++;
      console.log(indicePerguntaAtual);
      renderizarQuiz();
    })
  })
}

fetchQuestions();
