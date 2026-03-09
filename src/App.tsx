import { useState, useEffect } from 'react';

// Sua interface que já está no GitHub
interface QuizQuestion {
  question: string;
  correct_answer: string;
}

export function App() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  // O fetch que você já faz, agora dentro de um useEffect
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=27&type=boolean")
      .then(res => res.json())
      .then(data => setQuestions(data.results));
  }, []);

  const handleAnswer = (answer: string) => {
    setAnswered(true);
    if (answer === questions[index].correct_answer) {
      setScore(prev => prev + 1);
    }
  };

  if (questions.length === 0) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar - Dados de QA centralizados */}
        <div className="md:w-1/3 bg-slate-900 p-10 text-white flex flex-col justify-between">
          <h3 className="font-bold text-xl uppercase italic">Animals Quiz</h3>
          <div className="space-y-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="text-xs text-slate-500 uppercase font-bold">Questão</p>
              <p className="text-2xl font-black">{index + 1} / 10</p>
            </div>
            <div className="bg-indigo-600/20 p-4 rounded-xl border border-indigo-500/30">
              <p className="text-xs text-indigo-400 uppercase font-bold">Score</p>
              <p className="text-2xl font-black">{score * 100}</p>
            </div>
          </div>
        </div>

        {/* Área da Pergunta */}
        <div className="md:w-2/3 p-10 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-10" 
              dangerouslySetInnerHTML={{ __html: questions[index].question }} />

          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <button 
              disabled={answered}
              onClick={() => handleAnswer("True")}
              className={`py-3 rounded-xl font-bold transition-all ${answered ? 'bg-slate-200' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
            >
              Verdadeiro
            </button>
            <button 
              disabled={answered}
              onClick={() => handleAnswer("False")}
              className={`py-3 rounded-xl font-bold transition-all ${answered ? 'bg-slate-200' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
            >
              Falso
            </button>
          </div>

          {answered && (
            <button 
              onClick={() => { setIndex(prev => prev + 1); setAnswered(false); }}
              className="mt-6 w-full max-w-xs bg-slate-800 text-white py-3 rounded-xl font-bold animate-pulse"
            >
              PRÓXIMA PERGUNTA →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}