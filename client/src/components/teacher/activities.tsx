import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import CreateActivity from "./create-activity";
import CorrectionReview from "./correction-review";

const activities = [
  {
    id: "1",
    title: "Prova de Geometria",
    className: "9º Ano A",
    studentCount: 28,
    submittedDate: "há 2 horas",
    status: "processing" as const
  },
  {
    id: "2",
    title: "Exercícios de Funções",
    className: "8º Ano B",
    studentCount: 25,
    submittedDate: "ontem",
    status: "ready" as const
  },
  {
    id: "3",
    title: "Prova Bimestral",
    className: "9º Ano A",
    studentCount: 32,
    submittedDate: "20/12/2024",
    status: "scheduled" as const
  }
];

const statusConfig = {
  processing: { variant: "secondary" as const, label: "Processando" },
  ready: { variant: "default" as const, label: "Pronto para Revisão" },
  scheduled: { variant: "outline" as const, label: "Agendada" },
  completed: { variant: "default" as const, label: "Finalizada" }
};

const tabs = [
  { id: "correction", label: "Em Correção", count: 3 },
  { id: "scheduled", label: "Agendadas", count: 2 },
  { id: "completed", label: "Finalizadas", count: 18 }
];

export default function TeacherActivities() {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'correction'>('list');
  const [activeTab, setActiveTab] = useState('correction');

  if (currentView === 'create') {
    return <CreateActivity onBack={() => setCurrentView('list')} />;
  }

  if (currentView === 'correction') {
    return <CorrectionReview onBack={() => setCurrentView('list')} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Atividades</h2>
        <Button 
          onClick={() => setCurrentView('create')}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          data-testid="button-create-activity"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Atividade
        </Button>
      </div>

      <Card>
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-secondary text-secondary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                data-testid={`tab-${tab.id}`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-center justify-between p-4 border border-border rounded-lg"
                data-testid={`activity-${activity.id}`}
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
                  <p className="text-muted-foreground mb-3">
                    {activity.className} • {activity.studentCount} alunos
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      Enviado em: {activity.submittedDate}
                    </span>
                    <Badge variant={statusConfig[activity.status].variant}>
                      {statusConfig[activity.status].label}
                    </Badge>
                  </div>
                </div>
                <Button 
                  onClick={() => setCurrentView('correction')}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  data-testid={`button-view-corrections-${activity.id}`}
                >
                  Ver Correções
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
