import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, Search } from "lucide-react";
import type { ClassReportData, SubjectGrade } from "@/lib/types";

const topSubjects: SubjectGrade[] = [
  { subject: "Português", grade: 8.4 },
  { subject: "História", grade: 8.2 },
  { subject: "Matemática", grade: 7.9 },
  { subject: "Ciências", grade: 7.5 },
  { subject: "Geografia", grade: 7.3 },
];

const institutionClasses: ClassReportData[] = [
  {
    name: "9º Ano A",
    teacher: "Maria Santos",
    studentCount: 28,
    average: 8.5,
    activitiesCount: 12,
    status: "excellent"
  },
  {
    name: "8º Ano B", 
    teacher: "João Silva",
    studentCount: 25,
    average: 7.8,
    activitiesCount: 10,
    status: "good"
  },
  {
    name: "7º Ano C",
    teacher: "Ana Oliveira", 
    studentCount: 30,
    average: 7.2,
    activitiesCount: 8,
    status: "attention"
  },
  {
    name: "6º Ano A",
    teacher: "Carlos Costa",
    studentCount: 32,
    average: 8.1,
    activitiesCount: 15,
    status: "excellent"
  },
  {
    name: "9º Ano B",
    teacher: "Lucia Ferreira", 
    studentCount: 27,
    average: 6.8,
    activitiesCount: 9,
    status: "attention"
  }
];

const statusConfig = {
  excellent: { variant: "default" as const, label: "Excelente", color: "text-success" },
  good: { variant: "secondary" as const, label: "Bom", color: "text-accent" },
  attention: { variant: "destructive" as const, label: "Atenção", color: "text-warning" },
  poor: { variant: "outline" as const, label: "Crítico", color: "text-destructive" }
};

export default function ManagerReports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof ClassReportData>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof ClassReportData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedClasses = institutionClasses
    .filter(classItem =>
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Relatórios Avançados</h2>
        <div className="flex space-x-2">
          <Select defaultValue="december-2024">
            <SelectTrigger className="w-48" data-testid="select-period">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="december-2024">Período: Dezembro 2024</SelectItem>
              <SelectItem value="november-2024">Novembro 2024</SelectItem>
              <SelectItem value="q4-2024">Trimestre 4</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            data-testid="button-export-report"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Comprehensive Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Institucional</h3>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path 
                    className="text-muted stroke-current" 
                    strokeWidth="3" 
                    fill="none" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path 
                    className="text-success stroke-current" 
                    strokeWidth="3" 
                    strokeDasharray="79, 100" 
                    strokeLinecap="round" 
                    fill="none" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">7.9</span>
                </div>
              </div>
              <p className="text-muted-foreground">Média Geral da Instituição</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Disciplinas</h3>
            <div className="space-y-3">
              {topSubjects.map((subject, index) => (
                <div 
                  key={subject.subject} 
                  className="flex items-center justify-between"
                  data-testid={`subject-ranking-${index + 1}`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm">{subject.subject}</span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    subject.grade >= 8 ? 'text-success' : 
                    subject.grade >= 7 ? 'text-accent' : 'text-warning'
                  }`}>
                    {subject.grade}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Evolution Chart */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Evolução do Desempenho</h3>
          <div className="h-64 bg-muted rounded-md flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl text-muted-foreground mb-4">📈</div>
              <p className="text-muted-foreground">Gráfico de evolução<br />do desempenho institucional</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Card>
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Análise Detalhada por Turma</h3>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-40"
                  data-testid="input-search-classes"
                />
              </div>
              <Button variant="outline" size="icon" data-testid="button-filter">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th 
                  className="text-left p-4 font-medium text-sm cursor-pointer hover:bg-muted/80"
                  onClick={() => handleSort('name')}
                  data-testid="header-class-name"
                >
                  Turma {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left p-4 font-medium text-sm cursor-pointer hover:bg-muted/80"
                  onClick={() => handleSort('teacher')}
                  data-testid="header-teacher"
                >
                  Professor {sortField === 'teacher' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left p-4 font-medium text-sm cursor-pointer hover:bg-muted/80"
                  onClick={() => handleSort('studentCount')}
                  data-testid="header-students"
                >
                  Alunos {sortField === 'studentCount' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left p-4 font-medium text-sm cursor-pointer hover:bg-muted/80"
                  onClick={() => handleSort('average')}
                  data-testid="header-average"
                >
                  Média {sortField === 'average' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left p-4 font-medium text-sm cursor-pointer hover:bg-muted/80"
                  onClick={() => handleSort('activitiesCount')}
                  data-testid="header-activities"
                >
                  Atividades {sortField === 'activitiesCount' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="text-left p-4 font-medium text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedClasses.map((classData, index) => (
                <tr 
                  key={classData.name} 
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                  data-testid={`class-row-${index}`}
                >
                  <td className="p-4 font-medium">{classData.name}</td>
                  <td className="p-4">{classData.teacher}</td>
                  <td className="p-4">{classData.studentCount}</td>
                  <td className="p-4">
                    <span className={`font-medium ${statusConfig[classData.status].color}`}>
                      {classData.average}
                    </span>
                  </td>
                  <td className="p-4">{classData.activitiesCount}</td>
                  <td className="p-4">
                    <Badge variant={statusConfig[classData.status].variant}>
                      {statusConfig[classData.status].label}
                    </Badge>
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
