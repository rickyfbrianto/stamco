import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: 'cdn.sanity.io',
        }]
    },
    output: "standalone"
};

export default nextConfig;
