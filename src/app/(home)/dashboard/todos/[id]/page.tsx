import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Item } from '@/components/item';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Todo } from '../../page';
import type { Metadata } from 'next';
import { NewTodoItem } from '@/components/new-todo-item';
import { RemoveTodo } from '@/components/remove-to-do';

type Props = {
  params: {
    id: string;
  };
};

export type TodoItem = {
  id: string;
  name: string;
  description?: string;
  check: boolean;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const todo = await getTodo(id);

  return {
    title: `Todo tasks - ${todo.title}`,
  };
}

async function getTodoItems(todoId: string) {
  const session = await getServerSession(authOptions);
  const headers = {
    Authorization: `Bearer ${session?.accessToken}`,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}/items`,
    {
      headers,
      next: {
        tags: ['items'],
      },
    },
  );

  if (!res.ok) {
    notFound();
  }

  const items = (await res.json()).todo_items as TodoItem[];

  return items;
}

async function getTodo(id: string) {
  const session = await getServerSession(authOptions);
  const headers = {
    Authorization: `Bearer ${session?.accessToken}`,
  };

  const resTodo = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
    {
      headers,
    },
  );

  if (!resTodo.ok) {
    notFound();
  }

  const todo = (await resTodo.json()).todo as Todo;

  return todo;
}

export default async function Todo({ params: { id } }: Props) {
  const todo = await getTodo(id);
  const todoItems = await getTodoItems(id);

  return (
    <main className="h-full p-6 w-full">
      <header className="max-w-xl mx-auto flex flex-col gap-3 items-center text-center">
        <h1 className="text-4xl font-bold">{todo.title}</h1>
        <span className="text-zinc-400 text-sm">{todo.description}</span>
        <RemoveTodo id={id} />

        <NewTodoItem />
      </header>

      <div className="max-w-lg mx-auto flex flex-col gap-4 justify-center items-center mt-6">
        {todoItems.length <= 0 ? (
          <div>
            <h1 className="text-zinc-400 font-bold">List not founded</h1>
          </div>
        ) : (
          todoItems.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              isChecked={item.check}
              name={item.name}
              description={item.description}
            />
          ))
        )}
      </div>
    </main>
  );
}
