import * as React from "react";
import { SignInForm } from "../Components/Signinform";
import { Loader2 } from "lucide-react"; // You can install lucide-react or replace with any loader

export default function SignIn() {
  const [loading, setLoading] = React.useState(true);

  // Simulate loading effect (e.g., fetching something or initial animation)
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full bg-slate-50 min-h-screen px-4">
      {/* {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="animate-spin text-primary w-8 h-8" />
        </div>
      ) : ( */}
        <div className="flex flex-col items-center w-full max-w-[1440px]">
          <section className="flex flex-col items-center mt-12 text-center max-w-xl px-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-gray-900">
              Sign in to your account
            </h1>
          </section>

          <section className="p-6 sm:p-8 mt-6 w-full bg-white rounded-3xl shadow-md max-w-md">
            <SignInForm />
          </section>
        </div>
      {/* )} */}
    </main>
  );
}
