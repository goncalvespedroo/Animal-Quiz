import { useState, useEffect } from 'react';
interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  type: string;
  difficulty: string;
}
export function useQuiz() {
    const [questions, setQuestions] = useState<Question[]>([]); 
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if (questions.length > 0) return;

        const fetchQuestions = async () => {
            try {
                const response = await fetch("https://opentdb.com/api.php?amount=10&category=27&type=boolean");
                
                if (!response.ok) throw new Error("Erro ao buscar dados");
                
                const data = await response.json();
                
                setQuestions(data.results);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [questions]);

    return { questions, loading, error };
}