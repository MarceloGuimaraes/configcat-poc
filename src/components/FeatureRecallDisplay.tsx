'use client';

import { useFeatureRecall } from '@/hooks/useConfigCat';
import { createUserObject, forceRefreshFeatureFlags } from '@/lib/configcat';
import { usePersistentUserId } from '@/utils/userUtils';
import * as configcat from 'configcat-js';
import React, { useState } from 'react';
import styles from './FeatureRecallDisplay.module.css';

/**
 * Componente que demonstra uma feature flag de toggle usando ConfigCat.
 * Exibe uma funcionalidade que pode ser habilitada/desabilitada baseada na flag 'feature_flag_feature_recall'.
 */
export default function FeatureRecallDisplay() {
  const userId = usePersistentUserId();
  const [userObject, setUserObject] = useState<configcat.User | undefined>(undefined);

  // Cria o objeto de usuário quando o userId estiver disponível
  React.useEffect(() => {
    if (userId) {
      const user = createUserObject(userId);
      setUserObject(user);
    }
  }, [userId]);

  const { isEnabled, loading, error, refetch } = useFeatureRecall(userObject);

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
          <p>Carregando configuração da feature flag...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>Erro ao carregar feature flag</h3>
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
        <h2 className={styles.title}>Feature Flag - Recall de Produtos</h2>
        <div className={styles.controls}>
          <button
            onClick={async () => {
              await forceRefreshFeatureFlags();
              refetch();
            }}
            className={styles.refreshButton}
          >
            Atualizar
          </button>
          <button onClick={generateNewUser} className={styles.newUserButton}>
            Novo Usuário
          </button>
        </div>
      </div>

      <div className={styles.userInfo}>
        <p>
          <strong>ID do Usuário:</strong> {userId}
        </p>
        <p>
          <strong>Feature Status:</strong>
          <span
            className={`${styles.status} ${
              isEnabled ? styles.statusEnabled : styles.statusDisabled
            }`}
          >
            {isEnabled ? 'Habilitada' : 'Desabilitada'}
          </span>
        </p>
      </div>

      {/* Funcionalidade de Recall */}
      <div className={styles.featureArea}>
        <h3 className={styles.featureTitle}>
          {isEnabled ? '🔔 Sistema de Recall Ativo' : '📦 Catálogo de Produtos'}
        </h3>

        {isEnabled ? (
          // Feature habilitada - Mostra sistema de recall
          <div className={styles.recallSystem}>
            <div className={styles.alertBanner}>
              <div className={styles.alertIcon}>⚠️</div>
              <div className={styles.alertContent}>
                <h4 className={styles.alertTitle}>Aviso Importante de Recall</h4>
                <p className={styles.alertText}>
                  Alguns produtos foram identificados com problemas de qualidade. Verifique se você
                  possui algum dos itens listados abaixo.
                </p>
              </div>
            </div>

            <div className={styles.recallList}>
              <h5 className={styles.listTitle}>Produtos Afetados pelo Recall:</h5>
              <div className={styles.productGrid}>
                <div className={styles.recallProduct}>
                  <div className={styles.productImage}>📱</div>
                  <div className={styles.productInfo}>
                    <h6 className={styles.productName}>Smartphone XYZ-123</h6>
                    <p className={styles.productIssue}>Problema: Superaquecimento da bateria</p>
                    <p className={styles.productAction}>Ação: Pare de usar imediatamente</p>
                  </div>
                  <button className={styles.recallButton}>Solicitar Troca</button>
                </div>

                <div className={styles.recallProduct}>
                  <div className={styles.productImage}>🎧</div>
                  <div className={styles.productInfo}>
                    <h6 className={styles.productName}>Fones ABC-456</h6>
                    <p className={styles.productIssue}>Problema: Falha no isolamento elétrico</p>
                    <p className={styles.productAction}>Ação: Retornar para análise</p>
                  </div>
                  <button className={styles.recallButton}>Solicitar Troca</button>
                </div>
              </div>
            </div>

            <div className={styles.contactInfo}>
              <h5 className={styles.contactTitle}>Precisa de Ajuda?</h5>
              <p className={styles.contactText}>
                Entre em contato conosco pelo telefone <strong>0800-123-4567</strong>
                ou email <strong>recall@empresa.com</strong>
              </p>
            </div>
          </div>
        ) : (
          // Feature desabilitada - Mostra catálogo normal
          <div className={styles.normalCatalog}>
            <p className={styles.catalogDescription}>
              Explore nossa linha completa de produtos com qualidade garantida.
            </p>

            <div className={styles.productGrid}>
              <div className={styles.normalProduct}>
                <div className={styles.productImage}>📱</div>
                <div className={styles.productInfo}>
                  <h6 className={styles.productName}>Smartphone XYZ-123</h6>
                  <p className={styles.productPrice}>R$ 1.299,00</p>
                  <p className={styles.productDescription}>Tecnologia avançada e design moderno</p>
                </div>
                <button className={styles.buyButton}>Comprar Agora</button>
              </div>

              <div className={styles.normalProduct}>
                <div className={styles.productImage}>🎧</div>
                <div className={styles.productInfo}>
                  <h6 className={styles.productName}>Fones ABC-456</h6>
                  <p className={styles.productPrice}>R$ 299,00</p>
                  <p className={styles.productDescription}>Som cristalino e conforto superior</p>
                </div>
                <button className={styles.buyButton}>Comprar Agora</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.explanation}>
        <h4>Como funciona esta feature flag:</h4>
        <ul>
          <li>A flag `feature_flag_feature_recall` é do tipo booleana (true/false)</li>
          <li>Quando habilitada (true): Exibe sistema de recall com avisos importantes</li>
          <li>Quando desabilitada (false): Exibe catálogo normal de produtos</li>
          <li>Permite ativar/desativar funcionalidades críticas instantaneamente</li>
          <li>Ideal para situações de emergência ou lançamentos graduais</li>
        </ul>
      </div>
    </div>
  );
}
