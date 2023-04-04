export type User = {
  id?: number;
  username: string;
  email: string;
  photo_link: string | null;
  name: string;
  surname: string;
  password: string;
  coin: number;
};

export type Treasure = {
  id: number;
  name: string;
  locationId: number;
  gift: number;
  photoLink?: string | null;
  timeLimit?: number;
  hardness: Hardness;
  location: { id: number; region: Region };
};

export type Region = {
  id: number;
  name: string;
};

export type Hint = {
  id: number;
  content: string | null;
  cost: number;
  isowned: boolean;
};

export type Hardness = "easy" | "medium" | "hard" | "insane";

export type Author = {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatar_url: string | null;
};

export type Answer = {
  content: string;
  is_correct: boolean;
  question_id: number;
};

export type Question = {
  type: string;
  quiz_id: number;
  content: string;
  image: string;
  answer: Answer[];
};

export type QuizResponseData = {
  id: number;
  name: string;
  cover: string | null;
  category: string;
  end_date: string;
  is_visible: boolean;
  public_id: number;
  author_id: number;
  description: string;
  author: Author;
  questions: Question[];
};
