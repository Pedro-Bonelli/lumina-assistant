import { Card, CardContent } from "@/components/ui/card";

const subjects = [
  {
    name: "Matemática",
    professor: "Prof. Ana Silva",
    pendingCount: 2,
    averageGrade: 8.5,
    progressPercentage: 85,
    status: "warning" as const
  },
  {
    name: "Português",
    professor: "Prof. Carlos Oliveira",
    pendingCount: 0,
    averageGrade: 9.2,
    progressPercentage: 92,
    status: "success" as const
  },
  {
    name: "História",
    professor: "Prof. Lucia Ferreira",
    pendingCount: 1,
    averageGrade: 6.8,
    progressPercentage: 68,
    status: "error" as const
  }
];

const upcomingActivities = [
  {
    title: "Prova de Álgebra Linear",
    subject: "Matemática",
    dueDate: "Amanhã"
  },
  {
    title: "Redação Dissertativa",
    subject: "Português",
    dueDate: "Em 3 dias"
  }
];

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

export default function StudentHome() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Olá, João! 👋</h2>
        <span className="text-sm text-muted-foreground">Última atividade: há 2 dias</span>
      </div>
      
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
                    {subject.averageGrade}
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

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Próximas Atividades</h3>
          <div className="space-y-3">
            {upcomingActivities.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-muted rounded-md"
                data-testid={`activity-${index}`}
              >
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.subject}</p>
                </div>
                <span className="text-sm text-warning font-medium">{activity.dueDate}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
