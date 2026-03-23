import {
  BarChart2,
  CreditCard,
  FileText,
  Gift,
  LayoutDashboard,
  User,
} from "lucide-react";
import type { Page } from "../types";

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; icon: React.ReactNode; label: string }[] = [
  { id: "dashboard", icon: <LayoutDashboard size={22} />, label: "Dashboard" },
  { id: "payments", icon: <CreditCard size={22} />, label: "Payments" },
  { id: "rewards", icon: <Gift size={22} />, label: "Rewards" },
  { id: "expenses", icon: <BarChart2 size={22} />, label: "Expenses" },
  { id: "apply", icon: <FileText size={22} />, label: "Apply Loan" },
  { id: "profile", icon: <User size={22} />, label: "Profile" },
];

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-16 bg-white border-r border-border flex flex-col items-center py-4 z-40 shadow-xs">
      {/* Logo mark */}
      <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center mb-6 shadow-card">
        <span className="text-white font-bold text-lg">S</span>
      </div>

      <nav className="flex flex-col gap-1 flex-1 w-full">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.id}
            data-ocid={`sidebar.${item.id}.link`}
            onClick={() => onNavigate(item.id)}
            title={item.label}
            className={`relative flex items-center justify-center w-full h-12 transition-all duration-200 group ${
              activePage === item.id
                ? "text-teal-600"
                : "text-muted-foreground hover:text-teal-600"
            }`}
          >
            {activePage === item.id && (
              <span className="absolute left-0 top-2 bottom-2 w-1 bg-teal-600 rounded-r-full" />
            )}
            <span
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                activePage === item.id ? "bg-teal-50" : "hover:bg-teal-50"
              }`}
            >
              {item.icon}
            </span>
          </button>
        ))}
      </nav>

      {/* Bottom: version / branding dot */}
      <div className="w-2 h-2 rounded-full bg-teal-200 mb-2" />
    </aside>
  );
}
