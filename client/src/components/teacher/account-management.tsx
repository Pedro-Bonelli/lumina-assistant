import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

const tabs = [
  { id: 'classes', label: 'Turmas', count: 3 },
  { id: 'students', label: 'Alunos', count: 85 },
];

const teacherClasses = [
  {
    id: "1",
    name: "9º Ano A",
    subject: "Matemática",
    studentCount: 28,
    schedule: "Seg, Qua, Sex - 08:00"
  },
  {
    id: "2", 
    name: "8º Ano B",
    subject: "Matemática",
    studentCount: 25,
    schedule: "Ter, Qui - 10:00"
  },
  {
    id: "3",
    name: "7º Ano C", 
    subject: "Matemática",
    studentCount: 30,
    schedule: "Seg, Qua - 14:00"
  }
];

const students = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@aluno.com",
    className: "9º Ano A",
    averageGrade: 8.5,
    status: "active" as const
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao.santos@aluno.com", 
    className: "9º Ano A",
    averageGrade: 7.2,
    status: "active" as const
  },
  {
    id: "3",
    name: "Maria Oliveira",
    email: "maria.oliveira@aluno.com",
    className: "8º Ano B", 
    averageGrade: 9.1,
    status: "active" as const
  },
  {
    id: "4",
    name: "Pedro Costa",
    email: "pedro.costa@aluno.com",
    className: "8º Ano B",
    averageGrade: 6.8,
    status: "active" as const
  }
];

const statusConfig = {
  active: { variant: "default" as const, label: "Ativo" },
  inactive: { variant: "secondary" as const, label: "Inativo" }
};

export default function TeacherAccountManagement() {
  const [activeTab, setActiveTab] = useState('classes');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Gerenciamento de Contas</h2>
      
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
          {activeTab === 'classes' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Suas Turmas</h3>
                <Button 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  data-testid="button-new-class"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Turma
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teacherClasses.map((classItem) => (
                  <Card key={classItem.id} className="card-hover" data-testid={`class-card-${classItem.id}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{classItem.name}</h4>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            data-testid={`button-edit-class-${classItem.id}`}
                          >
                            <Edit className="h-3 w-3 text-muted-foreground hover:text-accent" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            data-testid={`button-delete-class-${classItem.id}`}
                          >
                            <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="flex items-center">
                          <span className="mr-2">👥</span>
                          {classItem.studentCount} alunos
                        </p>
                        <p className="flex items-center">
                          <span className="mr-2">📚</span>
                          {classItem.subject}
                        </p>
                        <p className="flex items-center">
                          <span className="mr-2">📅</span>
                          {classItem.schedule}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Alunos</h3>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar aluno..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-60"
                      data-testid="input-search-students"
                    />
                  </div>
                  <Button 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    data-testid="button-new-student"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Aluno
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-medium text-sm">Nome</th>
                      <th className="text-left p-3 font-medium text-sm">Turma</th>
                      <th className="text-left p-3 font-medium text-sm">E-mail</th>
                      <th className="text-left p-3 font-medium text-sm">Nota Média</th>
                      <th className="text-left p-3 font-medium text-sm">Status</th>
                      <th className="text-left p-3 font-medium text-sm">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-border" data-testid={`student-row-${student.id}`}>
                        <td className="p-3 font-medium">{student.name}</td>
                        <td className="p-3 text-muted-foreground">{student.className}</td>
                        <td className="p-3 text-muted-foreground">{student.email}</td>
                        <td className="p-3">
                          <span className={`font-medium ${
                            student.averageGrade >= 8 ? 'text-success' : 
                            student.averageGrade >= 6 ? 'text-warning' : 'text-destructive'
                          }`}>
                            {student.averageGrade}
                          </span>
                        </td>
                        <td className="p-3">
                          <Badge variant={statusConfig[student.status].variant}>
                            {statusConfig[student.status].label}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-accent hover:text-accent/80"
                              data-testid={`button-edit-student-${student.id}`}
                            >
                              Editar
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-destructive"
                              data-testid={`button-remove-student-${student.id}`}
                            >
                              Remover
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
