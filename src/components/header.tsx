'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight, Menu } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-zinc-900 w-full h-16 relative lg:h-20">
      <div className="h-full relative">
        <div className="mx-8 lg:mx-20 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center h-full w-28">
            <Image src="/logo.svg" alt="Logo" width={114} height={43} />
          </Link>
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
                        <Image
                          src="/logo.svg"
                          alt="Logo"
                          width={121}
                          height={43}
                          className="w-24"
                        />
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

                    <div className="border-t pt-4 border-zinc-800">
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
                <Button size="sm" asChild>
                  <Link href="/dashboard">
                    Dashboard
                    <ArrowRight size={20} className="text-sky-400" />
                  </Link>
                </Button>
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
        </div>
      </div>
    </header>
  );
}
