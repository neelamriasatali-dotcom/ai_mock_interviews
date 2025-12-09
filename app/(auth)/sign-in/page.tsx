// import React from 'react'
// import AuthForm from '@/components/AuthForm';   
// const page = () => {
  
// return <AuthForm type="sign-in"/>
  
// }

// export default page




import React from "react";
import AuthForm from "@/components/AuthForm";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-black">
      <AuthForm type ="sign-in" />
    </div>
  );
};

export default SignInPage;
