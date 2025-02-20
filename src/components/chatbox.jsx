import { RiDeleteBin2Fill } from "react-icons/ri";
import { useState, useEffect } from "react";

export default function Chatbox() {
  return (
    <section className="flex flex-col w-3/4 max-md:w-full items-center py-10 px-6 min-h-full">
      <header className="flex w-full items-center justify-between gap-4 border-b-2">
        <div className="flex items-center gap-4">
          <svg
            className="w-16 h-16"
            role="image"
            xmlns="http://www.w3.org/2000/svg"
            width="1.2rem"
            height="1.2rem"
            viewBox="0 0 24 24"
          >
            <path
              fill="#725DE5"
              d="M17.753 14a2.25 2.25 0 0 1 2.25 2.25v.904A3.75 3.75 0 0 1 18.696 20c-1.565 1.344-3.806 2-6.696 2s-5.128-.656-6.69-2a3.75 3.75 0 0 1-1.306-2.843v-.908A2.25 2.25 0 0 1 6.254 14zM11.9 2.006L12 2a.75.75 0 0 1 .743.648l.007.102l-.001.749h3.5a2.25 2.25 0 0 1 2.25 2.25v4.505a2.25 2.25 0 0 1-2.25 2.25h-8.5a2.25 2.25 0 0 1-2.25-2.25V5.75A2.25 2.25 0 0 1 7.75 3.5l3.5-.001V2.75a.75.75 0 0 1 .649-.743L12 2zM9.749 6.5a1.25 1.25 0 1 0 0 2.498a1.25 1.25 0 0 0 0-2.498m4.493 0a1.25 1.25 0 1 0 0 2.498a1.25 1.25 0 0 0 0-2.498"
            />
          </svg>
          <h1 className="text-2xl font-bold font-JejuMyeongjo pr-0.5">
            LanguoAi
          </h1>
        </div>
        <button
          type="button"
          aria-label="delete all chats"
          className="w-10 h-10 p-2 rounded-full cursor-pointer bg-[#725DE5] border-2 border-solid border-[#f2f2f2] outline-2 outline-offset-0 hover:outline-red-500 focus:outline-red-500 focus:border-[#f2f2f2]  transition-all"
        >
          <RiDeleteBin2Fill className="w-full h-full text-white" />
        </button>
      </header>
      <main className="rounded-[3rem] w-full min-h-[95%] justify-between pt-10 flex flex-col gap-4"></main>
    </section>
  );
}
