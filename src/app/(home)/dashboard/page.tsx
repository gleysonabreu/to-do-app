import { TodoItem } from '@/components/to-do-item';
import { CircleOff } from 'lucide-react';
import { api } from '@/config/api';
import { Todo } from '@/types/todo';

async function getTodos(): Promise<Todo[]> {
  const res = await api('/todos', {
    method: 'GET',
    next: {
      tags: ['todos'],
    },
  });

  if (!res.ok) {
    throw new Error('failed to fetch data');
  }

  const responseBody = await res.json();
  return responseBody.todos;
}

export default async function Dashboard() {
  const todos = await getTodos();

  return (
    <main className="flex flex-col flex-1 p-6 w-full">
      {todos.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center flex-col gap-2 max-w-md w-full p-10 border border-dashed rounded-lg border-border">
            <CircleOff size={30} />
            <h1 className="font-bold text-lg">No to-dos</h1>
            <span className="text-muted-foreground text-sm">
              Get started by creating a new to-do.
            </span>
          </div>
        </div>
      ) : (
        <div className="grid justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {todos.reverse().map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              amount={todo.amount}
              completed={todo.completed}
              url={`/dashboard/todos/${todo.id}`}
            />
          ))}
        </div>
      )}
    </main>
  );
}
