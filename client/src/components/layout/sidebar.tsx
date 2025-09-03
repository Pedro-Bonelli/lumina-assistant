import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
}

export function Sidebar({ items, onItemClick }: SidebarProps) {
  return (
    <nav className="w-20 bg-sidebar flex flex-col items-center py-6 space-y-6">
      <div className="text-sidebar-primary text-xl">
        <GraduationCap />
      </div>
      <div className="flex flex-col space-y-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              onClick={() => !item.disabled && onItemClick(item.id)}
              className={cn(
                "sidebar-item",
                item.active && "active",
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
    </nav>
  );
}
