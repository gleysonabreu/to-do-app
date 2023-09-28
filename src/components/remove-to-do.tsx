'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { fetchWithAuth } from '@/lib/fetcher';
import { useToast } from './ui/use-toast';
import { revalidateTagHelper } from '@/app/actions';
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
};

export function RemoveTodo({ id }: Props) {
  const [isLoadingRemoveTodo, setIsLoadingRemoveTodo] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  async function handleDeleteTodo() {
    try {
      setIsLoadingRemoveTodo(true);
      const res = await fetchWithAuth(`/todos/${id}`, {
        method: 'DELETE',
      });

      if (res.status === 204) {
        toast({
          title: `To-do deleted.`,
          variant: 'success',
        });

        await revalidateTagHelper('todos');
        router.back();
        return;
      }

      toast({
        title: 'Something went wrong',
        description: 'Try again later.',
        variant: 'error',
      });
      setIsLoadingRemoveTodo(false);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Connection failed.',
        description:
          'Unable to connect to Tasks. Please check your connection.',
        variant: 'error',
      });
    } finally {
      setIsLoadingRemoveTodo(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="red">Remove to-do</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            to-do from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteTodo}>
            {isLoadingRemoveTodo ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Continue'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
