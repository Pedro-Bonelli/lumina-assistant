import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Clock, TrendingUp, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import type { Class, Activity, Submission } from "@shared/schema";

interface TeacherHomeProps {
  onNavigate: (page: string) => void;
}

type StatData = {
  label: string;
  value: string;
  icon: typeof Users;
  color: string;
};

type ClassData = {
  id: string;
  name: string;
  studentCount: number;
  pendingCount: number;
  subject: string;
  status: "success" | "warning" | "error";
  activitiesCount: number;
};

const statusConfig = {
  success: { badge: "bg-success/10 text-success", text: "Em dia" },
  warning: { badge: "bg-warning/10 text-warning", text: "2 pendentes" },
  error: { badge: "bg-destructive/10 text-destructive", text: "Atrasado" }
};

export default function TeacherHome({ onNavigate }: TeacherHomeProps) {
  const { user } = useAuth();

  // Fetch teacher's classes
  const { data: teacherClasses, isLoading: classesLoading } = useQuery<Class[]>({
    queryKey: ["/api/classes/teacher", user?.id],
    enabled: !!user?.id,
  });

  // Fetch teacher's activities
  const { data: teacherActivities, isLoading: activitiesLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities/teacher", user?.id],
    enabled: !!user?.id,
  });

  // Fetch all submissions to calculate pending corrections
  const { data: allSubmissions, isLoading: submissionsLoading } = useQuery<Submission[]>({
    queryKey: ["/api/submissions"],
    enabled: !!teacherActivities?.length,
  });

  const isLoading = classesLoading || activitiesLoading || submissionsLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-32 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-24 mb-4" />
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="h-8 w-full mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate statistics
  const totalStudents = teacherClasses?.reduce((sum, cls) => sum + (cls.studentCount || 0), 0) || 0;
  
  const teacherActivityIds = teacherActivities?.map(a => a.id) || [];
  const pendingSubmissions = allSubmissions?.filter(sub => 
    teacherActivityIds.includes(sub.activityId || "") && !sub.isReviewed
  ) || [];
  
  const thisMonthActivities = teacherActivities?.filter(activity => {
    const activityDate = new Date(activity.createdAt || "");
    const now = new Date();
    return activityDate.getMonth() === now.getMonth() && 
           activityDate.getFullYear() === now.getFullYear();
  }) || [];

  // Calculate average grade from reviewed submissions
  const reviewedSubmissions = allSubmissions?.filter(sub => 
    teacherActivityIds.includes(sub.activityId || "") && 
    sub.isReviewed && 
    sub.grade !== null
  ) || [];
  
  const averageGrade = reviewedSubmissions.length > 0 
    ? reviewedSubmissions.reduce((sum, sub) => sum + parseFloat(sub.grade || "0"), 0) / reviewedSubmissions.length
    : 0;

  const stats: StatData[] = [
    { label: "Total de Alunos", value: totalStudents.toString(), icon: Users, color: "text-accent" },
    { label: "Correções Pendentes", value: pendingSubmissions.length.toString(), icon: Clock, color: "text-warning" },
    { label: "Atividades Este Mês", value: thisMonthActivities.length.toString(), icon: TrendingUp, color: "text-success" },
    { label: "Nota Média", value: averageGrade > 0 ? averageGrade.toFixed(1) : "N/A", icon: Star, color: "text-accent" },
  ];

  // Process classes data
  const classesData: ClassData[] = teacherClasses?.map(cls => {
    const classActivities = teacherActivities?.filter(activity => activity.classId === cls.id) || [];
    const classActivityIds = classActivities.map(a => a.id);
    const classPendingSubmissions = allSubmissions?.filter(sub => 
      classActivityIds.includes(sub.activityId || "") && !sub.isReviewed
    ) || [];
    
    const pendingCount = classPendingSubmissions.length;
    const status: "success" | "warning" | "error" = pendingCount === 0 ? "success" : 
                                                   pendingCount <= 2 ? "warning" : "error";
    
    return {
      id: cls.id,
      name: cls.name,
      studentCount: cls.studentCount || 0,
      pendingCount,
      subject: cls.subject,
      status,
      activitiesCount: classActivities.length
    };
  }) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Bem-vindo(a), {user?.name?.split(' ')[0]}! 👋</h2>
          <p className="text-muted-foreground">
            Você tem {pendingSubmissions.length} correções pendentes
          </p>
        </div>
        <Button 
          onClick={() => onNavigate('activities')} 
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
          data-testid="button-new-activity"
        >
          Nova Atividade
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Suas Turmas</h3>
            <div className="flex space-x-4">
              <Select defaultValue="all-subjects">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Matéria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-subjects">Todas as matérias</SelectItem>
                  <SelectItem value="mathematics">Matemática</SelectItem>
                  <SelectItem value="physics">Física</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-years">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-years">Todos os anos</SelectItem>
                  <SelectItem value="6">6º Ano</SelectItem>
                  <SelectItem value="7">7º Ano</SelectItem>
                  <SelectItem value="8">8º Ano</SelectItem>
                  <SelectItem value="9">9º Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {classesData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Você ainda não tem turmas atribuídas.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classesData.map((classItem) => (
                <Card key={classItem.id} className="card-hover" data-testid={`class-${classItem.name.replace(/\s+/g, '-').toLowerCase()}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">{classItem.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusConfig[classItem.status].badge}`}>
                        {classItem.pendingCount === 0 ? "Em dia" : `${classItem.pendingCount} pendentes`}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Alunos</span>
                        <span className="font-medium">{classItem.studentCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Atividades</span>
                        <span className="font-medium">{classItem.activitiesCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Correções pendentes</span>
                        <span className={`font-medium ${classItem.status === 'warning' ? 'text-warning' : classItem.status === 'error' ? 'text-destructive' : 'text-success'}`}>
                          {classItem.pendingCount}
                        </span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => onNavigate('activities')} 
                      className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground" 
                      size="sm"
                      data-testid={`button-manage-${classItem.name.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      Gerenciar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
