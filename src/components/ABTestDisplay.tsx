'use client';

import React, { useState } from 'react';
import * as configcat from 'configcat-js';
import { useABTest } from '@/hooks/useConfigCat';
import { createUserObject } from '@/lib/configcat';
import { usePersistentUserId } from '@/utils/userUtils';
import styles from './ABTestDisplay.module.css';

/**
 * Componente que demonstra o teste A/B usando ConfigCat.
 * Exibe diferentes variações baseadas na feature flag 'ab_test_home_banner'.
 */
export default function ABTestDisplay() {
  const userId = usePersistentUserId();
  const [userObject, setUserObject] = useState<configcat.User | undefined>(undefined);

  // Cria o objeto de usuário quando o userId estiver disponível
  React.useEffect(() => {
    if (userId) {
      const user = createUserObject(userId);
      setUserObject(user);
    }
  }, [userId]);

  const { variant, isVariantA, loading, error, refetch } = useABTest(userObject);

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
        <h2 className={styles.title}>Teste A/B - Banner da Home</h2>
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
        <p><strong>Variação Ativa:</strong> <span className={styles.variant}>{variant}</span></p>
      </div>

      {/* Variação A */}
      {isVariantA && (
        <div className={`${styles.banner} ${styles.variantA}`}>
          <div className={styles.bannerContent}>
            <h3 className={styles.bannerTitle}>🎯 Bem-vindo à Versão A!</h3>
            <p className={styles.bannerDescription}>
              Descubra nossos produtos clássicos e confiáveis. 
              Uma experiência testada e aprovada por milhares de usuários.
            </p>
            <div className={styles.bannerActions}>
              <button className={styles.primaryButton}>
                Comprar Agora
              </button>
              <button className={styles.secondaryButton}>
                Saiba Mais
              </button>
            </div>
          </div>
          <div className={styles.bannerImage}>
            <div className={styles.placeholder}>
              📦 Produto Clássico
            </div>
          </div>
        </div>
      )}

      {/* Variação B */}
      {!isVariantA && (
        <div className={`${styles.banner} ${styles.variantB}`}>
          <div className={styles.bannerContent}>
            <h3 className={styles.bannerTitle}>🚀 Explore a Versão B!</h3>
            <p className={styles.bannerDescription}>
              Conheça as últimas inovações e tecnologias de ponta. 
              Seja um dos primeiros a experimentar o futuro!
            </p>
            <div className={styles.bannerActions}>
              <button className={styles.primaryButton}>
                Ver Novidades
              </button>
              <button className={styles.secondaryButton}>
                Pré-venda
              </button>
            </div>
          </div>
          <div className={styles.bannerImage}>
            <div className={styles.placeholder}>
              ⚡ Inovação
            </div>
          </div>
        </div>
      )}

      <div className={styles.explanation}>
        <h4>Como funciona este teste A/B:</h4>
        <ul>
          <li>Cada usuário recebe um ID único persistente</li>
          <li>O ConfigCat usa este ID para determinar a variação (50% A / 50% B)</li>
          <li>A mesma variação é sempre exibida para o mesmo usuário</li>
          <li>Clique em &quot;Novo Usuário&quot; para simular um usuário diferente</li>
        </ul>
      </div>
    </div>
  );
}

