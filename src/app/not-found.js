import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-3/4 lg:w-2/4 flex flex-col items-center gap-4 text-center">
        <h2 className="text-orange-500 font-light text-8xl">404</h2>
        <p className="text-neutral-700  text-4xl">OOPS! NOTHING WAS FOUND</p>
        <p className="text-neutral-500">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
          <Link href="/" className="ml-2 text-orange-400 hover:text-orange-500 font-normal underline decoration-dashed underline-offset-8">
            Return to Home page
          </Link>
        </p>
      </div>
    </div>
  );
}
