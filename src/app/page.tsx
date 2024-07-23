const generateBookmarklet = (secret: string, rating: number) =>
  encodeURI(
    `javascript:(function(){
      window.ROOM_SEARCH_DATA = {
        secret: '${secret}',
        rating: ${rating},
      };
      const script = document.createElement("script");
      script.src="${process.env.NEXT_PUBLIC_BASE_URL}/bookmarklet.js";
      document.body.appendChild(script);
    })()`
  );

const Home = () => {
  return (
    <div className="h-full flex justify-center items-center bg-black text-lime-400 text-center font-mono pb-20">
      <div className="space-y-14">
        <h1 className="text-3xl">Room Search</h1>
        <ul className="flex gap-x-10 justify-center">
          {[...Array(3)].map((_, i) => (
            <li key={i}>
              <a
                className="underline hover:decoration-wavy text-xl"
                href={generateBookmarklet("TODO", i + 1)}
              >
                {"☆".repeat(i + 1)}
              </a>
            </li>
          ))}
        </ul>
        <ol className="space-y-2">
          <li>Bookmark each of the links above.</li>
          <li>Search for an apartment.</li>
          <li>Click one of the bookmarks.</li>
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
      </div>
    </div>
  );
};

export default Home;
