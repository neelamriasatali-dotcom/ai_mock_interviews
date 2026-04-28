"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

// ✅ CREATE INTERVIEW (FIXED)
export async function createInterview(params: {
  userId: string;
  role: string;
  type: string;
  techstack: string[];
}) {
  const { userId, role, type, techstack } = params;

  try {
    const docRef = db.collection("interviews").doc();

    await docRef.set({
      userId,
      role,
      type,
      techstack,
      finalized: true,
      createdAt: new Date().toISOString(),
    });

    return { success: true, interviewId: docRef.id };
  } catch (error) {
    console.error("Error creating interview:", error);
    return { success: false };
  }
}

// ✅ CREATE FEEDBACK
export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: feedbackSchema,
      system:
        "You are a strict but fair senior technical interviewer evaluating a mid-level React + Node.js candidate.",
      prompt: `Transcript:\n${formattedTranscript}`,
    });

    const feedback = {
      interviewId,
      userId,
      totalScore: object.totalScore,
      frontendScore: object.frontendScore,
      backendScore: object.backendScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      improvementTips: object.improvementTips,
      nextSteps: object.nextSteps,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    const feedbackRef = feedbackId
      ? db.collection("feedback").doc(feedbackId)
      : db.collection("feedback").doc();

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

// ✅ SAVE QUESTIONS
export async function saveInterviewQuestions(params: {
  interviewId: string;
  userId: string;
  questions: string[];
}) {
  const { interviewId, userId, questions } = params;

  try {
    await db.collection("interviews").doc(interviewId).set(
      {
        userId,
        questions,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return { success: true };
  } catch (error) {
    console.error("Error saving interview questions:", error);
    return { success: false };
  }
}

// ✅ GET ONE INTERVIEW
export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();
  return interview.data() as Interview | null;
}

// ✅ GET FEEDBACK
export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

// ✅ GET LATEST INTERVIEWS
export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .orderBy("userId")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

// ✅ GET USER INTERVIEWS
export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}












