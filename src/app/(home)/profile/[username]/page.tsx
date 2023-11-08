import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { User } from '@/types/user';
import { api } from '@/config/api';
import { notFound } from 'next/navigation';
import { TabTasks } from './tab-tasks';

export async function generateMetadata({
  params,
}: ProfileProps): Promise<Metadata> {
  const username = params.username;

  const user = await getUserByUsername(username);

  const title = user?.isPublic
    ? `Profile - ${user?.firstName} ${user?.lastName}(@${user?.username})`
    : '404 - This page could not be found';

  return {
    title,
  };
}

type ProfileProps = {
  params: {
    username: string;
  };
};

async function getUserByUsername(username: string): Promise<User | undefined> {
  const response = await api(`/users/${username}`);

  if (!response.ok) {
    return undefined;
  }

  const data = await response.json();

  return {
    ...data.user,
    firstName: data.user.first_name,
    lastName: data.user.last_name,
  };
}

export default async function Profile({ params }: ProfileProps) {
  const user = await getUserByUsername(params.username);

  if (!user || !user.isPublic) {
    notFound();
  }

  return (
    <div className="flex-1 mx-8 lg:mx-20 mt-10">
      <header className="flex gap-3">
        <Avatar className="h-14 w-14">
          <AvatarImage src={user.username} />
          <AvatarFallback className="uppercase">
            {user.firstName.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-md font-bold">
            {user.firstName} {user.lastName}
          </h1>
          <span className="text-sm text-muted-foreground">@gleysonabreu</span>
        </div>
      </header>

      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6 pl-0">
          <Tabs defaultValue="tasks" className="space-y-4">
            <TabsList>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks" className="space-y-4">
              <TabTasks username={user.username} userId={user.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
