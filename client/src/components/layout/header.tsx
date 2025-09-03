import { Button } from "@/components/ui/button";
import { HelpCircle, Bell, LogOut } from "lucide-react";

interface HeaderProps {
  title: string;
  onLogout: () => void;
}

export function Header({ title, onLogout }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border p-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80"
          data-testid="button-help"
          title="Ajuda"
        >
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 relative"
          data-testid="button-notifications"
          title="Notificações"
        >
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
        </Button>
        <Button
          onClick={onLogout}
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-destructive hover:bg-destructive/80"
          data-testid="button-logout"
          title="Sair"
        >
          <LogOut className="h-4 w-4 text-destructive-foreground" />
        </Button>
      </div>
    </header>
  );
}
