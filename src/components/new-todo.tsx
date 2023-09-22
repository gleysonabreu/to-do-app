import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { DialogNewTodo } from './dialog-new-todo';

export function NewTodo() {
  return (
    <Card className="flex flex-col w-72 h-60">
      <CardHeader className="pb-0">
        <CardTitle className="text-center">Add new to-do</CardTitle>
        <CardDescription className="text-center">
          Create a new to-do group in your drafts section where you can add
          details or edit to-do
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center p-0">
        <DialogNewTodo>
          <Button type="button" variant="link">
            <Plus
              size={70}
              className="text-green-500 hover:text-green-600 transition-colors"
            />
          </Button>
        </DialogNewTodo>
      </CardContent>
    </Card>
  );
}
