import { SignupForm } from '@/components/signup-form';
import { Navbar } from '@/components/navbar';
import Link from 'next/link';

export const metadata = {
  title: 'Sign Up - CollegeFinder',
  description: 'Create a new CollegeFinder account',
};

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
              <p className="text-foreground/60">Join CollegeFinder to save colleges and comparisons</p>
            </div>

            <SignupForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-foreground/60">
                Already have an account?{' '}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
