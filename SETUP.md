# Guia de Configuração do ConfigCat

Este guia detalha o processo completo de configuração do ConfigCat para o projeto de testes A/B, incluindo a criação da feature flag, configuração do Percentage Rollout e integração com a aplicação.

## 📋 Pré-requisitos

- Conta no ConfigCat (gratuita disponível em [https://app.configcat.com/](https://app.configcat.com/))
- Projeto Next.js configurado (veja README.md)

## 🏗️ Configuração Inicial no ConfigCat

### 1. Criando um Novo Projeto

1. Faça login no painel do ConfigCat
2. Clique em "Create Product" (se for seu primeiro projeto)
3. Defina um nome para o produto (ex: "A/B Testing Demo")
4. Crie um novo Config (ex: "Main Config")

### 2. Configurando Ambientes

O ConfigCat cria automaticamente dois ambientes:
- **Test** - Para desenvolvimento
- **Production** - Para produção

Você pode adicionar mais ambientes se necessário.

## 🚩 Criando a Feature Flag

### 1. Adicionar Nova Feature Flag

1. No painel principal, clique em "Add Feature Flag"
2. Configure os seguintes campos:

**Informações Básicas:**
- **Key:** `ab_test_home_banner`
- **Name:** `A/B Test Home Banner`
- **Description:** `Feature flag para teste A/B do banner da página inicial`

**Configurações da Flag:**
- **Type:** `Text` (permite valores como 'A' e 'B')
- **Default Value:** `A` (valor de fallback)

3. Clique em "Add Feature Flag" para criar

### 2. Configurando Valores por Ambiente

**Ambiente Test (Desenvolvimento):**
1. Selecione o ambiente "Test"
2. Mantenha o valor padrão como `A`

**Ambiente Production:**
1. Selecione o ambiente "Production"  
2. Mantenha o valor padrão como `A`

## ⚖️ Configurando Percentage Rollout

### 1. Acessando as Regras de Targeting

1. Clique na feature flag `ab_test_home_banner`
2. Selecione o ambiente desejado (Test ou Production)
3. Na seção "Targeting", clique em "Add targeting rule"

### 2. Configurando a Regra de Percentage

1. **Tipo de Regra:** Selecione "Percentage rollout"
2. **Configuração das Porcentagens:**
   - Primeira fatia: `50%` → Valor: `A`
   - Segunda fatia: `50%` → Valor: `B`
3. **Atributo de Segmentação:** O ConfigCat usa automaticamente o `User.Identifier`

### 3. Validando a Configuração

Após salvar, você deve ver:
- ✅ Percentage rollout ativo
- ✅ 50% para variação A
- ✅ 50% para variação B
- ✅ Total: 100%

## 🔑 Obtendo as Chaves SDK

### 1. Acessando as SDK Keys

1. No menu lateral, clique em "SDK Keys"
2. Você verá as chaves para cada ambiente

### 2. Copiando as Chaves

**Para Desenvolvimento (.env.local):**
```env
NEXT_PUBLIC_CONFIGCAT_SDK_KEY=configcat-sdk-1/PKDVCLf-Hq-h-kCzMp-L7Q/PaDVCLf-Hq-h-kCzMp-L7Q
```

**Para Produção (.env.production.local):**
```env
NEXT_PUBLIC_CONFIGCAT_SDK_KEY=configcat-sdk-1/PKDVCLf-Hq-h-kCzMp-L7Q/PaDVCLf-Hq-h-kCzMp-L7Q
```

> ⚠️ **Importante:** Use chaves diferentes para cada ambiente!

## 🔧 Configuração Avançada

### 1. Regras de Targeting Condicionais

Para targeting mais específico, você pode adicionar condições:

1. Clique em "Add condition" antes do Percentage rollout
2. Exemplos de condições:
   - `User.Country` equals `Brazil`
   - `User.Email` contains `@empresa.com`
   - `Custom.plan` equals `premium`

### 2. Configuração de Polling

No código da aplicação (`src/lib/configcat.ts`):

```typescript
const configCatClient = configcat.getClient(
  env.CONFIGCAT_SDK_KEY,
  configcat.PollingMode.AutoPoll,
  {
    pollIntervalSeconds: 30,    // Verifica atualizações a cada 30s
    requestTimeoutMs: 3000,     // Timeout de 3s
    logger: configcat.createConsoleLogger(
      env.DEBUG_MODE 
        ? configcat.LogLevel.Info 
        : configcat.LogLevel.Warn
    ),
  }
);
```

### 3. Configuração de Cache

Para otimizar performance:

```typescript
{
  pollIntervalSeconds: 60,      // Menos frequente em produção
  cacheTimeToLiveSeconds: 300,  // Cache por 5 minutos
  requestTimeoutMs: 5000,       // Timeout maior em produção
}
```

## 🧪 Testando a Configuração

### 1. Teste Manual no Painel

1. No painel do ConfigCat, use o "Flag Evaluator"
2. Insira diferentes valores para `User.Identifier`
3. Verifique se a distribuição está aproximadamente 50/50

### 2. Teste na Aplicação

1. Execute a aplicação localmente
2. Observe qual variação é exibida
3. Clique em "Novo Usuário" várias vezes
4. Confirme a distribuição 50/50

### 3. Validação de Consistência

```typescript
// Teste com o mesmo user ID
const userId = "test-user-123";
const userObject = createUserObject(userId);
const variant = await getFeatureFlag('ab_test_home_banner', userObject);
console.log(`Usuário ${userId} sempre vê: ${variant}`);
```

## 📊 Monitoramento e Analytics

### 1. Dashboard do ConfigCat

O painel mostra:
- Número de avaliações da flag
- Distribuição entre variações
- Histórico de mudanças
- Logs de erro

### 2. Métricas Personalizadas

Integre com seu sistema de analytics:

```typescript
// Exemplo com Google Analytics
gtag('event', 'ab_test_view', {
  test_name: 'home_banner',
  variant: variant,
  user_id: userId
});

// Exemplo com Mixpanel
mixpanel.track('A/B Test View', {
  test_name: 'home_banner',
  variant: variant,
  user_id: userId
});
```

## 🚨 Troubleshooting

### Problemas Comuns

**1. Feature flag sempre retorna valor padrão:**
- ✅ Verifique se a chave SDK está correta
- ✅ Confirme que a flag existe no ambiente correto
- ✅ Verifique conectividade com ConfigCat

**2. Percentage rollout não funciona:**
- ✅ Confirme que o User.Identifier está sendo enviado
- ✅ Verifique se a regra de targeting está ativa
- ✅ Teste com diferentes user IDs

**3. Variação inconsistente:**
- ✅ Verifique se o user ID é persistente
- ✅ Confirme que não há múltiplas regras conflitantes
- ✅ Teste em modo incógnito

### Logs de Debug

Ative logs detalhados em desenvolvimento:

```typescript
logger: configcat.createConsoleLogger(configcat.LogLevel.Debug)
```

### Validação de Configuração

Use o ConfigCat CLI para validar:

```bash
npm install -g configcat-cli
configcat config-json --config-id=YOUR_CONFIG_ID
```

## 🔄 Atualizações e Manutenção

### 1. Alterando Porcentagens

Para ajustar a distribuição:
1. Acesse a feature flag no painel
2. Modifique as porcentagens (ex: 70% A, 30% B)
3. Salve as alterações
4. A mudança é aplicada automaticamente

### 2. Desativando o Teste

Para finalizar o teste A/B:
1. Remova a regra de Percentage rollout
2. Defina um valor fixo (A ou B) como padrão
3. Monitore por alguns dias antes de remover o código

### 3. Backup de Configurações

Exporte regularmente suas configurações:
1. Use a API do ConfigCat
2. Ou faça screenshots das configurações importantes
3. Documente mudanças significativas

## 📚 Recursos Adicionais

### Documentação Oficial
- [ConfigCat Docs](https://configcat.com/docs/)
- [JavaScript SDK](https://configcat.com/docs/sdk-reference/js/)
- [Percentage Options](https://configcat.com/docs/targeting/percentage-options/)

### Exemplos e Tutoriais
- [A/B Testing Guide](https://configcat.com/blog/ab-testing-guide/)
- [Feature Flag Best Practices](https://configcat.com/blog/feature-flag-best-practices/)

### Suporte
- [ConfigCat Support](https://configcat.com/support/)
- [Community Forum](https://github.com/configcat)

---

**Este guia garante uma configuração robusta e profissional do ConfigCat para seus testes A/B!**

