import { useState } from "react";
import { useLocation } from "wouter";
import { Home, BarChart3, Lightbulb, Settings } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import StudentHome from "@/components/student/home";
import StudentStudyTips from "@/components/student/study-tips";

const sidebarItems = [
  { id: 'home', icon: Home, label: 'Home', active: true },
  { id: 'reports', icon: BarChart3, label: 'Relatórios', disabled: true },
  { id: 'tips', icon: Lightbulb, label: 'Dicas de Estudo', active: true },
  { id: 'settings', icon: Settings, label: 'Configurações', disabled: true },
];

const pageTitles = {
  home: 'Dashboard do Aluno',
  reports: 'Relatórios',
  tips: 'Dicas de Estudo',
  settings: 'Configurações',
};

export default function StudentDashboard() {
  const [currentPage, setCurrentPage] = useState('home');
  const [, setLocation] = useLocation();

  const handleSidebarClick = (id: string) => {
    const item = sidebarItems.find(item => item.id === id);
    if (item && item.active) {
      setCurrentPage(id);
    }
  };

  const handleLogout = () => {
    setLocation('/login');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <StudentHome />;
      case 'tips':
        return <StudentStudyTips />;
      default:
        return (
          <div className="bg-card p-12 rounded-xl shadow-sm text-center">
            <div className="text-6xl text-muted mb-6">🚧</div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Em Desenvolvimento</h2>
            <p className="text-muted-foreground">Esta seção estará disponível em breve.</p>
          </div>
        );
    }
  };

  const items = sidebarItems.map(item => ({
    ...item,
    active: item.id === currentPage,
  }));

  return (
    <div className="h-screen flex">
      <Sidebar items={items} onItemClick={handleSidebarClick} />
      
      <div className="flex-1 flex flex-col">
        <Header title={pageTitles[currentPage as keyof typeof pageTitles]} onLogout={handleLogout} />
        
        <main className="flex-1 p-6 bg-background overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
