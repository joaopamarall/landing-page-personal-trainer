import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',          // Gera site 100% estatico em /out
  images: {
    unoptimized: true,       // Obrigatorio para output: 'export'
  },
  trailingSlash: true,       // Compatibilidade com hospedagens estaticas
};

export default nextConfig;
