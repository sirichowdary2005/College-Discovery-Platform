'use client';

import { useUser } from '@/lib/user-context';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export function SaveCollegeButton({ collegeId }: { collegeId: string }) {
  const { user, isSaved, saveCollege, unsaveCollege, isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return (
      <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 flex items-center gap-2">
        <Link href="/login">
          <Heart className="h-4 w-4" />
          Save College
        </Link>
      </Button>
    );
  }

  const saved = isSaved(collegeId);

  return (
    <button
      onClick={() => {
        if (saved) {
          unsaveCollege(collegeId);
        } else {
          saveCollege(collegeId);
        }
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
        saved
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-primary/10 text-primary hover:bg-primary/20'
      }`}
    >
      <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
      {saved ? 'Saved' : 'Save College'}
    </button>
  );
}
