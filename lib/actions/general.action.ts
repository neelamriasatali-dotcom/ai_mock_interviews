// "use server";

// import { generateObject } from "ai";
// import { google } from "@ai-sdk/google";

// import { db } from "@/firebase/admin";
// import { feedbackSchema } from "@/constants";

// export async function createFeedback(params: CreateFeedbackParams) {
//   const { interviewId, userId, transcript, feedbackId } = params;

//   try {
//     const formattedTranscript = transcript
//       .map(
//         (sentence: { role: string; content: string }) =>
//           `- ${sentence.role}: ${sentence.content}\n`
//       )
//       .join("");

//     const { object } = await generateObject({
//       model: google("gemini-1.5-flash"),
//       schema: feedbackSchema,
//       prompt: `
//         You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
//         Transcript:
//         ${formattedTranscript}

//         Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
//         - **Communication Skills**: Clarity, articulation, structured responses.
//         - **Technical Knowledge**: Understanding of key concepts for the role.
//         - **Problem-Solving**: Ability to analyze problems and propose solutions.
//         - **Cultural & Role Fit**: Alignment with company values and job role.
//         - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
//         `,
//       system:
//         "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
//     });

//     const feedback = {
//       interviewId: interviewId,
//       userId: userId,
//       totalScore: object.totalScore,
//       categoryScores: object.categoryScores,
//       strengths: object.strengths,
//       areasForImprovement: object.areasForImprovement,
//       finalAssessment: object.finalAssessment,
//       createdAt: new Date().toISOString(),
//     };

//     let feedbackRef;

//     if (feedbackId) {
//       feedbackRef = db.collection("feedback").doc(feedbackId);
//     } else {
//       feedbackRef = db.collection("feedback").doc();
//     }

//     await feedbackRef.set(feedback);

//     return { success: true, feedbackId: feedbackRef.id };
//   } catch (error) {
//     console.error("Error saving feedback:", error);
//     return { success: false };
//   }
// }

// export async function getInterviewById(id: string): Promise<Interview | null> {
//   const interview = await db.collection("interviews").doc(id).get();

//   return interview.data() as Interview | null;
// }

// export async function getFeedbackByInterviewId(
//   params: GetFeedbackByInterviewIdParams
// ): Promise<Feedback | null> {
//   const { interviewId, userId } = params;

//   const querySnapshot = await db
//     .collection("feedback")
//     .where("interviewId", "==", interviewId)
//     .where("userId", "==", userId)
//     .limit(1)
//     .get();

//   if (querySnapshot.empty) return null;

//   const feedbackDoc = querySnapshot.docs[0];
//   return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
// }

// export async function getLatestInterviews(
//   params: GetLatestInterviewsParams
// ): Promise<Interview[] | null> {
//   const { userId, limit = 20 } = params;

//   const interviews = await db
//     .collection("interviews")
//     .orderBy("createdAt", "desc")
//     .where("finalized", "==", true)
//     .where("userId", "!=", userId)
//     .limit(limit)
//     .get();

//   return interviews.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as Interview[];
// }

// export async function getInterviewsByUserId(
//   userId: string
// ): Promise<Interview[] | null> {
//   const interviews = await db
//     .collection("interviews")
//     .where("userId", "==", userId)
//     .orderBy("createdAt", "desc")
//     .get();

//   return interviews.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as Interview[];
// }





















"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

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
        "You are a strict but fair senior technical interviewer evaluating a mid-level React + Node.js candidate. Return ONLY fields that match the provided schema.",
      prompt: `
You are analyzing a mock interview for a mid-level React + Node.js developer.

Rules:
- Be strict but fair.
- Base your evaluation ONLY on the transcript (do not assume anything not said).
- Keep bullets concise and actionable.

Transcript:
${formattedTranscript}

1) Score the candidate from 0 to 100 in the following categories ONLY (use exactly these names):
- Communication Skills
- Technical Knowledge
- Problem Solving
- Cultural Fit
- Confidence and Clarity

2) Also provide:
- frontendScore (0-100): React skills based on what they said
- backendScore (0-100): Node.js/Express skills based on what they said

Frontend (React) consider:
- hooks, state management, component patterns
- performance (re-renders, memoization, useMemo/useCallback)
- accessibility (semantic HTML, ARIA basics, keyboard navigation)
- testing (React Testing Library/Jest, unit vs integration)

Backend (Node/Express) consider:
- REST design, validation, pagination
- auth (JWT/sessions), authorization, security basics
- databases & data modeling
- caching, scalability
- error handling, logging

3) Return:
- totalScore (0-100) (overall)
- strengths: 3–6 bullets
- areasForImprovement: 3–6 bullets
- improvementTips: 5–10 concrete tips tailored to transcript
- nextSteps: 3–8 topics to practice next
- finalAssessment: 4–8 sentences summary
`,
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

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();
  return interview.data() as Interview | null;
}

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

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .orderBy("userId")               // ✅ FIX (must for !=)
    .orderBy("createdAt", "desc")    // existing
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

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