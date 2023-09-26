'use client';

import { useState } from 'react';
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
import { Loader2, Plus } from 'lucide-react';
import { fetchWithAuth } from '@/lib/fetcher';
import { revalidateTagHelper } from '@/app/actions';
import { useToast } from './ui/use-toast';
import { usePathname } from 'next/navigation';

const schema = z.object({
  name: z.string().min(3).max(20),
  description: z.string().optional(),
});

type FormNewTodoItemSchemaType = z.infer<typeof schema>;

export function DialogNewTodoItem() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const paths = usePathname().split('/');
  const id = paths.pop();

  const formNewTodo = useForm<FormNewTodoItemSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      name: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
    setError,
  } = formNewTodo;

  function openChangeWrapper(value: boolean) {
    setOpen(value);
    reset();
  }

  const handleNewTodo: SubmitHandler<FormNewTodoItemSchemaType> = async (
    data,
  ) => {
    try {
      const res = await fetchWithAuth(`/todos/${id}/items`, {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          description: data.description,
        }),
      });

      if (res.status === 201) {
        toast({
          title: `${data.name}`,
          description: 'Congrats! your task item has been created!',
          variant: 'success',
        });

        await revalidateTagHelper('items');
        openChangeWrapper(false);
        return;
      }

      if (res.status === 400) {
        const responseBody = await res.json();

        if (responseBody.errors.details) {
          responseBody.errors.details.forEach((error: any) => {
            setError(error.path[0], { message: error.message });
          });
          return;
        }

        toast({
          title: responseBody.message,
          variant: 'error',
        });
        return;
      }

      toast({
        title: 'Something went wrong!',
        description: 'Try again!',
        variant: 'error',
      });
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
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogTrigger asChild>
        <Button type="button" variant="link">
          <Plus
            size={70}
            className="text-green-500 hover:text-green-600 transition-colors"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...formNewTodo}>
          <form onSubmit={handleSubmit(handleNewTodo)}>
            <DialogHeader>
              <DialogTitle>New item</DialogTitle>
              <DialogDescription>
                Create a new task item to your to-do.!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start gap-2">
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
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
                        placeholder="this is my item..."
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
