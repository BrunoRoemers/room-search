export interface Data {
  secret: string;
  rating: number;
}

const submitCurrentPage = async (data: Data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/submit`, {
    method: "POST",
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    const msg = `Failed to submit: ${res.status} ${res.statusText}`;
    console.error(msg, res);
    throw new Error(msg);
  }

  return res;
};

export default submitCurrentPage;
