'use client';

import { useUser } from '@/lib/user-context';
import { mockColleges } from '@/lib/mock-colleges';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, BookmarkX, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SavedCollegesList() {
  const { user, unsaveCollege, isAuthenticated } = useUser();
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg p-12 border border-border text-center">
        <Heart className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Please log in</h2>
        <p className="text-foreground/60 mb-6">Sign in to save and manage your favorite colleges</p>
        <Button asChild className="bg-primary hover:bg-secondary text-white">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    );
  }

  const savedCollegesList = user?.savedColleges
    .map(id => mockColleges.find(c => c.id === id))
    .filter(Boolean) || [];

  if (savedCollegesList.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 border border-border text-center">
        <BookmarkX className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">No saved colleges yet</h2>
        <p className="text-foreground/60 mb-6">Start saving colleges to compare them later</p>
        <Button asChild className="bg-primary hover:bg-secondary text-white">
          <Link href="/">Browse Colleges</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-border">
        <p className="text-foreground/60 mb-6">
          You have <span className="font-bold text-primary">{savedCollegesList.length}</span> saved colleges
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCollegesList.map(college => (
            college && (
              <div key={college.id} className="bg-white rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all overflow-hidden">
                <div className="relative h-40 bg-primary/20 overflow-hidden">
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => unsaveCollege(college.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-primary uppercase mb-1">Rank #{college.rank}</p>
                    <h3 className="text-lg font-bold text-foreground mb-2">{college.name}</h3>
                    <p className="text-sm text-foreground/60 mb-4">{college.location}, {college.state}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-primary/5 rounded">
                      <p className="text-xs text-foreground/60 mb-1">Fees</p>
                      <p className="font-bold text-primary">₹{(college.fees / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded">
                      <p className="text-xs text-foreground/60 mb-1">Rating</p>
                      <p className="font-bold text-primary">{college.rating}/5</p>
                    </div>
                  </div>

                  <Button asChild className="w-full bg-primary hover:bg-secondary text-white flex items-center justify-center gap-2">
                    <Link href={`/college/${college.id}`}>
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5">
          <Link href="/compare">Compare Saved Colleges</Link>
        </Button>
      </div>
    </div>
  );
}
