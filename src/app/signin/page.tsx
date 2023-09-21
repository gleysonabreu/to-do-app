'use client';
import { signIn } from 'next-auth/react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from 'lucide-react';

const formSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.'
  })
});

export type SignInErrorTypes =
  | "Signin"
  | "OAuthSignin"
  | "OAuthCallback"
  | "OAuthCreateAccount"
  | "EmailCreateAccount"
  | "Callback"
  | "OAuthAccountNotLinked"
  | "EmailSignin"
  | "CredentialsSignin"
  | "SessionRequired"
  | "default"

type FormSignInSchemaType = z.infer<typeof formSignInSchema>;
type SignInParams = {
  searchParams: {
    callbackUrl: string;
    error: SignInErrorTypes;
  }
}

export default function SignIn({ searchParams }: SignInParams) {
  const { callbackUrl, error: errorType } = searchParams;

  const formSignIn = useForm<FormSignInSchemaType>({
    resolver: zodResolver(formSignInSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const { handleSubmit, control, reset, formState: { isSubmitting } } = formSignIn;

  const handleSubmitForm: SubmitHandler<FormSignInSchemaType> = async (data) => {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: callbackUrl ?? '/',
      redirect: true,
    })
  }

  const errors: Record<SignInErrorTypes, string> = {
    Signin: "Try signing in with a different account.",
    OAuthSignin: "Try signing in with a different account.",
    OAuthCallback: "Try signing in with a different account.",
    OAuthCreateAccount: "Try signing in with a different account.",
    EmailCreateAccount: "Try signing in with a different account.",
    Callback: "Try signing in with a different account.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "The e-mail could not be sent.",
    CredentialsSignin:
      "Sign in failed. Check the details you provided are correct.",
    SessionRequired: "Please sign in to access this page.",
    default: "Unable to sign in.",
  }

  const error = errorType && (errors[errorType] ?? errors.default);

  return (
    <Form {...formSignIn}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="flex p-3 gap-10 flex-col items-center justify-center h-screen">
        <Image src='/logo.svg' alt='Logo' width={121} height={43} />
        <Card className="w-full max-w-lg">
          {error && (
            <div className='p-6'>
              <Alert variant='destructive'>
                <AlertTitle>{errorType}</AlertTitle>
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            </div>
          )}
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <FormControl>
                    <Input id="email" autoComplete='email' type='email' placeholder="johndoe@example.com" {...field} />
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
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <FormControl>
                    <Input id="password" type='password' placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type='button' onClick={() => reset()}>Cancel</Button>
            <Button variant='sky' type='submit' disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className='animate-spin' /> : 'Login'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form >
  );
}
