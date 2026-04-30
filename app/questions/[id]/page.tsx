import { Navbar } from '@/components/navbar';
import { mockQuestions } from '@/lib/mock-questions';
import { QuestionDetail } from '@/components/question-detail';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return mockQuestions.map(q => ({
    id: q.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const question = mockQuestions.find(q => q.id === resolvedParams.id);
  return {
    title: question ? `${question.title} - CollegeFinder Q&A` : 'Question - CollegeFinder',
    description: question?.content.slice(0, 160),
  };
}

export default async function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const question = mockQuestions.find(q => q.id === resolvedParams.id);

  if (!question) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <QuestionDetail question={question} />
        </div>
      </div>
    </>
  );
}
