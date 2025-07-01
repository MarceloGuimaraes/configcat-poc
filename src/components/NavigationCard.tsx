'use client';

import Link from 'next/link';
import styles from './NavigationCard.module.css';

interface NavigationCardProps {
  title: string;
  description: string;
  flagName: string;
  flagType: string;
  href: string;
  icon: string;
  color: 'blue' | 'green' | 'purple';
}

/**
 * Componente de cartão de navegação para demonstrar diferentes feature flags.
 */
export default function NavigationCard({
  title,
  description,
  flagName,
  flagType,
  href,
  icon,
  color
}: NavigationCardProps) {
  return (
    <Link href={href} className={`${styles.card} ${styles[color]}`}>
      <div className={styles.cardContent}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>{icon}</span>
        </div>
        
        <div className={styles.textContent}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          
          <div className={styles.flagInfo}>
            <div className={styles.flagDetail}>
              <span className={styles.flagLabel}>Flag:</span>
              <code className={styles.flagName}>{flagName}</code>
            </div>
            <div className={styles.flagDetail}>
              <span className={styles.flagLabel}>Tipo:</span>
              <span className={styles.flagType}>{flagType}</span>
            </div>
          </div>
        </div>
        
        <div className={styles.arrow}>
          →
        </div>
      </div>
    </Link>
  );
}

