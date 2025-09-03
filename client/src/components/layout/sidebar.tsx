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
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10 sidebar-item opacity-50 cursor-not-allowed text-[#f9fafb]"
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
