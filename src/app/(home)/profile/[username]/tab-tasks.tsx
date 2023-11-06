import { TodoItem } from '@/components/to-do-item';
import { api } from '@/config/api';
import { Todo } from '@/types/todo';
import { NoTodos } from '../../dashboard/todos/components/no-to-dos';

type TabTasksProps = {
  userId: string;
  username: string;
};

async function getTodos(userId: string): Promise<Todo[]> {
  const response = await api(`/users/${userId}/todos`);

  const data = await response.json();
  return data.todos;
}

export async function TabTasks({ userId, username }: TabTasksProps) {
  const todos = await getTodos(userId);

  return (
    <div>
      {todos.length === 0 ? (
        <NoTodos />
      ) : (
        <div className="grid justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              url={`${username}/todo/${todo.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
