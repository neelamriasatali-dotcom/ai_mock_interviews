
// import Image from "next/image";

// interface AgentProps {
//   userName: string;
// }

// enum CallStatus {
//   INACTIVE = "INACTIVE",
//   CONNECTING = "CONNECTING",
//   ACTIVE = "ACTIVE",
//   FINISHED = "FINISHED",
// }

// const Agent = ({ userName }: AgentProps) => {
//   const isSpeaking = true;

//   // ---- Example state (you can replace with real state later)
//   const callStatus: CallStatus = CallStatus.INACTIVE;

//   return (
//     <>
//       <div className="call-view flex justify-center gap-8 mt-10">
//         {/* LEFT BOX — AI INTERVIEWER */}
//         <div
//           className="card-interview flex flex-col items-center justify-center rounded-2xl p-6"
//           style={{
//             height: "230px",
//             width: "350px",
//             background:
//               "linear-gradient(180deg,#262044 0%,rgba(28,22,55,0.7) 100%)",
//             border: "2px solid #4d4c66",
//           }}
//         >
//           <div className="avatar relative mb-3">
//             <Image
//               src="/ai-avatar.png"
//               alt="ai interviewer"
//               width={95}
//               height={95}
//               className="object-cover rounded-full"
//             />

//             {isSpeaking && (
//               <span className="absolute inset-0 rounded-full animate-ping bg-purple-400 opacity-40"></span>
//             )}
//           </div>

//           <h3 className="text-center text-white text-lg font-semibold">
//             AI Interviewer
//           </h3>
//         </div>

//         {/* RIGHT BOX — USER */}
//         <div
//           className="card-interview flex flex-col items-center justify-center rounded-2xl p-6"
//           style={{
//             height: "230px",
//             width: "350px",
//             background:
//               "linear-gradient(180deg,#0d0d15 0%,rgba(12,12,17,0.7) 100%)",
//             border: "2px solid #2c2c35",
//           }}
//         >
//           <Image
//             src="/user-avatar.png"
//             alt="user avatar"
//             width={95}
//             height={95}
//             className="rounded-full object-cover"
//           />

//           <h3 className="text-center text-white text-lg font-semibold mt-3">
//             {userName}
//           </h3>
//         </div>
//       </div>

//       {/* CALL BUTTON */}
//       <div className="w-full flex justify-center mt-6">
//         {callStatus !== CallStatus.ACTIVE ? (
//           <button className="px-5 py-2 bg-purple-600 text-white rounded-xl">
//             <span>
//               {callStatus === CallStatus.INACTIVE ||
//               callStatus === CallStatus.FINISHED
//                 ? "Call"
//                 : ". . ."}
//             </span>
//           </button>
//         ) : (
//           <button className="px-5 py-2 bg-red-600 text-white rounded-xl">
//             End
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default Agent; 1code



import React from 'react'
import Image from 'next/image';
import { cn } from "@/lib/utils";
enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const Agent = ({  userName }: AgentProps) => {
  const callStatus = CallStatus.FINISHED;
  const isSpeaking = true;
  const messages = [
    "whats your name?",
    "My name is Jhon Doe, nice to meet you!"
  ];
  const lastMessage = messages[messages.length - 1];
  return (
<>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
           <h3>AI Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
<Image
              src="/user-avatar.png"
              alt="user avatar"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>

        </div>
        </div>
         {messages.length > 0 && (
          <div className="transcript-border">
<div className="transcript">
<p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
</div>
          </div>
         )}

        <div className="w-full flex justify-center">
              {callStatus !== "ACTIVE" ? (
                <button className="relative btn-call">
                  <span className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
                    />
                  <span>
 {callStatus === "INACTIVE" || 
         callStatus === "FINISHED" ? "Call" : ". . ." }
                  </span>
               
                </button>

              ) :(
                <button className="btn-disconnect">
                  End
                </button>
              ) }
        </div>
        </>
  )
}

export default Agent

