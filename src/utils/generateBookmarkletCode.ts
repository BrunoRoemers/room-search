const generateBookmarkletCode = (secret: string, rating: number) =>
  `javascript:(function(){
    const root = document.createElement("div");
    root.id = "${process.env.NEXT_PUBLIC_BOOKMARKLET_ROOT_ID}";
    root.dataset.secret = '${secret}';
    root.dataset.rating = ${rating};

    const script = document.createElement("script");
    script.src="${process.env.NEXT_PUBLIC_BASE_URL}/bookmarklet.js";
    root.appendChild(script);

    document.getElementById("${process.env.NEXT_PUBLIC_BOOKMARKLET_ROOT_ID}")?.remove();
    document.body.appendChild(root);
  })()`;

export default generateBookmarkletCode;
