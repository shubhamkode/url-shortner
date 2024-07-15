"use client";
import copyTextToClipboard from "@uiw/copy-to-clipboard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ShortLink({ url }: { url: string }) {
  const [textCopied, setTextCopied] = useState(false);

  useEffect(() => {
    setTextCopied(false);

    setTimeout(() => setTextCopied(false), 10000);
  }, [url, setTextCopied]);

  return (
    <p
      className={`text-indigo-500 mt-1 text-center text-xl cursor-pointer duration-200 hover:underline ${
        textCopied && "opacity-50 hover:no-underline"
      }`}
      onClick={() => {
        if (!textCopied) {
          copyTextToClipboard(url, (isCopy) => {
            toast.success("Link copied successfully");
            setTextCopied(true);
          });
        }
      }}
    >
      {url}
    </p>
  );
}
