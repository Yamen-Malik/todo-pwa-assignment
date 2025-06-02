export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export type Group = {
  id: string;
  name: string;
  todos: Todo[];
};