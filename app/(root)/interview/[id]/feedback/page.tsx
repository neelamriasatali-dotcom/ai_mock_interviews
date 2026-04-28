



"use client"
import React, { useEffect, useState } from 'react';
// import { db } from "@/firebase/config";
import { db } from "@/firebase/client"; 
import { doc, getDoc } from "firebase/firestore";
import Link from 'next/link';

interface FeedbackPageProps {
  params: { id: string };
}

const FeedbackPage = ({ params }: FeedbackPageProps) => {
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const docRef = doc(db, "Interviews", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFeedbackList(docSnap.data().allAnswers || []);
        } else {
          console.log("No interview found!");
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [params.id]);

  if (loading) return <div className="p-20 text-center">Loading Feedback...</div>;

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-2">Interview Result</h1>
      <p className="text-gray-500 mb-8">Review your answers and improvement tips below.</p>

      {feedbackList.length === 0 ? (
        <div className="text-center p-10 border rounded-lg">
          <p>No records found for this interview.</p>
          <Link href="/dashboard" className="text-blue-500 underline mt-4 inline-block">Go Back to Dashboard</Link>
        </div>
      ) : (
        feedbackList.map((item, index) => (
          <div key={index} className="mb-6 border rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gray-100 p-4 font-bold">
              Q{index + 1}: {item.question}
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <span className="font-bold text-red-700">Your Answer:</span>
                <p className="mt-1">{item.userAnswer}</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                <span className="font-bold text-green-700">AI Feedback:</span>
                <p className="mt-1">{item.feedback}</p>
              </div>
            </div>
          </div>
        ))
      )}

      <div className="mt-10">
        <Link href="/dashboard">
          <button className="bg-black text-white px-8 py-3 rounded-full hover:opacity-80 transition">
            Return to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeedbackPage;
