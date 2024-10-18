import { APP_NAME } from "@/lib/constants";

export default function Header() {
  return (
    <div className="flex flex-col items-center gap-16 border-4 border-black p-8 bg-white shadow-neo-brutal">
      <h1 className="sr-only">{APP_NAME}</h1>
      <h1 className="mx-auto max-w-xl text-center text-5xl lg:text-6xl font-extrabold text-black">
        The fastest way to GTD with{" "}
        <span className="inline-block font-extrabold text-black underline-offset-4 underline">
          {APP_NAME}
        </span>
      </h1>
      {/* Animated line */}
      <div className="my-8 w-full bg-black h-2 animate-grow" />
    </div>
  );
}
