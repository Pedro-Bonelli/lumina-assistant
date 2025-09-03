import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GraduationCap, Upload, Settings, Brain, CheckCircle, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-secondary" />
            <span className="text-xl font-bold text-primary">Lumina Assistant</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#sobre" className="text-muted-foreground hover:text-foreground transition-colors">Sobre</a>
            <a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">Como Funciona</a>
            <a href="#funcionalidades" className="text-muted-foreground hover:text-foreground transition-colors">Funcionalidades</a>
            <a href="#planos" className="text-muted-foreground hover:text-foreground transition-colors">Planos</a>
            <a href="#opinies" className="text-muted-foreground hover:text-foreground transition-colors">Opiniões</a>
            <a href="#contato" className="text-muted-foreground hover:text-foreground transition-colors">Contato</a>
          </nav>
          
          <Link href="/login">
            <Button 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              data-testid="button-login"
            >
              Entrar
            </Button>
          </Link>
        </div>
      </header>
      {/* Hero Section */}
      <section className="pt-24 pb-16 hero-gradient">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#003152]">
            Menos tempo corrigindo,<br />
            <span className="text-secondary">mais tempo ensinando.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
            Automatizamos correções e geramos relatórios práticos para você dedicar mais tempo aos alunos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg"
              data-testid="button-start-trial"
            >
              Quero Economizar Tempo
            </Button>
            <Link href="/login">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-4 text-lg"
                data-testid="button-access-platform"
              >
                Acessar Plataforma
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Envie sua Atividade</h3>
              <p className="text-muted-foreground">Carregue suas provas e exercícios na plataforma de forma simples e rápida.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Detalhe os Critérios</h3>
              <p className="text-muted-foreground">Configure os critérios de avaliação específicos para sua atividade.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. A Lumina Analisa</h3>
              <p className="text-muted-foreground">Nossa IA corrige automaticamente seguindo seus critérios pedagógicos.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">4. Revise e Libere</h3>
              <p className="text-muted-foreground">Valide os resultados e gere relatórios detalhados para seus alunos.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Funcionalidades Section */}
      <section id="funcionalidades" className="py-16 bg-muted">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Funcionalidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-md card-hover">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Correção Automatizada com IA</h3>
              <p className="text-muted-foreground">Correção inteligente que entende contexto e aplica critérios pedagógicos personalizados.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md card-hover">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Relatórios Pedagógicos Visuais</h3>
              <p className="text-muted-foreground">Dashboards interativos com insights detalhados sobre o desempenho dos alunos.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md card-hover">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Painel de Validação do Professor</h3>
              <p className="text-muted-foreground">Interface intuitiva para revisar e ajustar correções antes da liberação.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Planos Section */}
      <section id="planos" className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Planos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-md border border-border">
              <h3 className="text-2xl font-bold mb-2">Simples</h3>
              <p className="text-3xl font-bold text-accent mb-4">R$ 29<span className="text-sm text-muted-foreground">/mês</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Até 5 turmas</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />100 correções/mês</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Relatórios básicos</li>
              </ul>
              <Link href="/login">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" data-testid="button-plan-simple">
                  Escolher Plano
                </Button>
              </Link>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md border-2 border-accent relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                Mais Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Base</h3>
              <p className="text-3xl font-bold text-accent mb-4">R$ 59<span className="text-sm text-muted-foreground">/mês</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Até 15 turmas</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />500 correções/mês</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Relatórios avançados</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Suporte prioritário</li>
              </ul>
              <Link href="/login">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" data-testid="button-plan-base">
                  Escolher Plano
                </Button>
              </Link>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md border border-border">
              <h3 className="text-2xl font-bold mb-2">PRO</h3>
              <p className="text-3xl font-bold text-accent mb-4">R$ 99<span className="text-sm text-muted-foreground">/mês</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Turmas ilimitadas</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Correções ilimitadas</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Analytics avançado</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" />Integração API</li>
              </ul>
              <Link href="/login">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" data-testid="button-plan-pro">
                  Escolher Plano
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Opiniões Section */}
      <section id="opinies" className="py-16 bg-muted">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">O que dizem nossos usuários</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="carousel-container overflow-x-auto flex space-x-6 scroll-snap-x-mandatory pb-4">
              <div className="carousel-item flex-shrink-0 w-full md:w-96 bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-3">
                    <span className="text-accent-foreground font-semibold">MF</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Maria Fernandes</h4>
                    <p className="text-sm text-muted-foreground">Professora de Matemática</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"O Lumina me devolveu horas do meu dia! Agora posso focar no que realmente importa: planejar aulas incríveis."</p>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
              </div>
              <div className="carousel-item flex-shrink-0 w-full md:w-96 bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-3">
                    <span className="text-accent-foreground font-semibold">JS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">João Silva</h4>
                    <p className="text-sm text-muted-foreground">Diretor Acadêmico</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"Os relatórios detalhados nos ajudam a tomar decisões pedagógicas mais assertivas. Excelente ferramenta!"</p>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
              </div>
              <div className="carousel-item flex-shrink-0 w-full md:w-96 bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-3">
                    <span className="text-accent-foreground font-semibold">AS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Ana Santos</h4>
                    <p className="text-sm text-muted-foreground">Coordenadora Pedagógica</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">"A qualidade das correções automatizadas surpreendeu toda nossa equipe. Mantém o padrão pedagógico."</p>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contato" className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para transformar sua forma de ensinar?</h2>
          <p className="text-xl mb-8 opacity-90">Comece hoje mesmo e redescubra o prazer de ensinar.</p>
          <Link href="/login">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg"
              data-testid="button-start-now"
            >
              Começar Agora
            </Button>
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6 text-secondary" />
                <span className="font-bold text-lg">Lumina Assistant</span>
              </div>
              <p className="text-primary-foreground/80">Clareza para quem ensina.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Produto</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#funcionalidades" className="hover:text-secondary transition-colors">Funcionalidades</a></li>
                <li><a href="#planos" className="hover:text-secondary transition-colors">Planos</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Segurança</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Suporte</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-secondary transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Tutoriais</a></li>
                <li><a href="#contato" className="hover:text-secondary transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contato</h4>
              <p className="text-primary-foreground/80">contato@luminaassistant.com</p>
              <p className="text-primary-foreground/80">+55 11 9999-9999</p>
            </div>
          </div>
          <hr className="my-8 border-primary-foreground/20" />
          <div className="text-center text-primary-foreground/80">
            <p>&copy; 2024 Lumina Assistant. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
