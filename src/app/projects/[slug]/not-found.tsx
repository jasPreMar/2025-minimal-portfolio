import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Project Not Found</h2>
      <p className="text-base">
        The project you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/"
        className="text-base underline underline-offset-2 hover:opacity-70 transition-opacity"
      >
        Return home
      </Link>
    </div>
  );
}


