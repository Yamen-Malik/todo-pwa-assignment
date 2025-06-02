import React from "react";
import { type Group, type Todo } from "./types";
import { initialGroups } from "./data";

export type State = {
  groups: Group[];
  activeGroupId: string;
};

export type Action =
  | { type: "ADD_GROUP"; name: string }
  | { type: "DELETE_GROUP"; id: string }
  | { type: "SET_ACTIVE_GROUP"; id: string }
  | { type: "ADD_TODO"; groupId: string; text: string }
  | { type: "EDIT_TODO"; groupId: string; todo: Todo }
  | { type: "DELETE_TODO"; groupId: string; todoId: string }
  | { type: "TOGGLE_DONE"; groupId: string; todoId: string };

const STORAGE_KEY = "todoAppState";

const loadInitialState = (): State => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return {
    groups: initialGroups,
    activeGroupId: initialGroups[0].id,
  };
};

export const reducer = (state: State, action: Action): State => {
  let groups = [...state.groups];

  switch (action.type) {
    case "ADD_GROUP":
      groups.push({
        id: crypto.randomUUID(),
        name: action.name,
        todos: [],
      });
      break;

    case "DELETE_GROUP":
      groups = groups.filter((g) => g.id !== action.id);
      break;

    case "SET_ACTIVE_GROUP":
      return { ...state, activeGroupId: action.id };

    case "ADD_TODO":
      groups = groups.map((g) =>
        g.id === action.groupId
          ? {
              ...g,
              todos: [
                ...g.todos,
                {
                  id: crypto.randomUUID(),
                  text: action.text,
                  done: false,
                },
              ],
            }
          : g
      );
      break;

    case "EDIT_TODO":
      groups = groups.map((g) =>
        g.id === action.groupId
          ? {
              ...g,
              todos: g.todos.map((t) =>
                t.id === action.todo.id ? action.todo : t
              ),
            }
          : g
      );
      break;

    case "DELETE_TODO":
      groups = groups.map((g) =>
        g.id === action.groupId
          ? { ...g, todos: g.todos.filter((t) => t.id !== action.todoId) }
          : g
      );
      break;

    case "TOGGLE_DONE":
      groups = groups.map((g) =>
        g.id === action.groupId
          ? {
              ...g,
              todos: g.todos.map((t) =>
                t.id === action.todoId ? { ...t, done: !t.done } : t
              ),
            }
          : g
      );
      break;

    default:
      return state;
  }

  const newState = { ...state, groups };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  return newState;
};

export const useTodoStore = () => {
  const [state, dispatch] = React.useReducer(reducer, loadInitialState());
  return { state, dispatch };
};
