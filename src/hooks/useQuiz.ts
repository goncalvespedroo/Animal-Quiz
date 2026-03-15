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
    // AQUI ESTÁ A MUDANÇA:
    const [questions, setQuestions] = useState<Question[]>([]); 
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("https://opentdb.com/api.php?amount=10&category=27&type=boolean");
                
                if (!response.ok) throw new Error("Erro ao buscar dados");
                
                const data = await response.json();
                
                // Agora o TS sabe que data.results deve encaixar em Question[]
                setQuestions(data.results);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    return { questions, loading, error };
}