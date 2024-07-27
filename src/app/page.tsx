"use client";

import { useState, type KeyboardEvent } from "react";
import Bookmarklet from "./components/bookmarklet";
import generateBookmarkletCode from "./utils/generateBookmarkletCode";

const Home = () => {
  const [secret, setSecret] = useState<string | null>(null);

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSecret(event.currentTarget.value);
    }
  };

  return (
    <div className="space-y-14">
      <h1 className="text-3xl">Room Search</h1>
      {secret === null ? (
        <input
          autoFocus={true}
          type="password"
          className="bg-transparent w-[7.2rem]"
          placeholder="enter secret"
          onKeyUp={handleKeyUp}
        />
      ) : (
        <>
          <ul className="flex gap-x-10 justify-center">
            {[...Array(3)].map((_, i) => (
              <li key={i}>
                <Bookmarklet
                  label={"☆".repeat(i + 1)}
                  code={generateBookmarkletCode(secret, i + 1)}
                />
              </li>
            ))}
          </ul>
          <ol className="space-y-2">
            <li>Bookmark each of the links above.</li>
            <li>Search for an apartment.</li>
            <li>Click on one of the bookmarks.</li>
            <li>Watch the top-right corner.</li>
            <li>
              Check out this{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_SHEET_ID}/edit?gid=${process.env.NEXT_PUBLIC_SHEET_GID}`}
                className="underline hover:decoration-wavy"
              >
                Google Sheet
              </a>
              .
            </li>
          </ol>
        </>
      )}
    </div>
  );
};

export default Home;
