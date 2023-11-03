import { TodoItem } from '@/components/to-do-item';
import { api } from '@/config/api';
import { Todo } from '@/types/todo';
import { NoTodos } from './todos/components/no-to-dos';
import { getSession } from '@/lib/get-session';

async function getTodos(): Promise<Todo[]> {
  const session = await getSession();

  const res = await api(`/users/${session?.user.id}/todos`, {
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
        <NoTodos />
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
