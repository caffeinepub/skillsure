import {
  BarChart2,
  CreditCard,
  FileText,
  Gift,
  LayoutDashboard,
  MessageCircle,
  PiggyBank,
  User,
  Wallet,
} from "lucide-react";
import type { Page } from "../types";

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; icon: React.ReactNode; label: string }[] = [
  { id: "dashboard", icon: <LayoutDashboard size={20} />, label: "Home" },
  { id: "payments", icon: <CreditCard size={20} />, label: "Payments" },
  { id: "rewards", icon: <Gift size={20} />, label: "Rewards" },
  { id: "expenses", icon: <BarChart2 size={20} />, label: "Expenses" },
  { id: "savings", icon: <PiggyBank size={20} />, label: "Savings" },
  { id: "creditcard", icon: <Wallet size={20} />, label: "Card" },
  { id: "apply", icon: <FileText size={20} />, label: "Apply" },
  { id: "contact", icon: <MessageCircle size={20} />, label: "Contact" },
  { id: "profile", icon: <User size={20} />, label: "Profile" },
];

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-white border-r border-border flex flex-col items-center py-4 z-40 shadow-xs">
      {/* Logo mark */}
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 flex items-center justify-center mb-5 shadow-card">
        <span className="text-white font-bold text-lg">S</span>
      </div>

      <nav className="flex flex-col gap-0.5 flex-1 w-full px-2">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.id}
            data-ocid={`sidebar.${item.id}.link`}
            onClick={() => onNavigate(item.id)}
            title={item.label}
            className={`relative flex flex-col items-center justify-center w-full py-2 rounded-xl transition-all duration-200 group ${
              activePage === item.id
                ? "bg-teal-50 text-teal-600"
                : "text-muted-foreground hover:bg-muted/60 hover:text-teal-600"
            }`}
          >
            {activePage === item.id && (
              <span className="absolute left-0 top-2 bottom-2 w-1 bg-teal-600 rounded-r-full" />
            )}
            {item.icon}
            <span className="text-[10px] font-medium mt-0.5 leading-tight">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="w-2 h-2 rounded-full bg-teal-200 mb-2" />
    </aside>
  );
}
