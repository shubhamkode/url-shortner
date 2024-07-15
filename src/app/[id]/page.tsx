import Link from "next/link";
import { searchURL } from "../_actions/searchURL";
import { redirect } from "next/navigation";
export default async function LinkDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const urlDetails = await searchURL(id);

  if (urlDetails) {
    redirect(urlDetails.url);
  }

  return (
    <div className="min-h-screen w-screen flex items-center flex-col bg-gradient-to-b from-neutral-50 via-neutral-100 to bg-neutral-300 gap-y-10 px-8 pt-28">
      <div className="">
        <Link href="/" className="text-3xl font-semibold  tracking-wider">
          Linkify
        </Link>
        <p className="text-sm">Best URL shortener</p>
      </div>
      <div className="text-center pt-5">
        <p className="text-xl font-semibold text-red-500">
          Sorry, URL not found or expired
        </p>
        <div className="mt-2">
          <Link
            href="/"
            className="text-sm text-center underline underline-offset-4"
          >
            Linkify another URL
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
}
