import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DialogNewTodoItem } from './dialog-new-todo-item';

export function NewTodoItem() {
  return (
    <Card className="flex flex-col w-72 h-52">
      <CardHeader className="pb-0">
        <CardTitle className="text-center">Add new item</CardTitle>
        <CardDescription className="text-center">
          Create a new task item to your to-do!
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center p-0">
        <DialogNewTodoItem />
      </CardContent>
    </Card>
  );
}
