import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, GraduationCap, BookOpen, ListTodo, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import type { Class, User, Activity, Submission } from "@shared/schema";

interface ManagerHomeProps {
  onNavigate: (page: string) => void;
}

type InstitutionStats = {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  averageGrade: number;
};

type PerformanceByGrade = {
  grade: string;
  average: number;
  percentage: number;
};

type PlatformActivity = {
  monthlyCorrections: number;
  activeTeachers: string;
  timeSaved: string;
};

type RecentActivity = {
  id: string;
  type: string;
  description: string;
  teacher: string;
  timeAgo: string;
  icon: string;
};

export default function ManagerHome({ onNavigate }: ManagerHomeProps) {
  const { user } = useAuth();

  // Fetch all data for manager overview
  const { data: allClasses, isLoading: classesLoading } = useQuery<Class[]>({
    queryKey: ["/api/classes"],
  });

  const { data: allSubmissions, isLoading: submissionsLoading } = useQuery<Submission[]>({
    queryKey: ["/api/submissions"],
  });

  const isLoading = classesLoading || submissionsLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
          <div className="text-right">
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Calculate institution statistics
  const totalClasses = allClasses?.length || 0;
  const totalStudents = allClasses?.reduce((sum, cls) => sum + (cls.studentCount || 0), 0) || 0;
  
  // Calculate average grade from all reviewed submissions
  const reviewedSubmissions = allSubmissions?.filter(sub => 
    sub.isReviewed && sub.grade !== null
  ) || [];
  
  const averageGrade = reviewedSubmissions.length > 0 
    ? reviewedSubmissions.reduce((sum, sub) => sum + parseFloat(sub.grade || "0"), 0) / reviewedSubmissions.length
    : 0;

  // Calculate monthly corrections (this month)
  const now = new Date();
  const monthlyCorrections = allSubmissions?.filter(sub => {
    const submissionDate = new Date(sub.submittedAt || "");
    return submissionDate.getMonth() === now.getMonth() && 
           submissionDate.getFullYear() === now.getFullYear() &&
           sub.isReviewed;
  }).length || 0;

  const institutionStats: InstitutionStats = {
    totalStudents,
    totalTeachers: 5, // Mock data - we don't have users by type in current structure
    totalClasses,
    averageGrade: Math.round(averageGrade * 10) / 10
  };

  const performanceByGrade: PerformanceByGrade[] = [
    { grade: "6º Ano", average: 8.2, percentage: 82 },
    { grade: "7º Ano", average: 7.8, percentage: 78 },
    { grade: "8º Ano", average: 7.9, percentage: 79 },
    { grade: "9º Ano", average: 8.1, percentage: 81 },
  ];

  const platformActivity: PlatformActivity = {
    monthlyCorrections,
    activeTeachers: "5/5", // Mock data
    timeSaved: "150h" // Mock calculation
  };

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "correction",
      description: "Atividade corrigida - Matemática",
      teacher: "Sistema",
      timeAgo: "há 1 hora",
      icon: "✅"
    },
    {
      id: "2", 
      type: "activity",
      description: "Nova atividade criada",
      teacher: "Professor", 
      timeAgo: "há 3 horas",
      icon: "➕"
    },
    {
      id: "3",
      type: "report",
      description: "Relatório atualizado",
      teacher: "Sistema",
      timeAgo: "há 5 horas", 
      icon: "📊"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard Institucional</h2>
          <p className="text-muted-foreground">Lumina Assistant - Escola Municipal</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Última atualização: há 5 min</p>
        </div>
      </div>

      {/* Institution Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card data-testid="card-total-students">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{institutionStats.totalStudents.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total de Alunos</p>
              </div>
              <GraduationCap className="h-6 w-6 text-accent" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-success">+5.2%</span>
              <span className="text-muted-foreground ml-1">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-total-teachers">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{institutionStats.totalTeachers}</p>
                <p className="text-sm text-muted-foreground">Professores Ativos</p>
              </div>
              <Users className="h-6 w-6 text-accent" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-success">+2.3%</span>
              <span className="text-muted-foreground ml-1">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-total-classes">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{institutionStats.totalClasses}</p>
                <p className="text-sm text-muted-foreground">Turmas</p>
              </div>
              <BookOpen className="h-6 w-6 text-accent" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-muted-foreground">Estável</span>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-average-grade">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">{institutionStats.averageGrade}</p>
                <p className="text-sm text-muted-foreground">Média Institucional</p>
              </div>
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-success">+0.8</span>
              <span className="text-muted-foreground ml-1">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Desempenho por Série</h3>
            <div className="space-y-3">
              {performanceByGrade.map((item) => (
                <div key={item.grade} className="flex items-center justify-between" data-testid={`performance-${item.grade.replace('º', '').replace(' ', '-').toLowerCase()}`}>
                  <span className="text-sm">{item.grade}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{item.average}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Atividade da Plataforma</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between" data-testid="stat-monthly-corrections">
                <span className="text-sm text-muted-foreground">Correções este mês</span>
                <span className="text-lg font-semibold">{platformActivity.monthlyCorrections.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between" data-testid="stat-active-teachers">
                <span className="text-sm text-muted-foreground">Professores ativos</span>
                <span className="text-lg font-semibold">{platformActivity.activeTeachers}</span>
              </div>
              <div className="flex items-center justify-between" data-testid="stat-time-saved">
                <span className="text-sm text-muted-foreground">Tempo economizado</span>
                <span className="text-lg font-semibold text-success">{platformActivity.timeSaved}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <Button
                onClick={() => onNavigate('accounts')}
                variant="outline"
                className="w-full justify-start h-auto p-4"
                data-testid="button-manage-teachers"
              >
                <Users className="h-5 w-5 text-accent mr-3" />
                Gerenciar Professores
              </Button>
              <Button
                onClick={() => onNavigate('reports')}
                variant="outline" 
                className="w-full justify-start h-auto p-4"
                data-testid="button-view-reports"
              >
                <ListTodo className="h-5 w-5 text-accent mr-3" />
                Ver Relatórios Detalhados
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4"
                data-testid="button-export-data"
              >
                <svg className="h-5 w-5 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar Dados
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Atividade Recente</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center space-x-3 p-3 bg-muted rounded-lg"
                  data-testid={`activity-${activity.id}`}
                >
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-xs">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.teacher} • {activity.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
