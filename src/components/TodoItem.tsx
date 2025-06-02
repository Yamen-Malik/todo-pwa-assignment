import { type Action, type State } from "../store";
import type { Todo } from "../types";

export function TodoItem({ todo, state, dispatch }: { todo: Todo; state: State; dispatch: React.Dispatch<Action> }) {

    const toggleDone = () => {
        dispatch({
            type: "TOGGLE_DONE",
            groupId: state.activeGroupId,
            todoId: todo.id,
        });
    }

    const handleEdit = () => {
        const newText = prompt("Edit todo text", todo.text);
        if (!newText) return;

        const reminder = prompt(
            "Set reminder (YYYY-MM-DD HH:MM), leave empty to skip:",
            todo.reminder ? new Date(todo.reminder).toISOString().slice(0, 16).replace("T", " ") : ""
        );

        let reminderISO = undefined;
        if (reminder) {
            const r = new Date(reminder);
            if (!isNaN(r.getTime())) {
                reminderISO = r.toISOString();
            }
        }

        dispatch({
            type: "EDIT_TODO",
            groupId: state.activeGroupId,
            todo: { ...todo, text: newText, reminder: reminderISO },
        });
    }

    const handleDelete = () => {
        dispatch({
            type: "DELETE_TODO",
            groupId: state.activeGroupId,
            todoId: todo.id,
        })
    }

    return (
        <li
            key={todo.id}
            className="p-3 bg-indigo-50 rounded-2xl shadow flex justify-between items-center select-none"
        >
            <span
                onClick={toggleDone}
                className={`cursor-pointer flex-1 ${todo.done && "line-through text-gray-400"}`}
            >
                {todo.text}
                {todo.reminder && (
                    <div className="text-xs text-indigo-500">
                        ⏰ {new Date(todo.reminder).toLocaleString("en-UK")}
                    </div>
                )}
            </span>

            <div className="ml-2 flex gap-3">
                {/* Edit */}
                <button
                    className="bg-blue-500/10 hover:bg-blue-500/20 py-1 px-3 rounded-lg text-blue-500 text-sm"
                    onClick={handleEdit}
                >
                    Edit
                </button>

                {/* Delete */}
                <button
                    className="bg-red-500/10 hover:bg-red-500/20 py-1 px-3 rounded-lg text-red-500 text-sm"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </li>

    );
}