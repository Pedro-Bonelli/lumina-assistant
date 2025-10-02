import { useState } from "react";
import { useLocation } from "wouter";
import { Home, ListTodo, BarChart3, Users, Settings } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useAuth } from "@/contexts/AuthContext";
import TeacherHome from "@/components/teacher/home";
import TeacherActivities from "@/components/teacher/activities";
import TeacherReports from "@/components/teacher/reports";
import TeacherAccountManagement from "@/components/teacher/account-management";
import { SettingsModal } from "@/components/teacher/settings-modal";

const sidebarItems = [
  { id: 'home', icon: Home, label: 'Home', active: true },
  { id: 'activities', icon: ListTodo, label: 'Atividades', active: true },
  { id: 'reports', icon: BarChart3, label: 'Relatórios', active: true },
  { id: 'accounts', icon: Users, label: 'Gerenciamento', active: true },
  { id: 'settings', icon: Settings, label: 'Configurações', active: true },
];

const pageTitles = {
  home: 'Dashboard do Professor',
  activities: 'Atividades',
  reports: 'Relatórios',
  accounts: 'Gerenciamento de Contas',
  settings: 'Configurações',
};

export default function TeacherDashboard() {
  const [currentPage, setCurrentPage] = useState('home');
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { logout } = useAuth();

  const handleSidebarClick = (id: string) => {
    if (id === 'settings') {
      setSettingsModalOpen(true);
      return;
    }
    
    const item = sidebarItems.find(item => item.id === id);
    if (item && item.active) {
      setCurrentPage(id);
    }
  };

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <TeacherHome onNavigate={setCurrentPage} />;
      case 'activities':
        return <TeacherActivities />;
      case 'reports':
        return <TeacherReports />;
      case 'accounts':
        return <TeacherAccountManagement />;
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

      <SettingsModal open={settingsModalOpen} onOpenChange={setSettingsModalOpen} />
    </div>
  );
}
