import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const recentActivities = [
  {
    title: "Prova de Equações",
    className: "9º Ano A",
    date: "10/12/2024",
    averageGrade: 8.2,
    status: "completed" as const
  },
  {
    title: "Exercícios de Trigonometria",
    className: "8º Ano B", 
    date: "08/12/2024",
    averageGrade: 7.8,
    status: "reviewing" as const
  },
  {
    title: "Trabalho de Geometria",
    className: "9º Ano A",
    date: "05/12/2024",
    averageGrade: 9.1,
    status: "completed" as const
  },
  {
    title: "Lista de Álgebra",
    className: "8º Ano A",
    date: "03/12/2024",
    averageGrade: 7.5,
    status: "completed" as const
  },
  {
    title: "Prova de Funções",
    className: "9º Ano B",
    date: "01/12/2024",
    averageGrade: 8.8,
    status: "completed" as const
  },
  {
    title: "Exercícios de Estatística",
    className: "8º Ano B",
    date: "28/11/2024",
    averageGrade: 6.9,
    status: "completed" as const
  }
];

const statusConfig = {
  completed: { variant: "default" as const, label: "Finalizada" },
  reviewing: { variant: "secondary" as const, label: "Em Revisão" }
};

const gradeDistribution = [
  { range: "9-10", percentage: 35, color: "bg-success" },
  { range: "7-8", percentage: 45, color: "bg-accent" },
  { range: "5-6", percentage: 15, color: "bg-warning" },
  { range: "0-4", percentage: 5, color: "bg-destructive" }
];

const participationData = {
  submitted: 78,
  notSubmitted: 22
};

const classStatistics = [
  {
    className: "9º Ano A",
    totalStudents: 32,
    averageGrade: 8.4,
    submissionRate: 87,
    bestGrade: 9.8,
    worstGrade: 6.2
  },
  {
    className: "9º Ano B",
    totalStudents: 28,
    averageGrade: 8.1,
    submissionRate: 82,
    bestGrade: 9.5,
    worstGrade: 5.8
  },
  {
    className: "8º Ano A",
    totalStudents: 30,
    averageGrade: 7.6,
    submissionRate: 73,
    bestGrade: 9.2,
    worstGrade: 5.1
  },
  {
    className: "8º Ano B",
    totalStudents: 26,
    averageGrade: 7.3,
    submissionRate: 69,
    bestGrade: 8.9,
    worstGrade: 4.8
  }
];

const subjectPerformance = [
  { subject: "Matemática", average: 8.2, color: "bg-blue-500" },
  { subject: "Português", average: 7.8, color: "bg-purple-500" },
  { subject: "Ciências", average: 8.5, color: "bg-green-500" },
  { subject: "História", average: 7.4, color: "bg-yellow-500" },
  { subject: "Geografia", average: 7.6, color: "bg-orange-500" }
];

export default function TeacherReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Relatórios e Análises</h2>
        <div className="flex space-x-2">
          <Select defaultValue="all-classes">
            <SelectTrigger className="w-40" data-testid="select-class-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-classes">Todas as Turmas</SelectItem>
              <SelectItem value="9a">9º Ano A</SelectItem>
              <SelectItem value="8b">8º Ano B</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="last-month">
            <SelectTrigger className="w-40" data-testid="select-period-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-month">Último mês</SelectItem>
              <SelectItem value="last-quarter">Último trimestre</SelectItem>
              <SelectItem value="school-year">Ano letivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Desempenho Geral</h3>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path 
                    className="text-muted stroke-current" 
                    strokeWidth="2" 
                    fill="none" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path 
                    className="text-accent stroke-current" 
                    strokeWidth="2" 
                    strokeDasharray="85, 100" 
                    strokeLinecap="round" 
                    fill="none" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">8.5</span>
                </div>
              </div>
              <p className="text-muted-foreground">Nota Média Geral</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Distribuição de Notas</h3>
            <div className="space-y-2">
              {gradeDistribution.map((item) => (
                <div key={item.range} className="flex items-center justify-between">
                  <span className="text-sm">{item.range}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full transition-all duration-300`} 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Taxa de Participação</h3>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path 
                    className="text-muted stroke-current" 
                    strokeWidth="3.5" 
                    fill="none" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path 
                    className="text-success stroke-current" 
                    strokeWidth="3.5" 
                    strokeDasharray={`${participationData.submitted}, 100`}
                    strokeLinecap="round" 
                    fill="none" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">{participationData.submitted}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-xs text-muted-foreground">Entregaram ({participationData.submitted}%)</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted"></div>
                  <span className="text-xs text-muted-foreground">Não entregaram ({participationData.notSubmitted}%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Evolução Temporal</h3>
            <div className="h-40 relative">
              <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-around px-2 pb-8">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-full bg-accent rounded-t-md transition-all hover:opacity-80" style={{ height: '60%' }}></div>
                  <span className="text-xs mt-2 text-muted-foreground">Set</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className="w-full bg-accent rounded-t-md transition-all hover:opacity-80" style={{ height: '70%' }}></div>
                  <span className="text-xs mt-2 text-muted-foreground">Out</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className="w-full bg-accent rounded-t-md transition-all hover:opacity-80" style={{ height: '85%' }}></div>
                  <span className="text-xs mt-2 text-muted-foreground">Nov</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className="w-full bg-success rounded-t-md transition-all hover:opacity-80" style={{ height: '90%' }}></div>
                  <span className="text-xs mt-2 text-muted-foreground">Dez</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance Card */}
      <Card>
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Desempenho por Disciplina</h3>
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            {subjectPerformance.map((item) => (
              <div key={item.subject} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.subject}</span>
                  <span className="text-sm font-semibold text-foreground">{item.average}</span>
                </div>
                <div className="relative w-full bg-muted rounded-full h-3">
                  <div 
                    className={`${item.color} h-3 rounded-full transition-all duration-300`} 
                    style={{ width: `${(item.average / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Class Statistics Table */}
      <Card>
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Estatísticas por Turma</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium text-sm">Turma</th>
                <th className="text-left p-4 font-medium text-sm">Total Alunos</th>
                <th className="text-left p-4 font-medium text-sm">Média Geral</th>
                <th className="text-left p-4 font-medium text-sm">Taxa de Entrega</th>
                <th className="text-left p-4 font-medium text-sm">Melhor Nota</th>
                <th className="text-left p-4 font-medium text-sm">Pior Nota</th>
              </tr>
            </thead>
            <tbody>
              {classStatistics.map((classData, index) => (
                <tr key={index} className="border-b border-border" data-testid={`class-stats-row-${index}`}>
                  <td className="p-4 font-medium">{classData.className}</td>
                  <td className="p-4">{classData.totalStudents}</td>
                  <td className="p-4">
                    <span className="text-success font-medium">{classData.averageGrade}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${classData.submissionRate}%` }}
                        />
                      </div>
                      <span className="text-sm">{classData.submissionRate}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-success">{classData.bestGrade}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-destructive">{classData.worstGrade}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Activities */}
      <Card>
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Atividades Recentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium text-sm">Atividade</th>
                <th className="text-left p-4 font-medium text-sm">Turma</th>
                <th className="text-left p-4 font-medium text-sm">Data</th>
                <th className="text-left p-4 font-medium text-sm">Nota Média</th>
                <th className="text-left p-4 font-medium text-sm">Status</th>
                <th className="text-left p-4 font-medium text-sm">Ações</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity, index) => (
                <tr key={index} className="border-b border-border" data-testid={`activity-row-${index}`}>
                  <td className="p-4">{activity.title}</td>
                  <td className="p-4">{activity.className}</td>
                  <td className="p-4">{activity.date}</td>
                  <td className="p-4">
                    <span className="text-success font-medium">{activity.averageGrade}</span>
                  </td>
                  <td className="p-4">
                    <Badge variant={statusConfig[activity.status].variant}>
                      {statusConfig[activity.status].label}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <button 
                      className="text-accent hover:text-accent/80 text-sm"
                      data-testid={`button-view-details-${index}`}
                    >
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
