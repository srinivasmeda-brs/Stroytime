// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useVerifyEmailAPIQuery } from "../store/user/userApiSlice";
// import { Link } from "react-router-dom";

// const EmailVerifyPage = () => {
//   const { verifytoken } = useParams(); // Extract verifytoken from URL params
//   const navigate = useNavigate(); // Navigate hook for redirection
//   const [message, setMessage] = useState(""); // State to store message from the API
//   console.log("hai hello");

//   // Use the verify email API query with the token
//   const { data, isLoading, error } = useVerifyEmailAPIQuery(verifytoken, {
//     skip: !verifytoken, // Only call the API if verifytoken is present
//   });

//   // Debugging: Check what data we are receiving
//   console.log("Data:", data);
//   console.log("Error:", error);

//   useEffect(() => {
//     if (data) {
//       // If we got data from the API, check the status
//       if (data.status === "success") {
//         setMessage(data.message); // Set the success message
//         setTimeout(() => {
//           navigate("/login"); // Redirect to login after 3 seconds
//         }, 3000);
//       } else if (data.status === "error") {
//         setMessage(data.message); // Set error message if response is error
//       }
//     } else if (error) {
//       // If there's an error, show a generic error message
//       setMessage("An error occurred. Please try again later.");
//     }
//   }, [data, error, navigate]); // Re-run the effect when data or error changes

//   return (
//     <div>
//       <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
//         <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
//           <div className="max-w-md text-center mt-7">
//             <div>
//               <figure>
//                 <Link to="/home">
//                   <section className="hero container max-w-screen-lg mx-auto flex justify-center">
//                     <img
//                       className="hidden lg:block h-8 w-auto mr-2"
//                       src="/images/logo.svg"
//                       alt="Workflow"
//                     />
//                   </section>
//                 </Link>
//                 <figcaption className="mb-4">Storytime</figcaption>
//               </figure>
//             </div>
//             {/* Show loading message or actual message based on isLoading */}
//             <p className="text-2xl font-semibold md:text-3xl mb-3">
//               {isLoading ? "Verifying your email..." : message}
//             </p>

//             {/* Link to login page */}
//             <Link
//               className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
//               to="/login"
//             >
//               Login to continue
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default EmailVerifyPage;
