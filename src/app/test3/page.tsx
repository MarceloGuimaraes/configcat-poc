import EnvironmentInfo from '@/components/EnvironmentInfo';
import FeatureRecallDisplay from '@/components/FeatureRecallDisplay';
import Link from 'next/link';

export default function Test3Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Navigation */}
        <nav className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Voltar ao Início
          </Link>
        </nav>

        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Feature Flag - Sistema de Recall
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Demonstração de uma feature flag de toggle usando `feature_flag_feature_recall` 
            para habilitar/desabilitar funcionalidades críticas instantaneamente.
          </p>
        </header>

        {/* Environment Information */}
        <section>
          <EnvironmentInfo />
        </section>

        {/* Feature Recall Display */}
        <section>
          <FeatureRecallDisplay />
        </section>

        {/* Footer */}
        <footer className="text-center mt-12 py-8 border-t border-gray-200">
          <div className="text-gray-600">
            <p className="mb-2">
              <strong>Feature Flag:</strong> feature_flag_feature_recall (Boolean: true/false)
            </p>
            <p className="text-sm">
              Esta feature flag demonstra como controlar funcionalidades críticas 
              que podem ser ativadas/desativadas instantaneamente em produção.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

