interface QuizQuestions {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers:string[];
}

interface ApiResponse {
  results: QuizQuestions[];
}

function setupListeners() {
  const buttons = document.querySelectorAll('.btn-choice');

  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      const escolhaDoUsuario = target.value;

      console.log("Você escolheu:", escolhaDoUsuario);
    })
  })
}

async function fetchQuestions(){

  const url = 'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=boolean';
  const response = await fetch(url);
  const data: ApiResponse =  await response.json();

  const elementoApp = document.querySelector<HTMLDivElement>('#app');
  
  if (elementoApp) {
    elementoApp.innerHTML = `
        <div class="quiz-container">
          <h2 id="question">${data.results[0].question}</h2>
          
          <div class="options">
            <button class="btn-choice" value="True">Verdadeiro</button>
            <button class="btn-choice" value="False">Falso</button>
          </div>
        </div>
      `;
    setupListeners();
  }

  console.log("Dados recebidos:", data);
}

fetchQuestions();
