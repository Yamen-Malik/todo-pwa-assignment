import { useEffect, useRef } from "react";
import { useTodoStore } from "./store";
import { requestNotificationPermission } from "./utils";
import { SideBar } from "./components/SideBar";
import { TodoList } from "./components/TodoList";

function App() {
  const { state, dispatch } = useTodoStore();

  const initialRender = useRef(true);

  const handleFirstClick = () => {
    if (!initialRender.current) return;

    requestNotificationPermission();
    initialRender.current = false;
  }

  useEffect(() => {
    const now = new Date().getTime();

    const timers: ReturnType<typeof setTimeout>[] = [];

    state.groups.forEach((group) =>
      group.todos.forEach((todo) => {
        if (todo.reminder && !todo.done) {
          const time = new Date(todo.reminder).getTime();
          const delay = time - now;
          if (delay > 0 && delay < 24 * 60 * 60 * 1000) {
            const timeout = setTimeout(() => {
              new Notification(`Reminder: ${todo.text}`);
            }, delay);
            timers.push(timeout);
          }
        }
      })
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [state]);

  return (
    <div className="min-h-screen min-w-screen flex bg-gray-50 text-gray-800 overflow-hidden" onClick={handleFirstClick}>
      {/* Sidebar */}
      <SideBar state={state} dispatch={dispatch} />


      {/* Main content */}
      <main className="flex-1 p-4 pb-0 w-full h-screen flex flex-col justify-between overflow-y-scroll">
        <TodoList state={state} dispatch={dispatch} />

        <footer className="text-center text-sm text-gray-500 py-5">
          Made by&nbsp;
          <a className="hover:underline font-bold" href="https://github.com/yamen-malik">Yamen Ghozlan</a>
        </footer>
      </main>
    </div>
  );
}

export default App;
