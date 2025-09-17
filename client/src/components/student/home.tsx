import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import type { Enrollment, Class, Activity, Submission } from "@shared/schema";

type SubjectData = {
  name: string;
  professor: string;
  pendingCount: number;
  averageGrade: number;
  progressPercentage: number;
  status: "success" | "warning" | "error";
};

type ActivityData = {
  title: string;
  subject: string;
  dueDate: string;
  id: string;
};

const statusColors = {
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-destructive"
};

const gradeColors = {
  success: "text-success",
  warning: "text-warning",
  error: "text-destructive"
};

function formatDueDate(dueDate: Date): string {
  const now = new Date();
  const diffTime = dueDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Amanhã";
  if (diffDays === -1) return "Ontem";
  if (diffDays < 0) return `${Math.abs(diffDays)} dias atrás`;
  return `Em ${diffDays} dias`;
}

function getStatusFromGrade(grade: number): "success" | "warning" | "error" {
  if (grade >= 8) return "success";
  if (grade >= 6) return "warning";
  return "error";
}

export default function StudentHome() {
  const { user } = useAuth();

  // Fetch student enrollments
  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery<Enrollment[]>({
    queryKey: ["/api/enrollments/student", user?.id],
    enabled: !!user?.id,
  });

  // Fetch all classes to get class details
  const { data: allClasses, isLoading: classesLoading } = useQuery<Class[]>({
    queryKey: ["/api/classes"],
    enabled: !!enrollments?.length,
  });

  // Fetch student submissions
  const { data: submissions, isLoading: submissionsLoading } = useQuery<Submission[]>({
    queryKey: ["/api/submissions/student", user?.id],
    enabled: !!user?.id,
  });

  const isLoading = enrollmentsLoading || classesLoading || submissionsLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-24 mb-4" />
                <Skeleton className="h-4 w-32 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-2 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Process data to create subjects array
  const studentClasses = enrollments?.map(enrollment => 
    allClasses?.find(cls => cls.id === enrollment.classId)
  ).filter(Boolean) || [];

  // Create subjects with calculated data
  const subjects: SubjectData[] = studentClasses.map(cls => {
    const classSubmissions = submissions?.filter(sub => 
      allClasses?.find(c => c.id === cls?.id)
    ) || [];
    
    const grades = classSubmissions
      .filter(sub => sub.grade !== null)
      .map(sub => parseFloat(sub.grade || "0"));
    
    const averageGrade = grades.length > 0 
      ? grades.reduce((a, b) => a + b, 0) / grades.length 
      : 0;
    
    const pendingCount = classSubmissions.filter(sub => !sub.isReviewed).length;
    const progressPercentage = Math.min(100, averageGrade * 10);
    
    return {
      name: cls?.subject || "Matéria",
      professor: "Professor", // We don't have teacher name in current data structure
      pendingCount,
      averageGrade: Math.round(averageGrade * 10) / 10,
      progressPercentage,
      status: getStatusFromGrade(averageGrade)
    };
  });

  // Create upcoming activities (mock for now since we need to fetch all activities)
  const upcomingActivities: ActivityData[] = [
    {
      id: "1",
      title: "Prova de Equações do 2º Grau",
      subject: "Matemática",
      dueDate: "Em 2 dias"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Olá, {user?.name?.split(' ')[0]}! 👋</h2>
        <span className="text-sm text-muted-foreground">Última atividade: há 2 dias</span>
      </div>
      
      {subjects.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Você ainda não está matriculado em nenhuma turma.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card key={subject.name} className="card-hover" data-testid={`card-subject-${subject.name.toLowerCase()}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{subject.name}</h3>
                  <div className={`w-3 h-3 ${statusColors[subject.status]} rounded-full`}></div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{subject.professor}</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Atividades pendentes</span>
                    <span className={`font-medium ${gradeColors[subject.status]}`}>
                      {subject.pendingCount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nota média</span>
                    <span className={`font-medium ${gradeColors[subject.status]}`}>
                      {subject.averageGrade || "N/A"}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${subject.progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Próximas Atividades</h3>
          <div className="space-y-3">
            {upcomingActivities.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">Nenhuma atividade pendente</p>
            ) : (
              upcomingActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center justify-between p-3 bg-muted rounded-md"
                  data-testid={`activity-${activity.id}`}
                >
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.subject}</p>
                  </div>
                  <span className="text-sm text-warning font-medium">{activity.dueDate}</span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
