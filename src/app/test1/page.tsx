import EnvironmentInfo from '@/components/EnvironmentInfo';
import ABTestDisplay from '@/components/ABTestDisplay';
import Link from 'next/link';

export default function Test1Page() {
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
            Teste A/B - Banner da Home
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Demonstração do teste A/B original usando a flag `ab_test_home_banner` 
            com Percentage Rollout 50/50 entre variações A e B.
          </p>
        </header>

        {/* Environment Information */}
        <section>
          <EnvironmentInfo />
        </section>

        {/* A/B Test Display */}
        <section>
          <ABTestDisplay />
        </section>

        {/* Footer */}
        <footer className="text-center mt-12 py-8 border-t border-gray-200">
          <div className="text-gray-600">
            <p className="mb-2">
              <strong>Feature Flag:</strong> ab_test_home_banner (Text: A/B)
            </p>
            <p className="text-sm">
              Este teste demonstra como implementar variações de conteúdo 
              usando feature flags do tipo texto com Percentage Rollout.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

