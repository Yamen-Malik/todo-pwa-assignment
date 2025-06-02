import { useState } from "react";
import type { Action, State } from "../store";
import type { Group } from "../types";

export function SideBar({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
    const [newGroup, setNewGroup] = useState("");
    const [hidden, setHidden] = useState(true);

    const addGroup = () => {
        if (!newGroup.trim()) return;
        dispatch({ type: "ADD_GROUP", name: newGroup });
        setNewGroup("");
    };

    const handleDeleteGroup = (group: Group) => {
        if (confirm(`Delete group "${group.name}"?`)) {
            dispatch({ type: "DELETE_GROUP", id: group.id });
        }

    }
    return (
        <div className="relative">
        <aside className={`md:block w-64 bg-indigo-600 text-white h-full inset-y-0 left-0 z-10 transition-all duration-300 overflow-hidden ${hidden && "w-0! md:w-64!"}`}>
            <div className={`p-4 w-64 transform transition-all duration-300 ${hidden && "-translate-x-[100%] md:translate-x-0"}`}>
                <h1 className="text-2xl font-bold mb-4">Todo Groups</h1>
                <ul>
                    {state.groups.map((group) => (
                        <div key={group.id} className="flex items-center justify-between">
                            <button
                                onClick={() => {dispatch({ type: "SET_ACTIVE_GROUP", id: group.id }); setHidden(true);}}
                                className={`w-full text-left px-2 py-1 rounded hover:bg-indigo-800/30 hover:text-indigo-100
                                    ${state.activeGroupId === group.id ? "bg-indigo-500 text-white" : "text-indigo-800"}`}
                            >
                                {group.name}
                            </button>

                            {/* Delete group */}
                            <button
                                onClick={() => handleDeleteGroup(group)}
                                className="text-red-400 hover:text-red-600 text-xs ml-1"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </ul>
                <div className="mt-4">
                    <input
                        className="w-full p-2 rounded bg-indigo-500 text-white placeholder-white/70"
                        placeholder="New group name"
                        value={newGroup}
                        onChange={(e) => setNewGroup(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addGroup()}
                    />
                </div>
            </div>
        </aside>
        <button className={`sm:hidden absolute top-1/2 transform -translate-y-1/2 translate-x-[60%] right-0 z-8 w-7 h-7 bg-indigo-600 rounded-full text-white`}
            onClick={() => setHidden((prev) => !prev)}
        >
            <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`scale-90 ${!hidden && "rotate-180"}`}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
            </svg>
        </button>
        </div>
    );
}