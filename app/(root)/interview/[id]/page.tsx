

"use client"
import React, { useState, useEffect } from 'react';
// import { db } from "@/firebase/config";
import { db } from "@/firebase/client"; 

import { doc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';

interface InterviewPageProps {
  params: { id: string };
}

const InterviewPage = ({ params }: InterviewPageProps) => {
  const router = useRouter();
  const [interviewRecords, setInterviewRecords] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Example Questions (Inhain aap AI se bhi fetch kar sakti hain)
  const questions = [
    "What is your experience with React?",
    "Explain the difference between SQL and NoSQL.",
    "How do you handle deadlines?"
  ];

  // Jab user jawab de (Voice ya Text ke zariye)
  const handleSaveAnswer = (userAnswer: string) => {
    const newRecord = {
      question: questions[currentQuestionIndex],
      userAnswer: userAnswer,
      feedback: "AI is analyzing...", // Baad mein AI se update hoga
    };

    setInterviewRecords((prev) => [...prev, newRecord]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Interview khatam hone par Firebase mein save karne ka function
  const endInterview = async () => {
    try {
      const interviewRef = doc(db, "Interviews", params.id);
      
      await setDoc(interviewRef, {
        allAnswers: interviewRecords,
        status: "Completed",
        createdAt: new Date()
      }, { merge: true });

      // Redirect to feedback page
      router.push(`/interview/${params.id}/feedback`);
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Error saving interview. Please try again.");
    }
  };

  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-5">Interview in Progress</h1>
      <div className="p-6 border rounded-xl shadow-md w-full max-w-2xl bg-white">
        <h2 className="text-xl font-semibold">Question {currentQuestionIndex + 1}:</h2>
        <p className="text-lg my-4">{questions[currentQuestionIndex]}</p>
        
        {/* Answer Input Area (Textarea or Voice Button) */}
        <textarea 
          className="w-full border p-2 rounded-md" 
          placeholder="Type your answer here..."
          onBlur={(e) => handleSaveAnswer(e.target.value)}
        />

        <div className="mt-6 flex justify-between">
          <button 
            onClick={endInterview}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            End Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
