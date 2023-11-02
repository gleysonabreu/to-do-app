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
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { revalidateTagHelper } from '@/app/actions';
import { User } from '@/types/user';
import { api } from '@/config/api';
import { CopyURL } from '@/components/copy-url';

const profileFormSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: 'Username must be at least 4 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  is_public: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type ProfileFormProps = {
  user: Partial<User>;
};

export function ProfileForm({ user }: ProfileFormProps) {
  const { data: session, update } = useSession();
  const defaultValues: Partial<ProfileFormValues> = {
    is_public: user.isPublic,
    username: user.username,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      const res = await api('/users/profile', {
        method: 'PUT',
        body: JSON.stringify({
          ...data,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 204) {
        toast({
          title: 'Profile updated!',
          description: 'You have just updated your profile details.',
          variant: 'success',
        });

        await update({
          ...session,
          user: {
            ...session?.user,
            username: data.username,
          },
        });
        await revalidateTagHelper('profile');
        return;
      }

      if (res.status === 409) {
        const responseBody = await res.json();
        form.setError('username', {
          message: responseBody.message,
          type: 'server',
        });
        return;
      }

      if (res.status === 400) {
        const responseBody = await res.json();

        responseBody.errors.details.forEach((error: any) => {
          form.setError(error.path[0], { message: error.message });
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <CopyURL username={user.username as string} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_public"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Public Profile?</FormLabel>
              <FormControl>
                <div className="w-full">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    placeholder="Enter your username"
                  />
                </div>
              </FormControl>
              <FormDescription>
                Activate or deactivate your public profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            'Update Profile'
          )}
        </Button>
      </form>
    </Form>
  );
}
