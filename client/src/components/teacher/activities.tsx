import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import CreateActivity from "./create-activity";
import CorrectionReview from "./correction-review";

const activitiesData = {
  correction: [
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
      title: "Atividade de Matrizes",
      className: "7º Ano C",
      studentCount: 22,
      submittedDate: "há 4 horas",
      status: "processing" as const
    }
  ],
  scheduled: [
    {
      id: "4",
      title: "Prova Bimestral",
      className: "9º Ano A",
      studentCount: 32,
      submittedDate: "20/12/2024",
      status: "scheduled" as const
    },
    {
      id: "5",
      title: "Trabalho de Física Quântica",
      className: "3º Ano EM",
      studentCount: 30,
      submittedDate: "22/12/2024",
      status: "scheduled" as const
    }
  ],
  completed: [
    {
      id: "6",
      title: "Prova de Álgebra",
      className: "9º Ano A",
      studentCount: 28,
      submittedDate: "15/11/2024",
      status: "completed" as const
    },
    {
      id: "7",
      title: "Exercícios de Trigonometria",
      className: "8º Ano B",
      studentCount: 25,
      submittedDate: "10/11/2024",
      status: "completed" as const
    }
  ]
};

const statusConfig = {
  processing: { variant: "secondary" as const, label: "Processando" },
  ready: { variant: "default" as const, label: "Pronto para Revisão" },
  scheduled: { variant: "outline" as const, label: "Agendada" },
  completed: { variant: "default" as const, label: "Finalizada" }
};

const tabs = [
  { id: "correction", label: "Em Correção", count: activitiesData.correction.length },
  { id: "scheduled", label: "Agendadas", count: activitiesData.scheduled.length },
  { id: "completed", label: "Finalizadas", count: activitiesData.completed.length }
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
            {activitiesData[activeTab as keyof typeof activitiesData].length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhuma atividade encontrada nesta categoria.</p>
              </div>
            ) : (
              activitiesData[activeTab as keyof typeof activitiesData].map((activity) => (
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
                        {activity.status === "scheduled" ? "Agendada para: " : "Enviado em: "}
                        {activity.submittedDate}
                      </span>
                      <Badge variant={statusConfig[activity.status].variant}>
                        {statusConfig[activity.status].label}
                      </Badge>
                    </div>
                  </div>
                  {(activity.status === "ready" || activity.status === "processing" || activity.status === "completed") && (
                    <Button 
                      onClick={() => setCurrentView('correction')}
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      data-testid={`button-view-corrections-${activity.id}`}
                    >
                      {activity.status === "completed" ? "Ver Resultados" : "Ver Correções"}
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
