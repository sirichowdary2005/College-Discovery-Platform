import { Navbar } from '@/components/navbar';
import { QuestionsList } from '@/components/questions-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Questions & Answers - CollegeFinder',
  description: 'Ask and answer questions about colleges, placements, admissions, and more',
};

export default function QuestionsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-3">Questions & Answers</h1>
                <p className="text-foreground/60 max-w-2xl">
                  Get answers to your college admission, placement, and campus life questions. Learn from experienced students and alumni.
                </p>
              </div>
              <Button asChild className="bg-primary hover:bg-secondary text-white flex items-center gap-2">
                <Link href="/questions/ask">
                  <MessageSquare className="h-4 w-4" />
                  Ask Question
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-border">
                <p className="text-foreground/60 text-sm">Total Questions</p>
                <p className="text-2xl font-bold text-primary">1,234</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-border">
                <p className="text-foreground/60 text-sm">Answers Provided</p>
                <p className="text-2xl font-bold text-primary">3,456</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-border">
                <p className="text-foreground/60 text-sm">Active Members</p>
                <p className="text-2xl font-bold text-primary">5,678</p>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <QuestionsList />
        </div>
      </div>
    </>
  );
}
