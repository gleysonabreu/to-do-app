import { Separator } from '@/components/ui/separator';
import { AccountForm } from './account-form';
import { api } from '@/config/api';
import { User } from '@/types/user';

async function getMeData(): Promise<User> {
  const res = await api('/me', {
    method: 'GET',
    next: {
      tags: ['account'],
    },
  });

  if (!res.ok) {
    throw new Error('failed to fetch user data');
  }

  const responseBody = await res.json();

  return {
    ...responseBody.user,
    firstName: responseBody.user.first_name,
    lastName: responseBody.user.last_name,
  };
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
