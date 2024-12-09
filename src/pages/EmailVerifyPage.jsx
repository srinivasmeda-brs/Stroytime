import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EmailVerifyPage = () => {
  const [verify, setVerify] = useState(""); // Correctly initialize state
  const { verify_token } = useParams(); // Extract the token from the route parameters
  const url = `https://stroytime-backend.onrender.com/api/users/verifyEmail/${verify_token}`; // Replace the placeholder dynamically

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 200 || response.status === 201) {
          setVerify("Email Verified! Please login.");
        } else {
          setVerify(data.message || "Verification failed. Please try again.");
        }
      } catch (error) {
        setVerify("An error occurred while verifying your email.");
        console.error(error);
      }
    };

    verifyEmail(); // Call the async function
  }, [url]); // Add `url` as a dependency

  return (
    <>
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
                {verify}
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
    </>
  );
};

export default EmailVerifyPage;
