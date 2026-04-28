

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  if (!user) return null;

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user.id),
    getLatestInterviews({ userId: user.id }),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI</h2>
          <p className="text-lg">
            Practice questions & get instant feedback
          </p>

          <Button asChild className="btn-primary">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
        />
      </section>

      {/* YOUR */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {userInterviews?.length ? (
            userInterviews.map((i) => (
              <InterviewCard
                key={i.id}
                userId={user.id}
                interviewId={i.id}
                role={i.role}
                type={i.type}
                techstack={i.techstack}
                createdAt={i.createdAt}
              />
            ))
          ) : (
            <p>No interviews yet</p>
          )}
        </div>
      </section>

      {/* ALL */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {allInterview?.length ? (
            allInterview.map((i) => (
              <InterviewCard
                key={i.id}
                userId={user.id}
                interviewId={i.id}
                role={i.role}
                type={i.type}
                techstack={i.techstack}
                createdAt={i.createdAt}
              />
            ))
          ) : (
            <p>No interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;