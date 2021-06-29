interface Question {
  id: string;
  answer: string;
  text: string;
  options: string;
}

interface Quiz {
  id: string;
  name: string;
  score: number;
  questions: Question[];
}

export type { Question };
export default Quiz;
