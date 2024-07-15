import LinkCard from "@/components/LinkCard";
import { searchURLByText } from "../_actions/searchURL";
import { redirect } from "next/navigation";
import { Url } from "@prisma/client";
import Link from "next/link";

export default async function SearchPage({
  searchParams: { q },
}: {
  searchParams: { q: string | undefined };
}) {
  let urls: Url[] = [];

  if (q) {
    urls = await searchURLByText(q);
  }

  return (
    <div className="min-h-screen w-screen flex items-center flex-col bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-300 gap-y-10 px-8 pt-28 pb-20">
      <div className="">
        <Link href="/" className="text-3xl font-semibold  tracking-wider">
          Linkify
        </Link>
        <p className="text-sm">Best URL shortener</p>
      </div>

      <form
        action={async (e) => {
          "use server";
          redirect(
            `/search?${new URLSearchParams({
              q: e.get("query") as string,
            }).toString()}`
          );
        }}
        className="w-full flex items-center justify-center gap-x-4"
      >
        <input
          type="text"
          defaultValue={q}
          name="query"
          required
          className="max-w-md w-full bg-white shadow-lg rounded py-2.5 px-4"
          placeholder="Enter your search text"
        />
        <button
          type="submit"
          className="w-32 py-2.5 bg-slate-800 rounded text-white shadow-lg"
        >
          Search
        </button>
      </form>

      {q !== undefined ? (
        urls?.length !== 0 ? (
          <div className="w-full  flex flex-col items-center py-4 gap-y-4">
            {urls?.map((url) => (
              <LinkCard url={url} key={url.id} />
            ))}
          </div>
        ) : (
          <div className="w-full text-center mt-20">
            <p className="text-lg tracking-wider italic">
              <strong>Sorry!</strong>{" "}
              <span className="text-sm">No Urls Found...</span>
            </p>
          </div>
        )
      ) : null}
    </div>
  );
}
