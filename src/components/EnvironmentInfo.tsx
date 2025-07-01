'use client';

import { env } from '@/lib/env';
import styles from './EnvironmentInfo.module.css';

/**
 * Componente que exibe informações sobre o ambiente atual da aplicação.
 * Mostra se está em desenvolvimento ou produção, junto com outras configurações relevantes.
 */
export default function EnvironmentInfo() {
  const isDevelopment = env.APP_ENV === 'development';
  const isProduction = env.APP_ENV === 'production';

  return (
    <div className={`${styles.container} ${isDevelopment ? styles.development : styles.production}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Informações do Ambiente</h2>
        <span className={`${styles.badge} ${isDevelopment ? styles.devBadge : styles.prodBadge}`}>
          {env.APP_ENV.toUpperCase()}
        </span>
      </div>
      
      <div className={styles.content}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Ambiente:</span>
            <span className={styles.value}>
              {isDevelopment ? 'Desenvolvimento' : 'Produção'}
            </span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.label}>Debug Mode:</span>
            <span className={styles.value}>
              {env.DEBUG_MODE ? 'Ativado' : 'Desativado'}
            </span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.label}>ConfigCat SDK:</span>
            <span className={styles.value}>
              {env.CONFIGCAT_SDK_KEY ? 'Configurado' : 'Não configurado'}
            </span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.label}>API URL:</span>
            <span className={styles.value}>{env.API_URL}</span>
          </div>
        </div>
        
        {isDevelopment && (
          <div className={styles.devNote}>
            <p>
              <strong>Modo de Desenvolvimento:</strong> Logs detalhados estão ativados e 
              algumas validações são mais flexíveis para facilitar o desenvolvimento.
            </p>
          </div>
        )}
        
        {isProduction && (
          <div className={styles.prodNote}>
            <p>
              <strong>Modo de Produção:</strong> Aplicação otimizada para performance 
              com logs mínimos e validações rigorosas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

