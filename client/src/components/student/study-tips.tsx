import { Card, CardContent } from "@/components/ui/card";
import { Calculator, BookOpen, Clock, Map } from "lucide-react";

const studyTips = [
  {
    id: 1,
    title: "Técnica Pomodoro para Matemática",
    description: "Estude matemática em blocos de 25 minutos com pausas de 5 minutos. Isso melhora a concentração e retenção.",
    subject: "Matemática",
    icon: Calculator
  },
  {
    id: 2,
    title: "Leitura Ativa em Português",
    description: "Faça anotações, questione o texto e conecte com conhecimentos prévios para melhor compreensão.",
    subject: "Português",
    icon: BookOpen
  },
  {
    id: 3,
    title: "Cronograma de Revisão",
    description: "Revise o conteúdo em intervalos: 1 dia, 1 semana, 1 mês após o primeiro estudo.",
    subject: "Geral",
    icon: Clock
  },
  {
    id: 4,
    title: "Mapas Mentais em História",
    description: "Crie conexões visuais entre eventos históricos para facilitar a memorização.",
    subject: "História",
    icon: Map
  }
];

export default function StudentStudyTips() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dicas de Estudo</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {studyTips.map((tip) => {
          const Icon = tip.icon;
          return (
            <Card key={tip.id} className="card-hover" data-testid={`tip-${tip.id}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{tip.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{tip.description}</p>
                    <span className="inline-block bg-muted px-2 py-1 rounded-full text-xs font-medium">
                      {tip.subject}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
