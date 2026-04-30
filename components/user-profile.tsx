'use client';

import { useUser } from '@/lib/user-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, Mail, Calendar, Heart, BarChart3, MessageSquare, LogOut, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function UserProfile() {
  const { user, isAuthenticated, logout } = useUser();
  const router = useRouter();

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-white rounded-lg p-12 border border-border text-center max-w-md mx-auto">
        <AlertCircle className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Not logged in</h2>
        <p className="text-foreground/60 mb-6">Please login to view your profile</p>
        <Button asChild className="bg-primary hover:bg-secondary text-white">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-8 mb-8 border border-primary/20">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
              <p className="text-foreground/60">{user.email}</p>
              <p className="text-sm text-foreground/50 mt-2">
                Member since {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors font-medium"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 bg-white border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Saved Colleges</h3>
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-primary">{user.savedColleges.length}</p>
        </Card>

        <Card className="p-6 bg-white border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Comparisons</h3>
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-primary">{user.savedComparisons.length}</p>
        </Card>

        <Card className="p-6 bg-white border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Questions</h3>
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-primary">{user.questions.length}</p>
        </Card>

        <Card className="p-6 bg-white border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Member Since</h3>
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm font-bold text-primary">{formatDate(user.createdAt)}</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-8 border border-border mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button asChild className="bg-primary hover:bg-secondary text-white h-12">
            <Link href="/saved-colleges">View Saved Colleges</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-secondary text-white h-12">
            <Link href="/compare">View Comparisons</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-secondary text-white h-12">
            <Link href="/questions">Ask Questions</Link>
          </Button>
        </div>
      </div>

      {/* Account Details */}
      <div className="bg-white rounded-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">Account Details</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-foreground/5 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-foreground/60">Full Name</p>
                <p className="font-semibold text-foreground">{user.name}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-foreground/5 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-foreground/60">Email Address</p>
                <p className="font-semibold text-foreground">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-foreground/5 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-foreground/60">Account Created</p>
                <p className="font-semibold text-foreground">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
