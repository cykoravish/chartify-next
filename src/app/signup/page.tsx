import { SignupForm } from "@/components/SignupForm" 
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#4b9ec1]">
            Create your account
          </h2>
        </div>
        <SignupForm />
        <h2 className="text-gray-700">
            Already have account ?{" "}
            <span>
              <Link href="/login" className="text-[#4b9ec1] font-semibold hover:text-[#41b9ec]">Login</Link>
            </span>
          </h2>
      </div>
    </div>
  )
}

