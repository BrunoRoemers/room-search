import type { ApiSubmitInput } from "@/models/api-submit-input";
import type { ScriptInput } from "@/models/script-input";

const submitCurrentPage = async (scriptInput: ScriptInput) => {
  const apiSubmitInput: ApiSubmitInput = {
    ...scriptInput,
    url: window.location.href,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/submit`, {
    method: "POST",
    body: JSON.stringify(apiSubmitInput),
  });

  if (!res.ok) {
    const msg = `Failed to submit: ${res.status} ${res.statusText}`;
    console.error(msg, res);
    throw new Error(msg);
  }

  return res;
};

export default submitCurrentPage;
