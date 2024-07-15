"use client"
import ShortLink from "./ShortLink";

export default function URLField({ id }: { id: string }) {
  
  return (
    <div className="w-full max-w-sm py-2 px-4 flex flex-col mt-20">
      <p className="text-sm">Your link is:</p>

      <ShortLink url={`http://${window.location.host}/${id}`} />

      <p className="text-slate-700/90 text-xs text-center">(Click to copy)</p>
    </div>
  );
}
