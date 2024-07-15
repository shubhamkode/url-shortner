"use client";
import { Url } from "@prisma/client";
import Image from "next/image";
import { useState, useEffect } from "react";
import copyTextToClipboard from "@uiw/copy-to-clipboard";
import { toast } from "react-toastify";
import Link from "next/link";
import { deleteLink } from "@/app/_actions/deleteURL";
import { revalidatePath } from "next/cache";

export default function LinkCard({ url }: { url: Url }) {
  const [textCopied, setTextCopied] = useState(false);
  const [host, setHostName] = useState("");

  useEffect(() => {
    setHostName(window.location.host);
  }, []);

  useEffect(() => {
    setTextCopied(false);

    setTimeout(() => setTextCopied(false), 30000);
  }, [url, setTextCopied]);

  const url_path = `http://${host}/${url.id}`;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm px-4 pr-5 py-2 max-w-lg relative pb-5">
      <button
        className="absolute right-2 top-2 p-2 rounded-full hover:bg-neutral-300 duration-200 ease-in-out disabled:opacity-40 disabled:hover:bg-transparent"
        disabled={textCopied}
        onClick={() => {
          copyTextToClipboard(url_path, (isCopy) => {
            toast.info("Link copied successfully");
            setTextCopied(true);
          });
        }}
      >
        <Image src="/copy-icon.svg" width="15" height="15" alt="copyIcon" />
      </button>

      <div className="flex items-center justify-between mt-3">
        <Link
          href={url_path}
          target="_blank"
          className="text-lg font-semibold text-blue-600 leading-tight duration-200 hover:underline"
        >
          {url_path}
        </Link>

        <p className="bg-slate-800 rounded-full w-8 h-8 text-white flex items-center justify-center px-4 mr-4">
          {url.visits}
        </p>
      </div>
      <div className="flex text-xs space-x-2 mt-1">
        {url.tags.split(",").map((tag, index) => (
          <p key={index}>{tag}</p>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 space-x-2 text-balance">
        <p className="text-ellipsis line-clamp-2 text-sm text-slate-700 opacity-90">
          {url.url}
        </p>
        <button
          className=" bg-red-500 text-white rounded-lg px-4 text-sm py-1.5 shadow"
          onClick={() => {
            if (
              confirm(
                "Are you sure? Selected link will be deleted permanently?",
              )
            ) {
              deleteLink(url.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
