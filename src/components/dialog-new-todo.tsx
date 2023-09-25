'use client';

import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Loader2 } from 'lucide-react';
import { toast } from './ui/use-toast';
import { fetchWithAuth } from '@/lib/fetcher';
import { revalidateTagHelper } from '@/app/actions';

const schema = z.object({
  title: z.string().min(3).max(20),
  description: z.string().optional(),
});

type FormNewTodoSchemaType = z.infer<typeof schema>;

export function DialogNewTodo({ children }: { children: ReactNode }) {
  const formNewTodo = useForm<FormNewTodoSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      title: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
    setError,
  } = formNewTodo;

  const handleNewTodo: SubmitHandler<FormNewTodoSchemaType> = async (data) => {
    try {
      const res = await fetchWithAuth('/todos', {
        method: 'POST',
        body: JSON.stringify({
          title: data.title,
          description: data.description,
        }),
      });

      if (res.status === 201) {
        toast({
          title: `${data.title}`,
          description: 'Congrats! your task has been created!',
          variant: 'success',
        });

        await revalidateTagHelper('todos');
        reset();
        return;
      }

      if (res.status === 400) {
        const responseBody = await res.json();
        responseBody.errors.details.forEach((error: any) => {
          setError(error.path[0], { message: error.message });
        });

        return;
      }

      if (!res.ok) {
        toast({
          title: 'Something went wrong!',
          description: 'Try again!',
          variant: 'error',
        });
        return;
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Connection failed.',
        description:
          'Unable to connect to Tasks. Please check your connection.',
        variant: 'error',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...formNewTodo}>
          <form onSubmit={handleSubmit(handleNewTodo)}>
            <DialogHeader>
              <DialogTitle>New todo</DialogTitle>
              <DialogDescription>Create a new todo group!</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start gap-2">
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <FormControl>
                      <Input
                        id="title"
                        type="text"
                        placeholder="Example: my day"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start gap-2">
                    <FormLabel htmlFor="description">
                      Description (optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="description"
                        type="text"
                        placeholder="this is my list..."
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="sky" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
