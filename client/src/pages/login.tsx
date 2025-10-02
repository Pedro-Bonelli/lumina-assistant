import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { University, Presentation, Bus } from "lucide-react";
import luminaLogo from "@assets/lumina_logo_v2_1759417231276.png";

export default function LoginPage() {
  const [, setLocation] = useLocation();

  const handleUserTypeSelect = (userType: 'student' | 'teacher' | 'manager') => {
    // In a real app, you'd handle authentication here
    setLocation(`/${userType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img src={luminaLogo} alt="Lumina Assistant" className="h-8 w-8" />
              <span className="text-2xl font-bold text-foreground">Lumina Assistant</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground">Escolha seu perfil</h2>
            <p className="mt-2 text-muted-foreground">Selecione como você deseja acessar a plataforma</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => handleUserTypeSelect('student')}
              className="w-full h-auto p-6 justify-start bg-muted hover:bg-muted/80 text-foreground"
              variant="ghost"
              data-testid="button-student-login"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <University className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Sou Aluno</h3>
                  <p className="text-sm text-muted-foreground">Acesse suas atividades e relatórios</p>
                </div>
              </div>
            </Button>

            <Button
              onClick={() => handleUserTypeSelect('teacher')}
              className="w-full h-auto p-6 justify-start bg-muted hover:bg-muted/80 text-foreground"
              variant="ghost"
              data-testid="button-teacher-login"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Presentation className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Sou Professor</h3>
                  <p className="text-sm text-muted-foreground">Gerencie atividades e correções</p>
                </div>
              </div>
            </Button>

            <Button
              onClick={() => handleUserTypeSelect('manager')}
              className="w-full h-auto p-6 justify-start bg-muted hover:bg-muted/80 text-foreground"
              variant="ghost"
              data-testid="button-manager-login"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Bus className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Sou Gestor</h3>
                  <p className="text-sm text-muted-foreground">Administre a instituição e relatórios</p>
                </div>
              </div>
            </Button>
          </div>

          <div className="text-center mt-6">
            <Link href="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground" data-testid="link-back-to-home">
                ← Voltar para página inicial
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
