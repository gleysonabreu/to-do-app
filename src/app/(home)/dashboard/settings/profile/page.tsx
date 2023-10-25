import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './profile-form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

async function getMeData() {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    next: {
      tags: ['profile'],
    },
  });

  if (!res.ok) {
    throw new Error('failed to fetch data');
  }

  const responseBody = await res.json();

  return {
    id: responseBody.user.id,
    username: responseBody.user.username,
    isPublic: responseBody.user.isPublic,
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
