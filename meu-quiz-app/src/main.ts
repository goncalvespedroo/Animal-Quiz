import './style.css';

let currentIndexQuestion = 0;
let score = 0;
let questionList: QuizQuestions[] = []; 

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

  questionList = data.results;
  renderizarQuiz()
}

function renderizarQuiz() {
  const appElement_ = document.querySelector<HTMLDivElement>('#app');
  if (!appElement_) return;

  if (currentIndexQuestion >= questionList.length) {
    const appElement_ = document.querySelector('#app');
    if (appElement_) {
      appElement_.innerHTML = `
        <div class="text-center p-10 bg-slate-800 rounded-xl">
          <h1 class="text-3xl font-bold text-white">Quiz Ended! 🏆</h1>
          <p class="text-xl text-slate-300 mt-4">Your Final Score: ${score}</p>
          <button onclick="location.reload()" class="mt-6 bg-blue-500 px-6 py-2 rounded-lg text-white">Recomeçar</button>
        </div>
      `;
    }
    return;
  }

  const userCurrentAnswer = questionList[currentIndexQuestion];

  appElement_.innerHTML = `
      <div class="quiz-container">
        <p>Score: ${score} | Question: ${currentIndexQuestion + 1}/10</p>
        <h2 id="question">${userCurrentAnswer.question}</h2>
        <div class="options flex flex-col gap-4 mt-6">
          <button class="btn-choice bg-slate-100 p-3 rounded" value='True'>True</button>
          <button class="btn-choice bg-slate-100 p-3 rounded" value='False'>False</button>
          <button class="btn-next hidden bg-blue-600 text-white p-3 rounded mt-4">Next</button
          <button calss="bg-red-500 p-10">TESTE</button>
        </div>
      </div>
      `;
  setupListeners(userCurrentAnswer.correct_answer);


}

function setupListeners(correct_answer: string) {
  const buttons = document.querySelectorAll<HTMLButtonElement>('.btn-choice');
  const nextButton = document.querySelector<HTMLButtonElement>('.btn-next');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.disabled = true);
      nextButton?.classList.remove('hidden');

      if (button.value === correct_answer) {
        button.classList.add('bg-green-600');
        score++;
      } else {
        button.classList.add('bg-red-600');
      }
    });
  });
  nextButton?.addEventListener('click', () => {
    currentIndexQuestion++;
    renderizarQuiz();
  }, {once: true});
}

fetchQuestions();
