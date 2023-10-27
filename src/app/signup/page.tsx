'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { api } from '@/config/api';

const formSignUpSchema = z.object({
  email: z.string().email(),
  firstName: z
    .string()
    .min(2, {
      message: 'First name must be at least 2 characters.',
    })
    .trim(),
  lastName: z
    .string()
    .min(2, {
      message: 'Last name must be at least 2 characters.',
    })
    .trim(),
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .trim()
    .regex(/^\S+$/, 'Username cannot contain spaces'),
  password: z
    .string()
    .min(2, {
      message: 'Password must be at least 2 characters.',
    })
    .trim(),
});

type FormSignUpSchemaType = z.infer<typeof formSignUpSchema>;

export default function SignUp() {
  const { toast } = useToast();
  const router = useRouter();

  const formSignIn = useForm<FormSignUpSchemaType>({
    resolver: zodResolver(formSignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      username: '',
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isSubmitting },
  } = formSignIn;

  const handleSubmitForm: SubmitHandler<FormSignUpSchemaType> = async (
    data,
  ) => {
    try {
      const res = await api('/users', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          username: data.username.toLowerCase(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 201) {
        toast({
          title: 'Account created!',
          description: 'Your account has been created, you can now sign in.',
          variant: 'success',
        });
        router.push('/signin');
        return;
      }

      if (res.status === 409) {
        const responseBody = await res.json();

        const includeEmail = (responseBody.message as string).includes(
          data.email,
        );

        if (includeEmail) {
          setError('email', {
            message: responseBody.message,
            type: 'server',
          });
          return;
        }

        setError('username', {
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
  };

  return (
    <Form {...formSignIn}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex p-3 gap-10 flex-col items-center justify-center h-screen"
      >
        <Link href="/">
          <Logo />
        </Link>
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      autoComplete="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-2 justify-between">
              <FormField
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="first_name">First name</FormLabel>
                    <FormControl>
                      <Input
                        id="first_name"
                        autoComplete="firstName"
                        type="text"
                        placeholder="John"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="last_name">Last name</FormLabel>
                    <FormControl>
                      <Input
                        id="last_name"
                        autoComplete="last_name"
                        type="text"
                        placeholder="Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      autoComplete="username"
                      type="text"
                      placeholder="johndoe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="ghost" type="button" onClick={() => reset()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : 'Create'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
