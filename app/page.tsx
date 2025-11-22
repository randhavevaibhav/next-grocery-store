import { AuthContainer } from "@/features/auth/components/auth-container";

export default function Home() {
  return (
    <section
      className="bg-cover dark:bg-gray-900 relative"
      style={{
        // Define the background image using an inline style object
        backgroundImage: `url('/images/hero_banner.webp')`,
      }}
    >
      <div className="py-8 px-4 mx-auto max-w-7xl text-center lg:py-16 lg:px-12">
        <a
          href="#"
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          role="alert"
        >
          <span className="text-xs bg-primary-600 rounded-full px-4 py-1.5 mr-3">
            New
          </span>{" "}
          <span className="text-sm font-medium">Launching new outlet !</span>
          <svg
            className="ml-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
        <h1 className="mb-1 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white">
          Farm fresh flavor, delivered daily.
        </h1>
        <p className="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          We focus on sourcing the highest quality produce and delivering it at
          peak freshness.
        </p>
        <AuthContainer />
      </div>
    </section>
  );
}
