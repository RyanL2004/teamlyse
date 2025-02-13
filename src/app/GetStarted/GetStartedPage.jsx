import GetStartedForm from "../../components/GetStartedForm";
import { GalleryVerticalEnd } from "lucide-react";
import { Link } from "react-router-dom";

export default function GetStartedPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      
      {/* 🔹 Left Side: Background Image */}
      <div className="relative hidden lg:block bg-muted">
        <img
          src="/assets/react.svg"  // Replace with your actual image
          alt="Welcome to TeamLyse"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      {/* 🔹 Right Side: Registration Form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            TΞAMLYSE
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <GetStartedForm />
          </div>
        </div>
      </div>

    </div>
  );
}
