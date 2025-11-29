import React from 'react'
import Agent from '@/components/Agent';
const page = () => {
  return (
  <> 
       <h3> AI Interview Generation </h3>
       <Agent userName="you" userId="user1" type="generate" />
  </>
  )
}

export default page



// import Agent from "@/components/Agent";
// import { getCurrentUser } from "@/lib/actions/auth.action";

// const page = async () => {
//   const user = await getCurrentUser();

//   return (
//     <>
//       <h3>Interview Generation</h3>

//       <Agent
//         userName={user?.name!}
//         userId={user?.id}
//         profileImage={user?.profileURL}
//         type="generate"
//       />
//     </>
//   );
// };

// export default page;
