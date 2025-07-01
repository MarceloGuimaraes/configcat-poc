// Tipos para variáveis de ambiente
export interface EnvironmentConfig {
  APP_ENV: 'development' | 'production';
  CONFIGCAT_SDK_KEY: string;
  API_URL: string;
  DEBUG_MODE: boolean;
}

// Função para validar variáveis de ambiente
export function validateEnvironment(): EnvironmentConfig {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
  const sdkKey = process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const debugMode = process.env.NEXT_PUBLIC_DEBUG_MODE;

  // Validações básicas
  if (!appEnv || (appEnv !== 'development' && appEnv !== 'production')) {
    console.warn('NEXT_PUBLIC_APP_ENV deve ser "development" ou "production"');
  }

  if (!sdkKey) {
    console.warn('NEXT_PUBLIC_CONFIGCAT_SDK_KEY não está definida');
  }

  if (!apiUrl) {
    console.warn('NEXT_PUBLIC_API_URL não está definida');
  }

  return {
    APP_ENV: (appEnv as 'development' | 'production') || 'development',
    CONFIGCAT_SDK_KEY: sdkKey || '',
    API_URL: apiUrl || 'http://localhost:3000/api',
    DEBUG_MODE: debugMode === 'true',
  };
}

// Configuração do ambiente atual
export const env = validateEnvironment();

