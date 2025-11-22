export const LoadingBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 overflow-hidden bg-gray-200">
      <div className="absolute top-0 left-0 h-full bg-blue-500 origin-left animate-indeterminate-progress-css w-full" />
    </div>
  );
};

export const Loading = ({ text = "Loading ..." }: { text?: string }) => {
  return (
    <div className="flex items-center justify-center mx-auto max-w-sm mt-16 p-4">
      <h2 className="text-center md:text-3xl text-2xl">{text}</h2>
      <LoadingBar/>
    </div>
  );
};
