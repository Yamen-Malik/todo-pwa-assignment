export type Todo = {
  id: string;
  text: string;
  done: boolean;
  reminder?: string; // ISO timestamp
};

export type Group = {
  id: string;
  name: string;
  todos: Todo[];
};