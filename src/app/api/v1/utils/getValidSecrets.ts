const getValidSecrets = (): string[] => {
  try {
    return JSON.parse(atob(process.env.API_SECRETS_BASE64!)) as string[];
  } catch (error) {
    console.error(`Error parsing env var API_SECRETS_BASE64: ${error}`);
    return [];
  }
};

export default getValidSecrets;
