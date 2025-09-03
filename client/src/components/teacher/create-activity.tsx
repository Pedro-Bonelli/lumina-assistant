import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, Edit3 } from "lucide-react";

interface CreateActivityProps {
  onBack: () => void;
}

const steps = [
  { id: 1, title: "Informações Básicas", completed: true },
  { id: 2, title: "Upload/Criação", completed: false },
  { id: 3, title: "Critérios", completed: false },
  { id: 4, title: "Revisão", completed: false }
];

export default function CreateActivity({ onBack }: CreateActivityProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="activity-title" className="text-sm font-medium">Nome da Atividade</Label>
              <Input 
                id="activity-title"
                placeholder="Ex: Prova de Equações do 2º Grau" 
                className="mt-2"
                data-testid="input-activity-title"
              />
            </div>
            <div>
              <Label htmlFor="activity-class" className="text-sm font-medium">Turma</Label>
              <Select>
                <SelectTrigger className="mt-2" data-testid="select-class">
                  <SelectValue placeholder="Selecione uma turma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9a">9º Ano A - Matemática</SelectItem>
                  <SelectItem value="8b">8º Ano B - Matemática</SelectItem>
                  <SelectItem value="7c">7º Ano C - Matemática</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="due-date" className="text-sm font-medium">Data de Entrega</Label>
              <Input 
                id="due-date"
                type="date" 
                className="mt-2"
                data-testid="input-due-date"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">Arraste e solte seu arquivo aqui</p>
              <p className="text-sm text-muted-foreground">ou</p>
              <Button variant="outline" className="mt-2" data-testid="button-select-file">
                Selecionar Arquivo
              </Button>
            </div>
            <div className="text-center">
              <span className="text-muted-foreground">ou</span>
            </div>
            <Button 
              variant="outline" 
              className="w-full border-border p-4 h-auto"
              data-testid="button-create-online"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Criar Atividade Online
            </Button>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="max-grade" className="text-sm font-medium">Nota Máxima</Label>
              <Input 
                id="max-grade"
                type="number" 
                placeholder="10" 
                min="1" 
                max="10" 
                className="mt-2"
                data-testid="input-max-grade"
              />
            </div>
            <div>
              <Label htmlFor="criteria" className="text-sm font-medium">Critérios de Correção</Label>
              <Textarea 
                id="criteria"
                placeholder="Descreva os critérios específicos para correção desta atividade..." 
                className="mt-2 h-32"
                data-testid="textarea-criteria"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="allow-partial" className="rounded border-border" />
              <Label htmlFor="allow-partial" className="text-sm">Permitir pontuação parcial</Label>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <h5 className="font-semibold mb-2">Resumo da Atividade</h5>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Título:</span> Prova de Álgebra Linear</p>
                <p><span className="font-medium">Turma:</span> 9º Ano A</p>
                <p><span className="font-medium">Data:</span> 15/12/2024</p>
                <p><span className="font-medium">Nota Máxima:</span> 10</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const canProceed = currentStep < 4;
  const canGoBack = currentStep > 1;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Button 
          onClick={onBack} 
          variant="ghost" 
          className="mb-4"
          data-testid="button-back-to-activities"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar às atividades
        </Button>
        <h2 className="text-2xl font-bold text-foreground">Nova Atividade</h2>
      </div>

      {/* Step Progress */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step.id <= currentStep 
                  ? 'bg-secondary text-secondary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step.id}
              </div>
              <span className={`text-sm font-medium ${
                step.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-px bg-border mx-4"></div>
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <Card>
        <CardContent className="p-8">
          {renderStepContent()}
          
          <div className="flex justify-between mt-8">
            {canGoBack && (
              <Button 
                onClick={() => setCurrentStep(prev => prev - 1)} 
                variant="outline"
                data-testid="button-previous-step"
              >
                Voltar
              </Button>
            )}
            <div className="flex space-x-4 ml-auto">
              {canProceed ? (
                <Button 
                  onClick={() => setCurrentStep(prev => prev + 1)} 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  data-testid="button-next-step"
                >
                  Próximo
                </Button>
              ) : (
                <Button 
                  onClick={onBack}
                  className="bg-success hover:bg-success/90 text-success-foreground"
                  data-testid="button-create-activity"
                >
                  Criar Atividade
                </Button>
              )}
              <Button 
                onClick={onBack} 
                variant="outline"
                data-testid="button-cancel"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
