import { Button } from "@/components/ui/button";

export function PageNavigator() {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl px-4 py-3 bg-white rounded-lg shadow-md dark:bg-gray-900">
      <Button
        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        size="icon"
        variant="outline"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </Button>
      <div className="flex items-center space-x-2">
        <Button
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          size="sm"
          variant="ghost"
        >
          Chat 1
        </Button>
      </div>
      <Button
        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        size="icon"
        variant="outline"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
