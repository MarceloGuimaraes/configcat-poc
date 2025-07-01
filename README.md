# ConfigCat Feature Flags Demo com Next.js

Uma aplicação web moderna desenvolvida com React e Next.js, integrada ao ConfigCat para demonstração completa de feature flags, incluindo testes A/B com Percentage Rollout e feature toggles. Este projeto demonstra como implementar diferentes tipos de feature flags de forma profissional, com suporte a múltiplos ambientes e segmentação consistente de usuários.

## 🚀 Características Principais

- **Next.js 15** com TypeScript para desenvolvimento type-safe
- **ConfigCat SDK** integrado para feature flags e testes A/B
- **Múltiplos tipos de feature flags** (Text, Boolean)
- **Percentage Rollout 50/50** para distribuição equitativa de usuários
- **Segmentação por user.identifier** para consistência entre sessões
- **Suporte a múltiplos ambientes** (desenvolvimento e produção)
- **CSS Modules** para estilização modular e isolada
- **VSCode configurado** com extensões e configurações otimizadas
- **Hooks personalizados** para consumo reativo de feature flags
- **Navegação intuitiva** entre diferentes demonstrações

## 🎯 Feature Flags Implementadas

### 1. ab_test_home_banner (Text: A/B)
- **Tipo:** Text (valores: 'A' ou 'B')
- **Propósito:** Teste A/B clássico para variações de conteúdo
- **Configuração:** Percentage Rollout 50/50
- **Rota:** `/test1`

### 2. ab_test_banner_btn (Boolean)
- **Tipo:** Boolean (true/false)
- **Propósito:** Teste A/B para controle de promoções
- **Configuração:** Percentage Rollout 50/50
- **Rota:** `/test2`

### 3. feature_flag_feature_recall (Boolean)
- **Tipo:** Boolean (true/false)
- **Propósito:** Feature toggle para funcionalidades críticas
- **Configuração:** Controle manual (não usa percentage rollout)
- **Rota:** `/test3`

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no ConfigCat (gratuita disponível)
- VSCode (recomendado para desenvolvimento)

## 🛠️ Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd configcat-ab-testing
```

2. **Instale as dependências:**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env.local
```

4. **Edite o arquivo `.env.local` com suas configurações:**
```env
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_CONFIGCAT_SDK_KEY=sua-chave-sdk-aqui
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_DEBUG_MODE=true
```

5. **Execute a aplicação:**
```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## 🔧 Configuração do ConfigCat

### 1. Feature Flag: ab_test_home_banner

**Criação:**
1. No painel do ConfigCat, crie uma nova feature flag
2. **Key:** `ab_test_home_banner`
3. **Type:** `Text`
4. **Default Value:** `A`

**Configuração do Percentage Rollout:**
1. Adicione uma regra de targeting
2. Selecione "Percentage Rollout"
3. Configure:
   - 50% dos usuários recebem o valor `A`
   - 50% dos usuários recebem o valor `B`
4. **Attribute:** `Identifier` (user.identifier)

### 2. Feature Flag: ab_test_banner_btn

**Criação:**
1. No painel do ConfigCat, crie uma nova feature flag
2. **Key:** `ab_test_banner_btn`
3. **Type:** `Boolean`
4. **Default Value:** `false`

**Configuração do Percentage Rollout:**
1. Adicione uma regra de targeting
2. Selecione "Percentage Rollout"
3. Configure:
   - 50% dos usuários recebem `true`
   - 50% dos usuários recebem `false`
4. **Attribute:** `Identifier` (user.identifier)

### 3. Feature Flag: feature_flag_feature_recall

**Criação:**
1. No painel do ConfigCat, crie uma nova feature flag
2. **Key:** `feature_flag_feature_recall`
3. **Type:** `Boolean`
4. **Default Value:** `false`

**Configuração:**
- Esta flag é controlada manualmente (sem percentage rollout)
- Pode ser ativada/desativada instantaneamente para todos os usuários
- Ideal para funcionalidades críticas que precisam ser controladas rapidamente

### 4. Obtendo as Chaves SDK

1. No painel do ConfigCat, vá para "SDK Keys"
2. Copie a chave para o ambiente desejado:
   - **Desenvolvimento:** Use a chave do ambiente "Test"
   - **Produção:** Use a chave do ambiente "Production"

## 🌍 Configuração de Ambientes

### Desenvolvimento (.env.local)
```env
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_CONFIGCAT_SDK_KEY=configcat-sdk-1/sua-chave-dev
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_DEBUG_MODE=true
```

### Produção (.env.production.local)
```env
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_CONFIGCAT_SDK_KEY=configcat-sdk-1/sua-chave-prod
NEXT_PUBLIC_API_URL=https://sua-api-producao.com/api
NEXT_PUBLIC_DEBUG_MODE=false
```

## 🎯 Como Funcionam os Testes A/B

### Segmentação por user.identifier

A aplicação utiliza o atributo `user.identifier` para garantir que cada usuário sempre veja a mesma variação:

1. **Usuários não autenticados:** Um ID único é gerado e armazenado no localStorage
2. **Usuários autenticados:** Use o ID do usuário do seu sistema de autenticação
3. **Consistência:** O ConfigCat usa este ID para calcular deterministicamente qual variação mostrar

### Percentage Rollout (Testes A/B)

**ab_test_home_banner:**
- **50% dos usuários** veem a **Variação A** (design clássico)
- **50% dos usuários** veem a **Variação B** (design inovador)

**ab_test_banner_btn:**
- **50% dos usuários** veem a **versão promocional** (true)
- **50% dos usuários** veem a **versão padrão** (false)

### Feature Toggle

**feature_flag_feature_recall:**
- **Habilitada:** Exibe sistema de recall com avisos importantes
- **Desabilitada:** Exibe catálogo normal de produtos
- Pode ser controlada instantaneamente pelo painel do ConfigCat

## 📁 Estrutura do Projeto

```
configcat-ab-testing/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Página principal com navegação
│   │   ├── test1/
│   │   │   └── page.tsx          # Teste A/B original (text)
│   │   ├── test2/
│   │   │   └── page.tsx          # Teste A/B booleano
│   │   ├── test3/
│   │   │   └── page.tsx          # Feature toggle
│   │   └── layout.tsx            # Layout da aplicação
│   ├── components/
│   │   ├── EnvironmentInfo.tsx   # Componente de info do ambiente
│   │   ├── ABTestDisplay.tsx     # Componente do teste A/B original
│   │   ├── BannerButtonTest.tsx  # Componente do teste A/B booleano
│   │   ├── FeatureRecallDisplay.tsx # Componente da feature toggle
│   │   ├── NavigationCard.tsx    # Componente de navegação
│   │   └── *.module.css          # Estilos CSS Modules
│   ├── hooks/
│   │   └── useConfigCat.ts       # Hooks para feature flags
│   ├── lib/
│   │   ├── configcat.ts          # Configuração do ConfigCat
│   │   └── env.ts                # Validação de variáveis de ambiente
│   └── utils/
│       └── userUtils.ts          # Utilitários para ID de usuário
├── .vscode/                      # Configurações do VSCode
├── .env.example                  # Exemplo de variáveis de ambiente
└── README.md                     # Este arquivo
```

## 🔨 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
```

## 🎨 Desenvolvimento no VSCode

### Extensões Recomendadas

O projeto inclui configurações para as seguintes extensões:

- **ESLint** - Linting de código
- **Prettier** - Formatação automática
- **Tailwind CSS IntelliSense** - Autocomplete para Tailwind
- **TypeScript Hero** - Organização de imports
- **Auto Rename Tag** - Renomeação automática de tags
- **Path Intellisense** - Autocomplete para caminhos

### Configurações Automáticas

- Formatação automática ao salvar
- Organização automática de imports
- Validação de TypeScript em tempo real
- Suporte completo ao Tailwind CSS

## 🧪 Testando a Aplicação

### Navegação

1. Acesse a página inicial em [http://localhost:3000](http://localhost:3000)
2. Clique em qualquer cartão para acessar uma demonstração específica
3. Use o botão "Voltar ao Início" para retornar à navegação principal

### Teste Manual dos A/B Tests

1. Acesse `/test1` ou `/test2`
2. Observe qual variação é exibida
3. Clique em "Novo Usuário" para simular outro usuário
4. Verifique que a distribuição é aproximadamente 50/50

### Teste da Feature Toggle

1. Acesse `/test3`
2. No painel do ConfigCat, altere o valor de `feature_flag_feature_recall`
3. Clique em "Atualizar" na aplicação para ver a mudança
4. Observe como a interface muda instantaneamente

### Validação de Consistência

1. Anote o ID do usuário atual
2. Recarregue a página várias vezes
3. Confirme que a mesma variação é sempre exibida
4. Teste em diferentes navegadores com o mesmo localStorage

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente de produção
3. Deploy automático a cada push

### Outras Plataformas

1. Execute `npm run build`
2. Configure as variáveis de ambiente de produção
3. Sirva os arquivos da pasta `.next`

## 🔍 Monitoramento e Analytics

### ConfigCat Dashboard

- Monitore a distribuição de usuários entre variações
- Analise métricas de performance das feature flags
- Configure alertas para mudanças de configuração

### Integração com Analytics

Para rastrear conversões e métricas:

```typescript
// Exemplo de tracking para teste A/B
const { variant } = useABTest(userObject);
analytics.track('ab_test_view', {
  test_name: 'home_banner',
  variant: variant,
  user_id: userId
});

// Exemplo de tracking para feature toggle
const { isEnabled } = useFeatureRecall(userObject);
analytics.track('feature_flag_view', {
  flag_name: 'feature_recall',
  enabled: isEnabled,
  user_id: userId
});
```

## 📊 Governança de Feature Flags

### Convenções de Nomenclatura

- **Testes A/B:** `ab_test_[nome_descritivo]`
- **Feature Toggles:** `feature_flag_[nome_funcionalidade]`
- **Releases Graduais:** `rollout_[nome_feature]`

### Boas Práticas

1. **Documentação:** Sempre documente o propósito de cada flag
2. **Limpeza:** Remova flags obsoletas regularmente
3. **Monitoramento:** Configure alertas para mudanças críticas
4. **Testes:** Sempre teste flags em ambiente de desenvolvimento primeiro

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

### Problemas Comuns

**Feature flags não carregam:**
- Verifique se a chave SDK está correta
- Confirme que as feature flags existem no ConfigCat
- Verifique a conectividade com a internet

**Variação sempre a mesma:**
- Confirme que o Percentage Rollout está configurado
- Verifique se o user.identifier está sendo enviado
- Teste com diferentes IDs de usuário

**Navegação não funciona:**
- Verifique se todas as rotas estão criadas
- Confirme que os componentes estão importados corretamente
- Verifique o console do navegador para erros

**Erros de TypeScript:**
- Execute `npm run type-check` para ver erros detalhados
- Verifique se todas as dependências estão instaladas
- Confirme que os tipos estão corretos

### Links Úteis

- [Documentação do ConfigCat](https://configcat.com/docs/)
- [ConfigCat Percentage Options](https://configcat.com/docs/targeting/percentage-options/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Desenvolvido usando React, Next.js e ConfigCat**

