import { TodoItem } from '@/components/to-do-item';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CircleOff } from 'lucide-react';

export type Todo = {
  id: string;
  title: string;
  description?: string;
  amount: number;
  completed: number;
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    next: {
      tags: ['todos'],
    },
  });

  const responseBody = await res.json();
  const todos = responseBody.todos as Todo[];

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
            />
          ))}
        </div>
      )}
    </main>
  );
}
