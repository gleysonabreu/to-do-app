'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { User } from './page';
import { Loader2 } from 'lucide-react';
import { fetchWithAuth } from '@/lib/fetcher';
import { useSession } from 'next-auth/react';
import { revalidateTagHelper } from '@/app/actions';

const accountFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: 'First name must be at least 2 characters.',
    })
    .max(30, {
      message: 'First name must not be longer than 30 characters.',
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'First name must be at least 2 characters.',
    })
    .max(30, {
      message: 'First name must not be longer than 30 characters.',
    }),
  email: z.string().email(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

type AccountFormProps = {
  user: Partial<User>;
};

export function AccountForm({ user }: AccountFormProps) {
  const { data: session, update } = useSession();
  const defaultValues: Partial<AccountFormValues> = {
    ...user,
  };

  const formUpdateAccount = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = formUpdateAccount;

  async function handleUpdateData(data: AccountFormValues) {
    try {
      const res = await fetchWithAuth('/users', {
        method: 'PUT',
        body: JSON.stringify({
          ...data,
        }),
      });

      if (res.status === 204) {
        toast({
          title: 'Account updated!',
          description: 'You have just updated your account details.',
          variant: 'success',
        });

        await update({
          ...session,
          user: {
            ...session?.user,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
          },
        });
        await revalidateTagHelper('account');
        return;
      }

      if (res.status === 409) {
        const responseBody = await res.json();
        setError('email', {
          message: responseBody.message,
          type: 'server',
        });
        return;
      }

      if (res.status === 400) {
        const responseBody = await res.json();

        responseBody.errors.details.forEach((error: any) => {
          setError(error.path[0], { message: error.message });
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
  }

  return (
    <Form {...formUpdateAccount}>
      <form onSubmit={handleSubmit(handleUpdateData)} className="space-y-8">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormDescription>
                This is the first name that will be displayed on your profile
                and in emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormDescription>
                This is the last name that will be displayed on your profile and
                in emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>
                This is the email that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            'Update Account'
          )}
        </Button>
      </form>
    </Form>
  );
}
