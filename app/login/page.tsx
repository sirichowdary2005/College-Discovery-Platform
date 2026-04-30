import { LoginForm } from '@/components/login-form';
import { Navbar } from '@/components/navbar';
import Link from 'next/link';

export const metadata = {
  title: 'Login - CollegeFinder',
  description: 'Sign in to your CollegeFinder account',
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
              <p className="text-foreground/60">Sign in to access your saved colleges and comparisons</p>
            </div>

            <LoginForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-foreground/60 mb-4">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-primary font-semibold hover:underline">
                  Sign up here
                </Link>
              </p>
              
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-xs font-semibold text-primary mb-2">Demo Credentials:</p>
                <p className="text-xs text-foreground/70 mb-1">Email: student@example.com</p>
                <p className="text-xs text-foreground/70">Password: password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
