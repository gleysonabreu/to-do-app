'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight, Menu, Plus } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { DialogNewTodo } from './dialog-new-todo';
import { ToggleTheme } from './toggle-theme';
import { Logo } from './logo';

export function Header() {
  const { data: session } = useSession();

  const pathname = usePathname();
  return (
    <header className="bg-white dark:bg-zinc-900 w-full h-16 relative lg:h-20">
      <div className="h-full relative">
        <div className="mx-8 lg:mx-20 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center h-full w-28">
            <Logo />
          </Link>

          <div className="flex items-center gap-5">
            {session ? (
              <>
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="block md:hidden">
                      <Menu />
                    </button>
                  </SheetTrigger>

                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>
                        <Link href="/">
                          <Logo />
                        </Link>
                      </SheetTitle>
                    </SheetHeader>

                    <div className="pb-10 my-6">
                      <div className="flex flex-col pl-6 space-y-3 mb-6">
                        <Link
                          href="/dashboard"
                          className="px-3 py-2 hover:text-zinc-400 transition-all"
                        >
                          Dashboard
                        </Link>
                      </div>

                      <div className="border-t pt-4 border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={session.user.image as string} />
                            <AvatarFallback className="uppercase">
                              {session.user.name?.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <h1 className="truncate">{session.user.name}</h1>
                        </div>

                        <div className="flex flex-col pl-6 space-y-3 mt-6">
                          <DialogNewTodo>
                            <Button size="sm" variant="sky">
                              To-do
                              <Plus size={20} className="text-zinc-100" />
                            </Button>
                          </DialogNewTodo>

                          <Button
                            type="button"
                            onClick={() => signOut()}
                            size="sm"
                          >
                            Sign out
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <div className="items-center gap-4 hidden md:flex">
                  <Avatar>
                    <AvatarImage src={session.user.image as string} />
                    <AvatarFallback className="uppercase">
                      {session.user.name?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {pathname === '/' ? (
                    <Button size="sm" asChild>
                      <Link href="/dashboard">
                        Dashboard
                        <ArrowRight size={20} className="text-sky-400" />
                      </Link>
                    </Button>
                  ) : (
                    <DialogNewTodo>
                      <Button size="sm" variant="sky">
                        To-do
                        <Plus size={20} className="text-zinc-100" />
                      </Button>
                    </DialogNewTodo>
                  )}
                  <Button
                    onClick={() => signOut()}
                    size="sm"
                    variant="link"
                    className="p-0"
                  >
                    Sign out
                  </Button>
                </div>
              </>
            ) : (
              <Button size="lg" className="group" asChild>
                <Link href="/signin">
                  Sign In
                  <ArrowRight size={20} className="text-sky-400" />
                </Link>
              </Button>
            )}
            <ToggleTheme />
          </div>
        </div>
      </div>
    </header>
  );
}
