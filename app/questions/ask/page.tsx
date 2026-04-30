import { Navbar } from '@/components/navbar';
import { AskQuestionForm } from '@/components/ask-question-form';

export const metadata = {
  title: 'Ask a Question - CollegeFinder',
  description: 'Get answers to your college-related questions',
};

export default function AskQuestionPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-3">Ask a Question</h1>
              <p className="text-foreground/60">
                Ask the community about colleges, admissions, placements, and more. Get answers from experienced students and alumni.
              </p>
            </div>

            <AskQuestionForm />
          </div>
        </div>
      </div>
    </>
  );
}
