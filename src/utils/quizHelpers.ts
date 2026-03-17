export const determineButtonVariant = (
  buttonValue: string,
  correctAnswer: string,
  selectedAnswer: string | null,
  isShowingAnswer: boolean
) => {
  if (!isShowingAnswer) return "select";
  
  if (buttonValue === correctAnswer) return "correct";
  if (buttonValue === selectedAnswer) return "wrong";
  
  return "select";
};