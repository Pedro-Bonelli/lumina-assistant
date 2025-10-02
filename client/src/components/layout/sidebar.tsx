import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import luminaLogo from "@assets/lumina_logo_v2_1759417231276.png";

interface SidebarItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  disabled?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  onItemClick: (id: string) => void;
  onNavigate?: (route: string) => void;
}

export function Sidebar({ items, onItemClick, onNavigate }: SidebarProps) {
  return (
    <nav className="w-20 bg-sidebar flex flex-col items-center py-6 space-y-6 relative">
      <div className="text-sidebar-primary text-xl">
        <img src={luminaLogo} alt="Lumina Assistant" className="h-6 w-6" />
      </div>
      <div className="flex flex-col space-y-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              onClick={() => !item.disabled && onItemClick(item.id)}
              className={cn(
                "h-10 w-10 sidebar-item text-[#f9fafb]",
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
              variant="ghost"
              size="icon"
              disabled={item.disabled}
              data-testid={`sidebar-${item.id}`}
              title={item.label}
            >
              <Icon className="h-5 w-5" />
            </Button>
          );
        })}
      </div>
      {onNavigate && (
        <div className="mt-auto">
          <Button
            onClick={() => onNavigate('create-activity')}
            className="w-12 h-12 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105"
            data-testid="button-quick-create-activity"
            title="Criar Atividade"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      )}
    </nav>
  );
}
