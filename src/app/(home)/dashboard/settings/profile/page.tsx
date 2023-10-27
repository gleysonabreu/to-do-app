import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './profile-form';
import { api } from '@/config/api';
import { User } from '@/types/user';

async function getMeData(): Promise<User> {
  const res = await api('/me', {
    method: 'GET',
    next: {
      tags: ['profile'],
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

export default async function SettingsProfilePage() {
  const user = await getMeData();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  );
}
