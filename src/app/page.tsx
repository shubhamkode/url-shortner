"use client";

import URLField from "@/components/UrlField";
import { createURL } from "./_actions/createURL";
import { useState } from "react";

import Link from "next/link";

export default function HomePage() {
  const [id, setId] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen w-screen flex items-center flex-col bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-300 gap-y-10 px-8 pt-28">
      <div className="max-w-md w-full flex items-center justify-end px-4 ">
        <Link href="/search" className="text-base group">
          Search{" "}
          <span className="opacity-0 group-hover:opacity-100 duration-200">
            &#x2192;
          </span>
        </Link>
      </div>
      <div className="-mt-5">
        <Link href="/" className="text-3xl font-semibold  tracking-wider">
          Linkify
        </Link>

        <p className="text-sm">Best URL shortener</p>
      </div>

      <form
        action={(e) =>
          createURL(e).then((data) => {
            setId(data);
          })
        }
        className="w-full max-w-lg "
      >
        <div className="">
          <label htmlFor="baseUrl" className="text-sm text-slate-500/90">
            RawURL
          </label>
          <textarea
            className="w-full bg-white py-2.5 rounded-md px-4 shadow-lg mt-1"
            placeholder="Enter your URL"
            id="baseUrl"
            name="baseUrl"
            required
            rows={1}
          />
        </div>

        <div className="mt-2">
          <label htmlFor="tags" className="text-sm text-slate-500/90">
            Tags
          </label>
          <input
            type="text"
            placeholder="Work,Home"
            id="tags"
            name="tags"
            className="w-full bg-white py-2.5 rounded-md px-4 shadow-lg mt-1 "
          />
        </div>

        <button
          className="w-full py-3 rounded-md font-medium bg-slate-800 text-white text-sm shadow mt-6"
          type="submit"
        >
          Shorten your URL
        </button>
      </form>
      {id != undefined && <URLField id={id} />}
    </div>
  );
}
