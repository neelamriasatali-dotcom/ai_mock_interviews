
"use client";

import { useState } from "react";
import Agent from "@/components/Agent";

const Page = () => {
  const [role, setRole] = useState<
    "Frontend Developer" | "Backend Developer" | "FullStack Developer" | "AI / ML Engineer" | "Python Developer" | "DevOps Engineer" | "Mobile Developer"
     | "Data Analyst" | "Cyber Security" 
  >("Frontend Developer");

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-10">
      <h2 className="text-xl font-bold">Interview ({role})</h2>

      {/* 🔘 Role Buttons */}
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded ${
            role === "Frontend Developer"
              ? "bg-purple-500 text-white"
              : "bg-gray-600 text-white"
          }`}
          onClick={() => setRole("Frontend Developer")}
        >
          Frontend Developer
        </button>

        <button
          className={`px-4 py-2 rounded ${
            role === "Backend Developer"
              ? "bg-purple-500 text-white"
              : "bg-gray-600 text-white"
          }`}
          onClick={() => setRole("Backend Developer")}
        >
          Backend Developer
        </button>

         <button
          className={`px-4 py-2 rounded ${
            role === "FullStack Developer"
              ? "bg-purple-500 text-white"
              : "bg-gray-600 text-white"
          }`}
          onClick={() => setRole("FullStack Developer")}
        >
          FullStack Developer
        </button>

         <button
          className={`px-4 py-2 rounded ${
            role === "AI / ML Engineer"
              ? "bg-purple-500 text-white"
              : "bg-gray-600 text-white"
          }`}
          onClick={() => setRole("AI / ML Engineer")}
        >
          AI / ML Engineer
        </button>

         <button
          className={`px-4 py-2 rounded ${
            role === "Python Developer"
              ? "bg-purple-500 text-white"
              : "bg-gray-600 text-white"
          }`}
          onClick={() => setRole("Python Developer")}
        >
          Python Developer
        </button>
         
         <button
          className={`px-4 py-2 rounded ${
            role === "DevOps Engineer"
              ? "bg-purple-500 text-white"
              : "bg-gray-600 text-white"
          }`}
          onClick={() => setRole("DevOps Engineer")}
        >
          DevOps Engineer
        </button>

         <button
          className={`px-4 py-2 rounded ${
            role === "Mobile Developer"
              ? "bg-purple-500 text-white"
              : "bg-gray-600 text-white"
          }`}
          onClick={() => setRole("Mobile Developer")}
        >
          Mobile Developer
        </button>

         <button
          className={`px-4 py-2 rounded ${
            role === "Data Analyst"
              ? "bg-purple-500 text-white"
              : "bg-gray-600 text-white"
          }`}
          onClick={() => setRole("Data Analyst")}
        >
          Data Analyst
        </button>

         <button
          className={`px-4 py-2 rounded ${
            role === "Cyber Security"
              ? "bg-purple-500 text-white"
              : "bg-gray-600 text-white"
          }`}
          onClick={() => setRole("Cyber Security")}
        >
          Cyber Security
        </button>
      </div>

      {/* ✅ Agent */}
      <Agent
        userName="You"
        userId="user1" // (baad me dynamic kar sakti ho)
        type="generate"
        role={role}
      />
    </div>
  );
};

export default Page;