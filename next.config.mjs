/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
       remotePatterns: [
         {
            protocol: 'https',
            hostname: '*',
         }
      ]
    }
};

export default nextConfig;



// This file is used to configure Next.js settings.
// It is a JavaScript file that exports a configuration object.
