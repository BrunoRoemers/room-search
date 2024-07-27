import type { Data } from "@/shared/data";

const submitCurrentPage = async (data: Data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/submit`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = `Failed to submit: ${res.status} ${res.statusText}`;
    console.error(msg, res);
    throw new Error(msg);
  }

  return res;
};

export default submitCurrentPage;
