interface Props {
  label: string;
  code: string;
}

const Bookmarklet = ({ label, code }: Props) => {
  const html = `<a
      class="underline hover:decoration-wavy text-xl"
      href="${encodeURI(code)}"
    >${label}</a>`;

  return <span dangerouslySetInnerHTML={{ __html: html }}></span>;
};

export default Bookmarklet;
