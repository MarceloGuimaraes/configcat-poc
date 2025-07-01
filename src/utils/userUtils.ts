'use client';

import { useEffect, useState } from 'react';

/**
 * Hook para gerar e manter um ID de usuário persistente no localStorage.
 * Útil para usuários não autenticados em testes A/B.
 * @returns O ID do usuário persistente
 */
export function usePersistentUserId(): string {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Verifica se estamos no lado do cliente
    if (typeof window !== 'undefined') {
      let storedUserId = localStorage.getItem('ab-test-user-id');
      
      if (!storedUserId) {
        // Gera um novo ID único
        storedUserId = `user-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
        localStorage.setItem('ab-test-user-id', storedUserId);
      }
      
      setUserId(storedUserId);
    }
  }, []);

  return userId;
}

/**
 * Função para gerar um ID de usuário único baseado em informações do dispositivo.
 * Alternativa ao localStorage para casos onde a persistência não é crítica.
 * @returns Um ID único baseado no dispositivo
 */
export function generateDeviceBasedId(): string {
  if (typeof window === 'undefined') {
    return 'server-side-user';
  }

  const navigator = window.navigator;
  const screen = window.screen;
  
  // Combina informações do dispositivo para criar um ID semi-persistente
  const deviceInfo = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
  ].join('|');

  // Cria um hash simples da string
  let hash = 0;
  for (let i = 0; i < deviceInfo.length; i++) {
    const char = deviceInfo.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Converte para 32bit integer
  }

  return `device-${Math.abs(hash).toString(36)}`;
}

