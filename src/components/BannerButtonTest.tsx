'use client';

import React, { useState } from 'react';
import * as configcat from 'configcat-js';
import { useBannerButtonTest } from '@/hooks/useConfigCat';
import { createUserObject } from '@/lib/configcat';
import { usePersistentUserId } from '@/utils/userUtils';
import styles from './BannerButtonTest.module.css';

/**
 * Componente que demonstra o teste A/B booleano usando ConfigCat.
 * Exibe diferentes variações de botão baseadas na feature flag 'ab_test_banner_btn'.
 */
export default function BannerButtonTest() {
  const userId = usePersistentUserId();
  const [userObject, setUserObject] = useState<configcat.User | undefined>(undefined);

  // Cria o objeto de usuário quando o userId estiver disponível
  React.useEffect(() => {
    if (userId) {
      const user = createUserObject(userId);
      setUserObject(user);
    }
  }, [userId]);

  const { isEnabled, loading, error, refetch } = useBannerButtonTest(userObject);

  const generateNewUser = () => {
    if (typeof window !== 'undefined') {
      // Remove o ID atual do localStorage
      localStorage.removeItem('ab-test-user-id');
      // Recarrega a página para gerar um novo ID
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Carregando configuração do teste A/B...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>Erro ao carregar teste A/B</h3>
          <p>{error}</p>
          <button onClick={refetch} className={styles.retryButton}>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Teste A/B - Botão Promocional</h2>
        <div className={styles.controls}>
          <button onClick={refetch} className={styles.refreshButton}>
            Atualizar
          </button>
          <button onClick={generateNewUser} className={styles.newUserButton}>
            Novo Usuário
          </button>
        </div>
      </div>

      <div className={styles.userInfo}>
        <p><strong>ID do Usuário:</strong> {userId}</p>
        <p><strong>Variação Ativa:</strong> 
          <span className={`${styles.variant} ${isEnabled ? styles.variantEnabled : styles.variantDisabled}`}>
            {isEnabled ? 'Habilitado' : 'Desabilitado'}
          </span>
        </p>
      </div>

      {/* Área de demonstração do teste */}
      <div className={styles.demoArea}>
        <h3 className={styles.demoTitle}>Área de Demonstração</h3>
        <p className={styles.demoDescription}>
          Este é um exemplo de como o botão promocional aparece para diferentes usuários:
        </p>

        {/* Variação Habilitada */}
        {isEnabled && (
          <div className={`${styles.promotion} ${styles.promotionEnabled}`}>
            <div className={styles.promotionContent}>
              <h4 className={styles.promotionTitle}>🎉 Oferta Especial Ativa!</h4>
              <p className={styles.promotionText}>
                Aproveite 50% de desconto em todos os produtos premium. 
                Oferta válida apenas para usuários selecionados!
              </p>
              <button className={styles.promotionButton}>
                🔥 Aproveitar Oferta Agora
              </button>
            </div>
            <div className={styles.promotionBadge}>
              EXCLUSIVO
            </div>
          </div>
        )}

        {/* Variação Desabilitada */}
        {!isEnabled && (
          <div className={`${styles.promotion} ${styles.promotionDisabled}`}>
            <div className={styles.promotionContent}>
              <h4 className={styles.promotionTitle}>📦 Produtos Premium</h4>
              <p className={styles.promotionText}>
                Explore nossa linha completa de produtos premium. 
                Qualidade garantida e entrega rápida.
              </p>
              <button className={styles.standardButton}>
                Ver Produtos
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.explanation}>
        <h4>Como funciona este teste A/B booleano:</h4>
        <ul>
          <li>A flag `ab_test_banner_btn` é do tipo booleana (true/false)</li>
          <li>50% dos usuários veem a versão promocional (true)</li>
          <li>50% dos usuários veem a versão padrão (false)</li>
          <li>A segmentação é baseada no `user.identifier`</li>
          <li>Clique em &quot;Novo Usuário&quot; para testar diferentes variações</li>
        </ul>
      </div>
    </div>
  );
}

