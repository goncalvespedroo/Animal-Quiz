import { Title } from "./Title";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

interface ResultCardProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export function ResultCard({ score, total, onRestart }: ResultCardProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-full bg-slate-900 border border-emerald-500/30 p-10 rounded-3xl shadow-2xl text-center flex flex-col gap-6">
        <span className="text-4xl">🎉</span>
        <Title text="Quiz Finalizado!" variant="primary" />
        
        <div className="py-4">
          <p className="text-slate-400 text-lg">Você acertou</p>
          <p className="text-5xl font-black text-emerald-500 my-2">
            {score} <span className="text-2xl text-slate-600">/ {total}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="start" onClick={onRestart}>
            Try Again
          </Button>
          
        <Button variant="start" onClick={() => navigate("/")}>
            Home
        </Button>
        </div>
      </div>
    </div>
  );
}