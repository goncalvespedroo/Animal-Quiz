import { useState } from "react";
import { useQuiz } from "../hooks/useQuiz";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { LoaderSpinner } from "../components/Loading";
import { ResultCard } from "../components/ResultCard";
import { determineButtonVariant } from "../utils/quizHelpers";
import { decodeHTML } from "../utils/decode";

export default function Quiz() {
  const { questions, loading, error } = useQuiz();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isShowingAnswer, setIsShowingAnswer] = useState(false);

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
    setIsShowingAnswer(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <LoaderSpinner size={50} />
      </div>
    );

  if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (userAnswer: string) => {
    if (isShowingAnswer) return;

    setSelectedAnswer(userAnswer);
    setIsShowingAnswer(true);

    if (userAnswer === currentQuestion.correct_answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setIsShowingAnswer(false);
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      
      {isFinished && (
        <ResultCard 
          score={score} 
          total={questions.length} 
          onRestart={handleRestart} 
        />
      )}

      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl flex flex-col gap-6 relative">
        
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs">
            Question {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-slate-500 text-xs font-mono">Score: {score}</span>
        </div>

        {currentQuestion && (
          <Title
            text={decodeHTML(currentQuestion.question)}
            variant="secondary"
          />
        )}

        <div className="flex flex-col gap-3">
          <Button
            variant={determineButtonVariant(
              "True",
              currentQuestion.correct_answer,
              selectedAnswer,
              isShowingAnswer
            )}
            onClick={() => handleAnswer("True")}
          >
            True
          </Button>

          <Button
            variant={determineButtonVariant(
              "False",
              currentQuestion.correct_answer,
              selectedAnswer,
              isShowingAnswer
            )}
            onClick={() => handleAnswer("False")}
          >
            False
          </Button>
        </div>
      </div>
    </div>
  );
}