export interface Data {
  secret: string;
  rating: number;
}

const submitCurrentPage = async (data: Data) => {
  // TEMP
  return new Promise((res, rej) =>
    setTimeout(() => (Math.random() > 0.2 ? res(null) : rej(null)), 1000)
  );
};

export default submitCurrentPage;
