import { Navbar } from '@/components/navbar';
import { SavedCollegesList } from '@/components/saved-colleges-list';

export const metadata = {
  title: 'Saved Colleges - CollegeFinder',
  description: 'View and manage your saved colleges',
};

export default function SavedCollegesPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Saved Colleges</h1>
            <p className="text-foreground/60">View and manage your saved colleges for easy comparison</p>
          </div>

          <SavedCollegesList />
        </div>
      </div>
    </>
  );
}
