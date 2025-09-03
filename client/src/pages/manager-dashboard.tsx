import { useState } from "react";
import { useLocation } from "wouter";
import { Home, BarChart3, Users, Settings } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import ManagerHome from "@/components/manager/home";
import ManagerReports from "@/components/manager/reports";
import ManagerAccountManagement from "@/components/manager/account-management";

const sidebarItems = [
  { id: 'home', icon: Home, label: 'Home', active: true },
  { id: 'reports', icon: BarChart3, label: 'Relatórios', active: true },
  { id: 'accounts', icon: Users, label: 'Gerenciamento', active: true },
  { id: 'settings', icon: Settings, label: 'Configurações', disabled: true },
];

const pageTitles = {
  home: 'Dashboard do Gestor',
  reports: 'Relatórios Institucional',
  accounts: 'Gerenciamento de Contas',
  settings: 'Configurações',
};

export default function ManagerDashboard() {
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
        return <ManagerHome onNavigate={setCurrentPage} />;
      case 'reports':
        return <ManagerReports />;
      case 'accounts':
        return <ManagerAccountManagement />;
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
