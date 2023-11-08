'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { useCallback, useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { api } from '@/config/api';
import { User } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useRouter } from 'next/navigation';

export function Search() {
  const [search, setSearch] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[] | null>(null);

  const router = useRouter();

  const searchUsers = useCallback(async () => {
    if (query.length < 3) return;

    setIsLoading(true);
    const response = await api(`/users?q=${query}`);
    const data = await response.json();

    const userFiltered = data.users.map((user: any) => {
      return {
        ...user,
        firstName: user.first_name,
        lastName: user.last_name,
      };
    });

    setUsers(userFiltered);
    setIsLoading(false);
  }, [query]);

  useEffect(() => {
    const timeOutId = setTimeout(() => setQuery(search), 500);
    return () => clearTimeout(timeOutId);
  }, [search]);

  useEffect(() => {
    searchUsers();
  }, [searchUsers, query]);

  function redirect(path: string) {
    router.push(path);
  }

  return (
    <Command
      shouldFilter={false}
      className="rounded-lg border shadow-md w-full"
    >
      <CommandInput
        value={search}
        onValueChange={setSearch}
        placeholder="Type a command or search..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {isLoading && (
          <CommandPrimitive.Loading>
            <div className="p-1">
              <Skeleton className="h-8 w-full" />
            </div>
          </CommandPrimitive.Loading>
        )}
        {users && (
          <CommandGroup heading="Users">
            {users.map((user) => (
              <CommandItem
                key={user.id}
                className="gap-1"
                onSelect={() => redirect(`/profile/${user.username}`)}
              >
                <Avatar>
                  <AvatarImage src={user.username} />
                  <AvatarFallback className="uppercase">
                    {user.firstName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span>@{user.username}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
