import { Separator } from '@/components/ui/separator';
import { AccountForm } from './account-form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  isPublic: boolean;
};

async function getMeData() {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    next: {
      tags: ['account'],
    },
  });

  if (!res.ok) {
    throw new Error('failed to fetch data');
  }

  const responseBody = await res.json();

  return {
    id: responseBody.user.id,
    firstName: responseBody.user.first_name,
    lastName: responseBody.user.last_name,
    email: responseBody.user.email,
    username: responseBody.user.username,
    isPublic: responseBody.user.isPublic,
  } as User;
}

export default async function SettingsAccountPage() {
  const user = await getMeData();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm user={user} />
    </div>
  );
}
