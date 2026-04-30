import { Navbar } from '@/components/navbar';
import { UserProfile } from '@/components/user-profile';

export const metadata = {
  title: 'Your Profile - CollegeFinder',
  description: 'Manage your profile and preferences',
};

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <UserProfile />
        </div>
      </div>
    </>
  );
}
