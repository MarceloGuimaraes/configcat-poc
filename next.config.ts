import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_CONFIGCAT_SDK_KEY: process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE,
  },
  // Configurações adicionais para otimização
  experimental: {
    optimizePackageImports: ['configcat-js'],
  },
  // Configurações de build
  typescript: {
    // Permite que o build continue mesmo com erros de TypeScript em desenvolvimento
    ignoreBuildErrors: process.env.NEXT_PUBLIC_APP_ENV === 'development',
  },
  eslint: {
    // Permite que o build continue mesmo com warnings do ESLint em desenvolvimento
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_APP_ENV === 'development',
  },
};

export default nextConfig;

