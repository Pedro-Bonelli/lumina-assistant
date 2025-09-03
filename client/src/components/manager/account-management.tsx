import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";

const tabs = [
  { id: 'professors', label: 'Professores', count: 24 },
  { id: 'classes', label: 'Turmas', count: 28 },
  { id: 'students', label: 'Alunos', count: 680 },
];

const professors = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@escola.com",
    classCount: 3,
    subjects: ["Matemática"],
    status: "active" as const
  },
  {
    id: "2",
    name: "Carlos Oliveira", 
    email: "carlos.oliveira@escola.com",
    classCount: 2,
    subjects: ["Português"],
    status: "active" as const
  },
  {
    id: "3",
    name: "Maria Santos",
    email: "maria.santos@escola.com", 
    classCount: 4,
    subjects: ["História", "Geografia"],
    status: "active" as const
  },
  {
    id: "4",
    name: "João Costa",
    email: "joao.costa@escola.com",
    classCount: 2,
    subjects: ["Ciências"],
    status: "inactive" as const
  }
];

const classes = [
  {
    id: "1",
    name: "9º Ano A - Matemática",
    teacher: "Ana Silva",
    studentCount: 32,
    average: 8.4,
    status: "excellent" as const
  },
  {
    id: "2", 
    name: "8º Ano B - Português",
    teacher: "Carlos Oliveira",
    studentCount: 28,
    average: 7.2,
    status: "attention" as const
  },
  {
    id: "3",
    name: "7º Ano A - História",
    teacher: "Maria Santos",
    studentCount: 30,
    average: 8.1,
    status: "good" as const
  },
  {
    id: "4",
    name: "9º Ano B - Matemática", 
    teacher: "Ana Silva",
    studentCount: 29,
    average: 7.8,
    status: "good" as const
  }
];

const students = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@aluno.com",
    studentId: "2024001",
    className: "9º Ano A",
    status: "active" as const
  },
  {
    id: "2",
    name: "Maria Santos", 
    email: "maria.santos@aluno.com",
    studentId: "2024002",
    className: "9º Ano A",
    status: "active" as const
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@aluno.com",
    studentId: "2024003", 
    className: "8º Ano B",
    status: "active" as const
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana.costa@aluno.com",
    studentId: "2024004",
    className: "7º Ano A", 
    status: "inactive" as const
  }
];

const statusConfig = {
  active: { variant: "default" as const, label: "Ativo" },
  inactive: { variant: "secondary" as const, label: "Inativo" },
  excellent: { variant: "default" as const, label: "Excelente" },
  good: { variant: "secondary" as const, label: "Bom" },
  attention: { variant: "destructive" as const, label: "Atenção" }
};

export default function ManagerAccountManagement() {
  const [activeTab, setActiveTab] = useState('professors');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfessors = professors.filter(professor =>
    professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClasses = classes.filter(classItem =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.includes(searchTerm)
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
          {/* Professors Tab */}
          {activeTab === 'professors' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar professor..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-60"
                      data-testid="input-search-professors"
                    />
                  </div>
                  <Select defaultValue="all-subjects">
                    <SelectTrigger className="w-40" data-testid="select-subject-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-subjects">Todas as matérias</SelectItem>
                      <SelectItem value="mathematics">Matemática</SelectItem>
                      <SelectItem value="portuguese">Português</SelectItem>
                      <SelectItem value="history">História</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  data-testid="button-add-professor"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Professor
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-medium text-sm">Nome</th>
                      <th className="text-left p-4 font-medium text-sm">E-mail</th>
                      <th className="text-left p-4 font-medium text-sm">Turmas</th>
                      <th className="text-left p-4 font-medium text-sm">Matérias</th>
                      <th className="text-left p-4 font-medium text-sm">Status</th>
                      <th className="text-left p-4 font-medium text-sm">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProfessors.map((professor) => (
                      <tr key={professor.id} className="border-b border-border" data-testid={`professor-row-${professor.id}`}>
                        <td className="p-4 font-medium">{professor.name}</td>
                        <td className="p-4 text-muted-foreground">{professor.email}</td>
                        <td className="p-4 text-muted-foreground">{professor.classCount}</td>
                        <td className="p-4 text-muted-foreground">{professor.subjects.join(", ")}</td>
                        <td className="p-4">
                          <Badge variant={statusConfig[professor.status].variant}>
                            {statusConfig[professor.status].label}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-secondary hover:text-secondary/80"
                              data-testid={`button-edit-professor-${professor.id}`}
                            >
                              Editar
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:text-destructive/80"
                              data-testid={`button-remove-professor-${professor.id}`}
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

          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar turma..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-60"
                      data-testid="input-search-classes"
                    />
                  </div>
                  <Select defaultValue="all-years">
                    <SelectTrigger className="w-40" data-testid="select-year-filter">
                      <SelectValue />
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
                <Button 
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  data-testid="button-create-class"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Turma
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-medium text-sm">Nome da Turma</th>
                      <th className="text-left p-4 font-medium text-sm">Professor</th>
                      <th className="text-left p-4 font-medium text-sm">Nº Estudantes</th>
                      <th className="text-left p-4 font-medium text-sm">Média</th>
                      <th className="text-left p-4 font-medium text-sm">Status</th>
                      <th className="text-left p-4 font-medium text-sm">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClasses.map((classItem) => (
                      <tr key={classItem.id} className="border-b border-border" data-testid={`class-row-${classItem.id}`}>
                        <td className="p-4 font-medium">{classItem.name}</td>
                        <td className="p-4 text-muted-foreground">{classItem.teacher}</td>
                        <td className="p-4 text-muted-foreground">{classItem.studentCount}</td>
                        <td className="p-4 font-medium text-success">{classItem.average}</td>
                        <td className="p-4">
                          <Badge variant={statusConfig[classItem.status].variant}>
                            {statusConfig[classItem.status].label}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-secondary hover:text-secondary/80"
                            data-testid={`button-manage-class-${classItem.id}`}
                          >
                            Gerenciar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-4">
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
                  <Select defaultValue="all-classes">
                    <SelectTrigger className="w-40" data-testid="select-class-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-classes">Todas as turmas</SelectItem>
                      <SelectItem value="9a">9º Ano A</SelectItem>
                      <SelectItem value="8b">8º Ano B</SelectItem>
                      <SelectItem value="7a">7º Ano A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  data-testid="button-add-student"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Aluno
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-medium text-sm">Nome</th>
                      <th className="text-left p-4 font-medium text-sm">E-mail</th>
                      <th className="text-left p-4 font-medium text-sm">ID</th>
                      <th className="text-left p-4 font-medium text-sm">Turma</th>
                      <th className="text-left p-4 font-medium text-sm">Status</th>
                      <th className="text-left p-4 font-medium text-sm">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-border" data-testid={`student-row-${student.id}`}>
                        <td className="p-4 font-medium">{student.name}</td>
                        <td className="p-4 text-muted-foreground">{student.email}</td>
                        <td className="p-4 text-muted-foreground">{student.studentId}</td>
                        <td className="p-4 text-muted-foreground">{student.className}</td>
                        <td className="p-4">
                          <Badge variant={statusConfig[student.status].variant}>
                            {statusConfig[student.status].label}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-secondary hover:text-secondary/80"
                            data-testid={`button-manage-student-${student.id}`}
                          >
                            Gerenciar
                          </Button>
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
