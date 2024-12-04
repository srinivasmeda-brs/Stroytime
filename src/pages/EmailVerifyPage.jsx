import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVerifyEmailAPIQuery } from "../store/user/userApiSlice"; // Assuming you create an API slice to handle this

const EmailVerifyPage = () => {
  const { verifytoken } = useParams(); // Getting the verify token from the URL
  const navigate = useNavigate(); // For redirection
  const [message, setMessage] = useState(""); // To display messages to the user

  // Make the API call to verify the email using the token
  const { data, isLoading, error } = useVerifyEmailAPIQuery(verifytoken, {
    skip: !verifytoken, // Only call the API if token is available
  });

  useEffect(() => {
    if (data) {
      setMessage(data); // If the response is successful, set the message
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after successful verification
      }, 3000); // Optional: Delay redirect so user can see the success message
    } else if (error) {
      setMessage("An error occurred. Please try again later."); // Handle error messages
    }
  }, [data, error, navigate]);

  return (
    <div>
      <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center mt-7">
            <div>
              <figure>
                <Link to="/home">
                  <section className="hero container max-w-screen-lg mx-auto flex justify-center">
                    <img
                      className="hidden lg:block h-8 w-auto mr-2"
                      src="/images/logo.svg"
                      alt="Workflow"
                    />
                  </section>
                </Link>
                <figcaption className="mb-4">Storytime</figcaption>
              </figure>
            </div>
            <p className="text-2xl font-semibold md:text-3xl mb-3">
              {isLoading ? "Verifying your email..." : message}
            </p>

            <Link
              className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
              to="/login"
            >
              Login to continue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmailVerifyPage;
