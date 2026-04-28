
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { vapi } from "@/lib/vapi.sdk";
import {
  createFeedback,
  createInterview,
} from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface AgentProps {
  userName: string;
  userId: string;
  role: string;
  type: string;
}

const Agent = ({ userName, userId, role }: AgentProps) => {
  const router = useRouter();

  const [callStatus, setCallStatus] = useState<CallStatus>(
    CallStatus.INACTIVE
  );
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const currentInterviewId = useRef<string | null>(null);
  const feedbackStartedRef = useRef<boolean>(false);

  // 🎧 VAPI EVENTS
  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMsg: SavedMessage = {
          role: message.role,
          content: message.transcript,
        };
        setMessages((prev) => [...prev, newMsg]);
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
    };
  }, []);

  // 🎯 FEEDBACK
  useEffect(() => {
    const generateFeedback = async () => {
      if (!currentInterviewId.current) return;

      if (feedbackStartedRef.current) return;
      feedbackStartedRef.current = true;

      const interviewId = currentInterviewId.current;

      const res = await createFeedback({
        interviewId,
        userId,
        transcript: messages,
      });

      if (res.success) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      generateFeedback();
    }
  }, [callStatus, messages, userId, router]);

  // 🚀 START
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    setMessages([]);
    feedbackStartedRef.current = false;

    const res = await createInterview({
      userId,
      role,
      type: "Mixed",
      techstack:
        role === "Frontend Developer"
          ? ["React", "Next.js"]
          : ["Node.js", "Express"],
    });

    if (!res.success) return;

    currentInterviewId.current = res.interviewId ?? null;

    await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!, {
      variableValues: {
        username: userName,
        role: role,
      },
    });
  };

  const handleDisconnect = () => {
    vapi.stop();
  };

  return (
    <>
      {/* 🔥 BIG CARDS */}
      <div className="flex justify-center items-center gap-16 mt-10">
        {/* AI CARD */}
          <div className="flex flex-col items-center justify-center 
  w-[300px] h-[220px] 
  bg-gradient-to-br from-indigo-900 from-indigo-900 to-blue
  rounded-2xl border border-blue-900 shadow-lg">

  <div className="bg-white p-4 rounded-full">
    <Image
      src="/ai-avatar.png"
      alt="ai"
      width={70}
      height={70}
    />
    
  </div>

  <h3 className="mt-4 text-xl font-semibold text-white">
    AI Interviewer
  </h3>
</div>


        {/* USER CARD */}
        {/* <div className="flex flex-col items-center bg-gray-800 p-10 rounded-2xl w-[300px] h-[300px] justify-center"> */}
        <div className="flex flex-col items-center justify-center 
  w-[300px] h-[220px] 
  bg-gradient-to-br from-indigo-900  from-indigo-900 to-blue 
  rounded-2xl border border-blue-900 shadow-lg">
          <Image
            src="/user-avatar.png"
            alt="user"
            width={110}
            height={110}
            className="rounded-full"
          />
          <h3 className="mt-4 text-xl font-semibold">{userName}</h3>
        </div>
      </div>

      {/* 💬 CHAT BOX (FIXED HEIGHT) */}
      <div className="mt-8 max-w-2xl mx-auto bg-gradient-to-br from-indigo-900 to-blue 
  rounded-2xl border p-8 rounded-xl h-[200px] w-[700px] overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-center text-white-400">
            Conversation will appear here...
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-3 ${
                msg.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg text-sm max-w-[100%] ${
                  msg.role === "assistant"
                    ? "bg-gradient-to-br from-indigo-900 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔘 BUTTON */}
      <div className="flex justify-center mt-6">
        {callStatus !== "ACTIVE" ? (
          <button className="btn-call" onClick={handleCall}>
            Start Interview ({role})
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            End Interview
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;