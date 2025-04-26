

"use client";
import * as React from "react";
import SignUpForm from "../Components/Signupform";
import { Loader2 } from "lucide-react"; // You can use any spinner

export default function SignUp() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full bg-slate-50 min-h-screen px-4">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="animate-spin text-primary w-8 h-8" />
        </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-[1440px]">
          <section className="flex flex-col items-center mt-12 text-center max-w-xl px-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-gray-900">
              Sign up for a new account
            </h1>
          </section>

          <section className="p-6 sm:p-8 mt-6 w-full bg-white rounded-3xl shadow-md max-w-md">
            <SignUpForm />
          </section>
        </div>
      )}
    </main>
  );
}
