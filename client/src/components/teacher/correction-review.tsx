import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Check, Edit, ChevronLeft, ChevronRight } from "lucide-react";

interface CorrectionReviewProps {
  onBack: () => void;
}

const students = [
  {
    name: "João Silva",
    activity: "Prova de Equações do 2º Grau",
    finalGrade: "8.5",
    questions: [
      {
        id: 1,
        title: "Questão 1",
        score: "10/10",
        feedback: "Excelente! O aluno aplicou corretamente a fórmula e chegou ao resultado correto.",
        status: "correct" as const,
        questionText: "Resolva a equação x² - 5x + 6 = 0",
        studentAnswer: [
          "x² - 5x + 6 = 0",
          "a = 1, b = -5, c = 6",
          "Δ = b² - 4ac",
          "Δ = (-5)² - 4(1)(6)",
          "Δ = 25 - 24 = 1",
          "x = (5 ± √1)/2",
          "x₁ = 3, x₂ = 2"
        ]
      },
      {
        id: 2,
        title: "Questão 2", 
        score: "7/10",
        feedback: "Resultado correto, mas faltou mostrar o desenvolvimento do cálculo.",
        status: "partial" as const,
        questionText: "Determine as raízes da equação 2x² - 8x + 6 = 0",
        studentAnswer: [
          "2x² - 8x + 6 = 0",
          "Dividindo por 2: x² - 4x + 3 = 0",
          "x₁ = 3, x₂ = 1"
        ]
      },
      {
        id: 3,
        title: "Questão 3",
        score: "8/10",
        feedback: "Boa resolução, mas poderia ter explicado melhor o raciocínio.",
        status: "partial" as const,
        questionText: "Resolva x² - 4x - 5 = 0 e verifique as raízes",
        studentAnswer: [
          "x² - 4x - 5 = 0",
          "a = 1, b = -4, c = -5",
          "Δ = 16 + 20 = 36",
          "x = (4 ± 6)/2",
          "x₁ = 5, x₂ = -1",
          "Verificação: 5² - 4(5) - 5 = 25 - 20 - 5 = 0 ✓"
        ]
      },
      {
        id: 4,
        title: "Questão 4",
        score: "9/10",
        feedback: "Excelente desenvolvimento e apresentação clara.",
        status: "correct" as const,
        questionText: "Para qual valor de k a equação x² - 6x + k = 0 tem raízes reais e iguais?",
        studentAnswer: [
          "Para raízes reais e iguais, Δ = 0",
          "Δ = b² - 4ac",
          "0 = (-6)² - 4(1)(k)",
          "0 = 36 - 4k",
          "4k = 36",
          "k = 9",
          "Portanto, k = 9"
        ]
      }
    ]
  },
  {
    name: "Maria Santos",
    activity: "Prova de Equações do 2º Grau",
    finalGrade: "9.2",
    questions: [
      {
        id: 1,
        title: "Questão 1",
        score: "10/10",
        feedback: "Perfeito! Demonstração completa e correta.",
        status: "correct" as const,
        questionText: "Resolva a equação x² - 5x + 6 = 0",
        studentAnswer: [
          "x² - 5x + 6 = 0",
          "a = 1, b = -5, c = 6",
          "Δ = b² - 4ac = (-5)² - 4(1)(6) = 25 - 24 = 1",
          "√Δ = 1",
          "x = (-b ± √Δ)/2a = (5 ± 1)/2",
          "x₁ = 6/2 = 3",
          "x₂ = 4/2 = 2",
          "S = {2, 3}"
        ]
      },
      {
        id: 2,
        title: "Questão 2",
        score: "9/10",
        feedback: "Muito bom, pequeno erro de notação.",
        status: "correct" as const,
        questionText: "Determine as raízes da equação 2x² - 8x + 6 = 0",
        studentAnswer: [
          "2x² - 8x + 6 = 0",
          "Simplificando: x² - 4x + 3 = 0",
          "Δ = 16 - 12 = 4",
          "x = (4 ± 2)/2",
          "x₁ = 3, x₂ = 1"
        ]
      },
      {
        id: 3,
        title: "Questão 3",
        score: "9/10",
        feedback: "Excelente resolução com todos os passos.",
        status: "correct" as const,
        questionText: "Resolva x² - 4x - 5 = 0 e verifique as raízes",
        studentAnswer: [
          "x² - 4x - 5 = 0",
          "Δ = (-4)² - 4(1)(-5) = 16 + 20 = 36",
          "x = (4 ± 6)/2",
          "x₁ = 10/2 = 5",
          "x₂ = -2/2 = -1",
          "Verificando x₁: 25 - 20 - 5 = 0 ✓",
          "Verificando x₂: 1 + 4 - 5 = 0 ✓"
        ]
      },
      {
        id: 4,
        title: "Questão 4",
        score: "9/10",
        feedback: "Ótima resposta, muito bem explicada.",
        status: "correct" as const,
        questionText: "Para qual valor de k a equação x² - 6x + k = 0 tem raízes reais e iguais?",
        studentAnswer: [
          "Condição para raízes iguais: Δ = 0",
          "Δ = b² - 4ac",
          "(-6)² - 4(1)(k) = 0",
          "36 - 4k = 0",
          "k = 9",
          "Resposta: k deve ser igual a 9"
        ]
      }
    ]
  },
  {
    name: "Pedro Oliveira",
    activity: "Prova de Equações do 2º Grau",
    finalGrade: "6.5",
    questions: [
      {
        id: 1,
        title: "Questão 1",
        score: "7/10",
        feedback: "Resposta parcialmente correta, faltou completar o raciocínio.",
        status: "partial" as const,
        questionText: "Resolva a equação x² - 5x + 6 = 0",
        studentAnswer: [
          "x² - 5x + 6 = 0",
          "Δ = 25 - 24 = 1",
          "x = (5 ± 1)/2",
          "x₁ = 3, x₂ = 2"
        ]
      },
      {
        id: 2,
        title: "Questão 2",
        score: "6/10",
        feedback: "Erro no cálculo do discriminante.",
        status: "partial" as const,
        questionText: "Determine as raízes da equação 2x² - 8x + 6 = 0",
        studentAnswer: [
          "2x² - 8x + 6 = 0",
          "a = 2, b = -8, c = 6",
          "Δ = 64 - 48 = 8",
          "x = (8 ± √8)/4"
        ]
      },
      {
        id: 3,
        title: "Questão 3",
        score: "6/10",
        feedback: "Resposta incompleta, faltou finalizar.",
        status: "partial" as const,
        questionText: "Resolva x² - 4x - 5 = 0 e verifique as raízes",
        studentAnswer: [
          "x² - 4x - 5 = 0",
          "Δ = 16 + 20 = 36",
          "x = (4 ± 6)/2",
          "x₁ = 5"
        ]
      },
      {
        id: 4,
        title: "Questão 4",
        score: "7/10",
        feedback: "Boa tentativa, mas com erro no desenvolvimento.",
        status: "partial" as const,
        questionText: "Para qual valor de k a equação x² - 6x + k = 0 tem raízes reais e iguais?",
        studentAnswer: [
          "Δ = 0",
          "36 - 4k = 0",
          "4k = 36",
          "k = 8"
        ]
      }
    ]
  }
];

const statusConfig = {
  correct: { bg: "bg-success/10", border: "border-success/20", text: "text-success" },
  partial: { bg: "bg-warning/10", border: "border-warning/20", text: "text-warning" },
  incorrect: { bg: "bg-destructive/10", border: "border-destructive/20", text: "text-destructive" }
};

export default function CorrectionReview({ onBack }: CorrectionReviewProps) {
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const correctionData = students[currentStudentIndex];

  const handleNextStudent = () => {
    if (currentStudentIndex < students.length - 1) {
      setCurrentStudentIndex(currentStudentIndex + 1);
    }
  };

  const handlePreviousStudent = () => {
    if (currentStudentIndex > 0) {
      setCurrentStudentIndex(currentStudentIndex - 1);
    }
  };

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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Revisão de Correções</h2>
            <p className="text-muted-foreground">{correctionData.activity} - {correctionData.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handlePreviousStudent}
              disabled={currentStudentIndex === 0}
              variant="outline"
              size="sm"
              data-testid="button-previous-student"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground px-3">
              Aluno {currentStudentIndex + 1} de {students.length}
            </span>
            <Button
              onClick={handleNextStudent}
              disabled={currentStudentIndex === students.length - 1}
              variant="outline"
              size="sm"
              data-testid="button-next-student"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        {/* Student Answer */}
        <Card className="h-full">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Respostas do Aluno</h3>
          </div>
          <CardContent className="p-6 h-full overflow-auto bg-muted/30">
            <div className="space-y-4">
              {correctionData.questions.map((question) => (
                <div 
                  key={question.id} 
                  className="bg-card p-6 rounded-lg shadow-sm border-2 border-border"
                  data-testid={`student-answer-${question.id}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-foreground">{question.title}</h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${statusConfig[question.status].bg} ${statusConfig[question.status].text}`}>
                      {question.score}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 pb-3 border-b border-border">
                    {question.questionText}
                  </p>
                  <div className="text-foreground font-mono text-sm leading-relaxed space-y-1">
                    {question.studentAnswer.map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Validation Panel */}
        <Card className="h-full flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Painel de Validação</h3>
          </div>
          <CardContent className="p-6 space-y-6 overflow-auto flex-1">
            {/* AI Analysis Summary */}
            <div className="bg-success/10 p-4 rounded-lg border border-success/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-success">Análise da IA</span>
                <span className="text-sm font-bold text-success">Nota sugerida: {correctionData.finalGrade}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Resolução correta com metodologia adequada. Pequeno erro de apresentação no cálculo do discriminante.
              </p>
            </div>

            {/* Evaluation Criteria Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">Critérios de Avaliação</h4>
                <span className="text-xs text-muted-foreground">{correctionData.questions.length} questões</span>
              </div>
              
              <div className="space-y-4">
                {correctionData.questions.map((question) => (
                  <div 
                    key={question.id} 
                    className={`rounded-lg border-2 ${statusConfig[question.status].border} ${statusConfig[question.status].bg} overflow-hidden`}
                    data-testid={`question-${question.id}`}
                  >
                    {/* Question Header */}
                    <div className="p-4 pb-3 bg-card/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">{question.title}</span>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${statusConfig[question.status].bg} ${statusConfig[question.status].text}`}>
                          {question.score}
                        </span>
                      </div>
                    </div>
                    
                    {/* Feedback Content */}
                    <div className="px-4 py-3 border-t border-border/50">
                      <p className="text-sm text-foreground/80 leading-relaxed">{question.feedback}</p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="px-4 py-3 bg-card/30 border-t border-border/50 flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-success text-success-foreground hover:bg-success/90"
                        data-testid={`button-accept-question-${question.id}`}
                      >
                        <Check className="h-3.5 w-3.5 mr-1.5" />
                        Aceitar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1"
                        data-testid={`button-edit-correction-${question.id}`}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1.5" />
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Comments */}
            <div className="pt-2">
              <label className="block text-sm font-semibold text-foreground mb-3">Comentários Adicionais</label>
              <Textarea 
                className="resize-none border-2" 
                rows={3} 
                placeholder="Adicione observações gerais para o aluno..."
                data-testid="textarea-comments"
              />
            </div>

            {/* Final Grade Section */}
            <div className="p-5 bg-success/5 rounded-lg border-2 border-success/20">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">Nota Final Sugerida</span>
                  <span className="text-3xl font-bold text-success">{correctionData.finalGrade}</span>
                  <span className="text-lg text-muted-foreground">/10</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    className="bg-success hover:bg-success/90 text-success-foreground"
                    data-testid="button-approve-all"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Aprovar Todas
                  </Button>
                  <Button 
                    onClick={handleNextStudent}
                    disabled={currentStudentIndex === students.length - 1}
                    variant="outline"
                    data-testid="button-next-student-bottom"
                  >
                    Próximo Aluno
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
