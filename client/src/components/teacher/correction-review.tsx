import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Check, Edit } from "lucide-react";

interface CorrectionReviewProps {
  onBack: () => void;
}

const correctionData = {
  student: "João Silva",
  activity: "Prova de Equações do 2º Grau",
  finalGrade: "8.5",
  questions: [
    {
      id: 1,
      title: "Questão 1",
      score: "10/10",
      feedback: "Excelente! O aluno aplicou corretamente a fórmula e chegou ao resultado correto.",
      status: "correct" as const
    },
    {
      id: 2,
      title: "Questão 2", 
      score: "7/10",
      feedback: "Resultado correto, mas faltou mostrar o desenvolvimento do cálculo.",
      status: "partial" as const
    }
  ]
};

const statusConfig = {
  correct: { bg: "bg-success/10", border: "border-success/20", text: "text-success" },
  partial: { bg: "bg-warning/10", border: "border-warning/20", text: "text-warning" },
  incorrect: { bg: "bg-destructive/10", border: "border-destructive/20", text: "text-destructive" }
};

export default function CorrectionReview({ onBack }: CorrectionReviewProps) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Button 
          onClick={onBack} 
          variant="ghost" 
          className="mb-4"
          data-testid="button-back-to-activities"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar às atividades
        </Button>
        <h2 className="text-2xl font-bold text-foreground">Revisão de Correções</h2>
        <p className="text-muted-foreground">{correctionData.activity} - {correctionData.student}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        {/* Student Answer */}
        <Card className="h-full">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Resposta do Aluno</h3>
          </div>
          <CardContent className="p-6 h-full overflow-auto bg-muted/30">
            <div className="bg-card p-6 rounded-lg shadow-sm min-h-96 border-2 border-dashed border-border">
              <p className="text-sm text-muted-foreground mb-4">Questão 1: Resolva a equação x² - 5x + 6 = 0</p>
              <div className="text-foreground font-mono text-sm leading-relaxed space-y-1">
                <p>x² - 5x + 6 = 0</p>
                <p>a = 1, b = -5, c = 6</p>
                <p>Δ = b² - 4ac</p>
                <p>Δ = (-5)² - 4(1)(6)</p>
                <p>Δ = 25 - 24 = 1</p>
                <p>x = (5 ± √1)/2</p>
                <p>x₁ = 3, x₂ = 2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Validation Panel */}
        <Card className="h-full">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Painel de Validação</h3>
          </div>
          <CardContent className="p-6 space-y-6 overflow-auto">
            <div className="bg-success/10 p-4 rounded-lg border border-success/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-success">Análise da IA</span>
                <span className="text-sm font-bold text-success">Nota sugerida: {correctionData.finalGrade}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Resolução correta com metodologia adequada. Pequeno erro de apresentação no cálculo do discriminante.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Critérios de Avaliação</label>
                <div className="space-y-3">
                  {correctionData.questions.map((question) => (
                    <div 
                      key={question.id} 
                      className={`p-4 rounded-lg border ${statusConfig[question.status].bg} ${statusConfig[question.status].border}`}
                      data-testid={`question-${question.id}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{question.title}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${statusConfig[question.status].text}`}>
                            {question.score}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs"
                            data-testid={`button-edit-question-${question.id}`}
                          >
                            Editar
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{question.feedback}</p>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="bg-success text-success-foreground hover:bg-success/90"
                          data-testid={`button-accept-question-${question.id}`}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Aceitar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          data-testid={`button-edit-correction-${question.id}`}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Comentários Adicionais</label>
                <Textarea 
                  className="resize-none" 
                  rows={4} 
                  placeholder="Adicione observações para o aluno..."
                  data-testid="textarea-comments"
                />
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Nota Final Sugerida:</span>
                  <span className="text-2xl font-bold text-success">{correctionData.finalGrade}/10</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                  data-testid="button-approve-all"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Aprovar Todas
                </Button>
                <Button 
                  variant="outline" 
                  className="px-6"
                  data-testid="button-next-student"
                >
                  Próximo Aluno
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
