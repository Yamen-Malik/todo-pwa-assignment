import { useState } from "react";
import { type Action, type State } from "../store";
import { TodoItem } from "./TodoItem";

export function TodoList({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
    const [newTodo, setNewTodo] = useState("");
    const activeGroup = state.groups.find(g => g.id === state.activeGroupId);

    const addTodo = () => {
        if (!newTodo.trim()) return;
        dispatch({ type: "ADD_TODO", groupId: state.activeGroupId, text: newTodo });
        setNewTodo("");
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">{activeGroup?.name}</h2>
            <div className="flex mb-4 gap-2">
                <input
                    className="flex-1 border rounded p-2"
                    placeholder="Add a todo..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTodo()}
                />
                <button
                    onClick={addTodo}
                    className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700"
                >
                    Add
                </button>
            </div>
            <ul className="space-y-2">
                {[...(activeGroup?.todos || [])].sort((a, b) => a.done === b.done ? a.id.localeCompare(b.id) : b.done ? -1 : 1).map((todo) => (
                    <TodoItem key={todo.id} todo={todo} state={state} dispatch={dispatch} />
                ))}
            </ul>
        </div>
    );
}