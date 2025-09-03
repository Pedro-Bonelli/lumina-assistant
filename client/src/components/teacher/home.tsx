import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Clock, TrendingUp, Star } from "lucide-react";

interface TeacherHomeProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { label: "Total de Alunos", value: "124", icon: Users, color: "text-accent" },
  { label: "Correções Pendentes", value: "3", icon: Clock, color: "text-warning" },
  { label: "Atividades Este Mês", value: "47", icon: TrendingUp, color: "text-success" },
  { label: "Nota Média", value: "8.7", icon: Star, color: "text-accent" },
];

const classes = [
  {
    name: "9º Ano A",
    studentCount: 28,
    pendingCount: 2,
    subject: "Matemática",
    status: "warning" as const
  },
  {
    name: "8º Ano B",
    studentCount: 25,
    pendingCount: 0,
    subject: "Matemática",
    status: "success" as const
  },
  {
    name: "7º Ano C",
    studentCount: 30,
    pendingCount: 1,
    subject: "Matemática",
    status: "warning" as const
  }
];

const statusConfig = {
  success: { badge: "bg-success/10 text-success", text: "Em dia" },
  warning: { badge: "bg-warning/10 text-warning", text: "2 pendentes" },
  error: { badge: "bg-destructive/10 text-destructive", text: "Atrasado" }
};

export default function TeacherHome({ onNavigate }: TeacherHomeProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Bem-vinda, Prof. Maria! 👋</h2>
          <p className="text-muted-foreground">Você tem 3 correções pendentes</p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((classItem) => (
              <Card key={classItem.name} className="card-hover" data-testid={`class-${classItem.name.replace(/\s+/g, '-').toLowerCase()}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">{classItem.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusConfig[classItem.status].badge}`}>
                      {statusConfig[classItem.status].text}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Alunos</span>
                      <span className="font-medium">{classItem.studentCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Atividades</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Correções pendentes</span>
                      <span className={`font-medium ${classItem.status === 'warning' ? 'text-warning' : 'text-success'}`}>
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
        </CardContent>
      </Card>
    </div>
  );
}
