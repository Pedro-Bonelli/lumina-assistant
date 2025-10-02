import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Moon, CheckCircle, User } from "lucide-react";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    activitySubmissions: true,
    correctionReminders: false,
    weeklyReports: true,
  });

  const [correctionSettings, setCorrectionSettings] = useState({
    autoApproval: false,
    strictGrading: true,
    detailedFeedback: true,
    showScoreToStudents: true,
  });

  const [localTheme, setLocalTheme] = useState<'light' | 'dark' | 'system'>(theme);

  useEffect(() => {
    setLocalTheme(theme);
  }, [theme]);

  const handleSave = () => {
    setTheme(localTheme);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setLocalTheme(theme);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-testid="dialog-settings">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <User className="h-6 w-6" />
            Configurações
          </DialogTitle>
          <DialogDescription>
            Personalize suas preferências e configurações da plataforma.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Informações do Perfil</h3>
            </div>
            <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
              <div>
                <Label className="text-sm text-muted-foreground">Nome</Label>
                <p className="text-base font-medium" data-testid="text-profile-name">
                  {user?.name || "Professor"}
                </p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Email</Label>
                <p className="text-base font-medium" data-testid="text-profile-email">
                  {user?.email || "professor@lumina.com"}
                </p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Tipo de Conta</Label>
                <p className="text-base font-medium" data-testid="text-profile-type">
                  Professor
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Tema</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="theme-light" className="flex flex-col gap-1 cursor-pointer">
                  <span className="font-medium">Modo Claro</span>
                  <span className="text-sm text-muted-foreground">Interface com fundo claro</span>
                </Label>
                <Switch
                  id="theme-light"
                  checked={localTheme === 'light'}
                  onCheckedChange={(checked) => checked && setLocalTheme('light')}
                  data-testid="switch-theme-light"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="theme-dark" className="flex flex-col gap-1 cursor-pointer">
                  <span className="font-medium">Modo Escuro</span>
                  <span className="text-sm text-muted-foreground">Interface com fundo escuro</span>
                </Label>
                <Switch
                  id="theme-dark"
                  checked={localTheme === 'dark'}
                  onCheckedChange={(checked) => checked && setLocalTheme('dark')}
                  data-testid="switch-theme-dark"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="theme-system" className="flex flex-col gap-1 cursor-pointer">
                  <span className="font-medium">Automático</span>
                  <span className="text-sm text-muted-foreground">Usar preferência do sistema</span>
                </Label>
                <Switch
                  id="theme-system"
                  checked={localTheme === 'system'}
                  onCheckedChange={(checked) => checked && setLocalTheme('system')}
                  data-testid="switch-theme-system"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Notificações</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="flex flex-col gap-1 cursor-pointer">
                  <span className="font-medium">Notificações por Email</span>
                  <span className="text-sm text-muted-foreground">Receber atualizações por email</span>
                </Label>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                  }
                  data-testid="switch-email-notifications"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="activity-submissions" className="flex flex-col gap-1 cursor-pointer">
                  <span className="font-medium">Submissões de Atividades</span>
                  <span className="text-sm text-muted-foreground">Notificar quando alunos enviarem atividades</span>
                </Label>
                <Switch
                  id="activity-submissions"
                  checked={notificationSettings.activitySubmissions}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, activitySubmissions: checked })
                  }
                  data-testid="switch-activity-submissions"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="correction-reminders" className="flex flex-col gap-1 cursor-pointer">
                  <span className="font-medium">Lembretes de Correção</span>
                  <span className="text-sm text-muted-foreground">Lembrar de atividades pendentes de correção</span>
                </Label>
                <Switch
                  id="correction-reminders"
                  checked={notificationSettings.correctionReminders}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, correctionReminders: checked })
                  }
                  data-testid="switch-correction-reminders"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weekly-reports" className="flex flex-col gap-1 cursor-pointer">
                  <span className="font-medium">Relatórios Semanais</span>
                  <span className="text-sm text-muted-foreground">Receber resumo semanal de atividades</span>
                </Label>
                <Switch
                  id="weekly-reports"
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                  }
                  data-testid="switch-weekly-reports"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Preferências de Correção</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-approval" className="flex flex-col gap-1 cursor-pointer">
                  <span className="font-medium">Auto-aprovação</span>
                  <span className="text-sm text-muted-foreground">Aprovar automaticamente atividades com nota alta</span>
                </Label>
                <Switch
                  id="auto-approval"
                  checked={correctionSettings.autoApproval}
                  onCheckedChange={(checked) =>
                    setCorrectionSettings({ ...correctionSettings, autoApproval: checked })
                  }
                  data-testid="switch-auto-approval"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="strict-grading" className="flex flex-col gap-1 cursor-pointer">
                  <span className="font-medium">Critérios Rigorosos</span>
                  <span className="text-sm text-muted-foreground">Aplicar critérios de avaliação mais rigorosos</span>
                </Label>
                <Switch
                  id="strict-grading"
                  checked={correctionSettings.strictGrading}
                  onCheckedChange={(checked) =>
                    setCorrectionSettings({ ...correctionSettings, strictGrading: checked })
                  }
                  data-testid="switch-strict-grading"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="detailed-feedback" className="flex flex-col gap-1 cursor-pointer">
                  <span className="font-medium">Feedback Detalhado</span>
                  <span className="text-sm text-muted-foreground">Gerar feedback detalhado automaticamente</span>
                </Label>
                <Switch
                  id="detailed-feedback"
                  checked={correctionSettings.detailedFeedback}
                  onCheckedChange={(checked) =>
                    setCorrectionSettings({ ...correctionSettings, detailedFeedback: checked })
                  }
                  data-testid="switch-detailed-feedback"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-score" className="flex flex-col gap-1 cursor-pointer">
                  <span className="font-medium">Mostrar Nota aos Alunos</span>
                  <span className="text-sm text-muted-foreground">Exibir nota imediatamente após correção</span>
                </Label>
                <Switch
                  id="show-score"
                  checked={correctionSettings.showScoreToStudents}
                  onCheckedChange={(checked) =>
                    setCorrectionSettings({ ...correctionSettings, showScoreToStudents: checked })
                  }
                  data-testid="switch-show-score"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            data-testid="button-cancel-settings"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            data-testid="button-save-settings"
          >
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
