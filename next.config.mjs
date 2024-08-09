/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
  experimental: {
    // docs: https://vercel.com/guides/how-can-i-use-files-in-serverless-functions
    outputFileTracingIncludes: {
      "/api/v1/submit": ["./secrets.json"],
    },
  },
};

export default nextConfig;
