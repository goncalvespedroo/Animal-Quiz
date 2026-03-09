import "./style.css";

let currentIndexQuestion = 0;
let score = 0;
let questionList: QuizQuestions[] = [];

interface QuizQuestions {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface ApiResponse {
  results: QuizQuestions[];
}

async function fetchQuestions() {
  const url =
    "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=boolean";
  const response = await fetch(url);
  const data: ApiResponse = await response.json();

  questionList = data.results;
  renderizarQuiz();
}

function renderizarQuiz() {
  const appElement_ = document.querySelector<HTMLDivElement>("#app");
  if (!appElement_) return;

  if (currentIndexQuestion >= questionList.length) {
    const appElement_ = document.querySelector("#app");
    if (appElement_) {
      appElement_.innerHTML = `
  <div class="text-center p-10 bg-slate-800 rounded-xl">
    <h1 class="text-3xl font-bold text-white">Quiz Ended! 🏆</h1>
    <span class="text-3xl font-bold text-white">Total Score: ${score*100}</span>
  </div>
`;
    }
    return;
  }

  const userCurrentAnswer = questionList[currentIndexQuestion];

  appElement_.innerHTML = `
  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans ga-[1rem]">
    <div class="max-w-4xl w-full p-[2rem] bg-white rounded-[0.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20">
      
      <div class="md:w-1/3 bg-slate-900 p-10 flex flex-col items-center justify-center text-center">

        <h3 class="text-white font-bold text-xl uppercase tracking-tighter">Animals Quiz</h3>
          <div class="flex justify-between  gap-[1rem] mb-8">
            <span class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
              Questão ${currentIndexQuestion + 1} / 10
            </span>
           <span class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">Score: ${score * 100}</span>
          </div>
      </div>

      <div class="md:w-2/3 grid-col-2 p-10 flex flex-col">
       

        <h2 class="text-2xl text-center font-extrabold text-slate-800 mb-10 leading-snug min-h-[80px]">
          ${userCurrentAnswer.question}
        </h2>

        <div class="grid grid-cols-2 gap-3 w-full max-w-xs mb-6">
          <button 
            value="True"
            class="btn-choice group bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4
            border-b-4 border-blue-800 rounded-xl text-sm
            transition-all duration-150
            active:border-b-0 active:translate-y-1">
            True
            <span class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>

          <button 
            value="False"
            class="btn-choice group bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4
            border-b-4 border-blue-800 rounded-xl text-sm
            transition-all duration-150
            active:border-b-0 active:translate-y-1">
            False
            <span class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>
        </div>

        <button class="btn-next hidden w-full max-w-xs bg-slate-800 text-white py-2 rounded-xl text-sm shadow-lg font-bold">
          Next
        </button>
      </div>
    </div>
  </div>
`;
  setupListeners(userCurrentAnswer.correct_answer);
}

function setupListeners(correct_answer: string) {
  const buttons = document.querySelectorAll<HTMLButtonElement>(".btn-choice");
  const nextButton = document.querySelector<HTMLButtonElement>(".btn-next");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => (btn.disabled = true));

      nextButton?.classList.remove("hidden");

      button.classList.remove(
        "bg-blue-600",
        "border-blue-800",
        "hover:bg-blue-500",
      );

      if (button.value === correct_answer) {
        button.classList.add("bg-green-600", "border-green-800");
        score++;
      } else {
        button.classList.add("bg-red-600", "border-red-800");
      }
    });
  });

  nextButton?.addEventListener(
    "click",
    () => {
      currentIndexQuestion++;
      renderizarQuiz();
    },
    { once: true },
  );
}

fetchQuestions();
