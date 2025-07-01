import EnvironmentInfo from '@/components/EnvironmentInfo';
import NavigationCard from '@/components/NavigationCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ConfigCat Feature Flags Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Demonstração completa de uma aplicação React + Next.js integrada ao ConfigCat 
            para testes A/B e controle de funcionalidades com feature flags.
          </p>
        </header>

        {/* Environment Information */}
        <section className="mb-12">
          <EnvironmentInfo />
        </section>

        {/* Navigation Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Explore as Funcionalidades
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Clique em qualquer cartão abaixo para ver diferentes implementações 
              de feature flags e testes A/B em ação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Teste A/B Original */}
            <NavigationCard
              title="Teste A/B - Banner da Home"
              description="Demonstração do teste A/B original usando variações de texto (A/B) com Percentage Rollout 50/50."
              flagName="ab_test_home_banner"
              flagType="Text (A/B)"
              href="/test1"
              icon="🎯"
              color="blue"
            />

            {/* Novo Teste A/B Booleano */}
            <NavigationCard
              title="Teste A/B - Botão Promocional"
              description="Novo teste A/B usando flag booleana para controlar exibição de promoções especiais."
              flagName="ab_test_banner_btn"
              flagType="Boolean"
              href="/test2"
              icon="🔥"
              color="green"
            />

            {/* Feature Flag de Toggle */}
            <NavigationCard
              title="Feature Flag - Sistema de Recall"
              description="Feature toggle para habilitar/desabilitar funcionalidades críticas instantaneamente."
              flagName="feature_flag_feature_recall"
              flagType="Boolean"
              href="/test3"
              icon="⚠️"
              color="purple"
            />
          </div>
        </section>

        {/* Features Overview */}
        <section className="mb-12">
          <div className="bg-white rounded-16 p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Recursos Implementados
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                  🧪 Testes A/B
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 pl-4">
                  <li>• Percentage Rollout 50/50</li>
                  <li>• Segmentação por user.identifier</li>
                  <li>• Persistência entre sessões</li>
                  <li>• Suporte a flags de texto e booleanas</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                  🚩 Feature Flags
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 pl-4">
                  <li>• Ativação/desativação instantânea</li>
                  <li>• Suporte a múltiplos ambientes</li>
                  <li>• Hooks React reativos</li>
                  <li>• Fallbacks seguros</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200">
          <div className="text-gray-600">
            <p className="mb-2">
              <strong>Tecnologias utilizadas:</strong> React, Next.js, TypeScript, ConfigCat, CSS Modules
            </p>
            <p className="text-sm">
              Esta aplicação demonstra como implementar testes A/B e feature flags 
              de forma profissional usando segmentação de usuários e controle granular.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

