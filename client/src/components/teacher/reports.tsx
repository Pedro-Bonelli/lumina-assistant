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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <h3 className="text-lg font-semibold mb-4">Evolução Temporal</h3>
            <div className="h-64 relative">
              <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-around px-4 pb-8">
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

      {/* Detailed Reports */}
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
