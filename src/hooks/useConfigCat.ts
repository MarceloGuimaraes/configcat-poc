'use client';

import { useState, useEffect, useCallback } from 'react';
import * as configcat from 'configcat-js';
import {
  configCatClient,
  FeatureFlags,
  DEFAULT_FLAGS,
  getFeatureFlag,
} from '@/lib/configcat';

/**
 * Hook React para consumir uma feature flag específica do ConfigCat de forma reativa.
 * @param flagKey A chave da feature flag a ser consumida.
 * @param userObject (Opcional) Objeto de usuário para segmentação.
 * @returns Um objeto contendo o valor da flag, estado de carregamento, erro e uma função para recarregar.
 */
export function useFeatureFlag<K extends keyof FeatureFlags>(
  flagKey: K,
  userObject?: configcat.User
) {
  const [value, setValue] = useState<FeatureFlags[K]>(DEFAULT_FLAGS[flagKey]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFlag = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const newValue = await getFeatureFlag(flagKey, userObject);
      setValue(newValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar flag.');
      console.error(`Erro ao carregar feature flag ${String(flagKey)}:`, err);
    } finally {
      setLoading(false);
    }
  }, [flagKey, userObject]);

  useEffect(() => {
    loadFlag();

    if (configCatClient) {
      const handleConfigChanged = () => {
        loadFlag();
      };
      configCatClient.on('configChanged', handleConfigChanged);

      return () => {
        if (configCatClient) {
          configCatClient.off('configChanged', handleConfigChanged);
        }
      };
    }
  }, [loadFlag]);

  return {
    value,
    loading,
    error,
    refetch: loadFlag,
  };
}

/**
 * Hook específico para o teste A/B do banner da home.
 * Simplifica o consumo da flag 'ab_test_home_banner'.
 * @param userObject (Opcional) Objeto de usuário para segmentação.
 * @returns Um objeto com a variação ('A' ou 'B'), status de carregamento, erro e funções auxiliares.
 */
export function useABTest(userObject?: configcat.User) {
  const { value: variant, loading, error, refetch } = useFeatureFlag('ab_test_home_banner', userObject);

  return {
    variant,
    isVariantA: variant === 'A',
    isVariantB: variant === 'B',
    loading,
    error,
    refetch,
  };
}


/**
 * Hook específico para o teste A/B do botão promocional.
 * Simplifica o consumo da flag 'ab_test_banner_btn'.
 * @param userObject (Opcional) Objeto de usuário para segmentação.
 * @returns Um objeto com o valor booleano, status de carregamento, erro e funções auxiliares.
 */
export function useBannerButtonTest(userObject?: configcat.User) {
  const { value: isEnabled, loading, error, refetch } = useFeatureFlag('ab_test_banner_btn', userObject);

  return {
    isEnabled,
    isDisabled: !isEnabled,
    loading,
    error,
    refetch,
  };
}

/**
 * Hook específico para a feature flag de recall.
 * Simplifica o consumo da flag 'feature_flag_feature_recall'.
 * @param userObject (Opcional) Objeto de usuário para segmentação.
 * @returns Um objeto com o valor booleano, status de carregamento, erro e funções auxiliares.
 */
export function useFeatureRecall(userObject?: configcat.User) {
  const { value: isEnabled, loading, error, refetch } = useFeatureFlag('feature_flag_feature_recall', userObject);

  return {
    isEnabled,
    isDisabled: !isEnabled,
    loading,
    error,
    refetch,
  };
}

