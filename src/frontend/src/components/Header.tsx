import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, ChevronDown, Search } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-16 right-0 h-16 bg-white border-b border-border flex items-center px-6 z-30 gap-4">
      {/* Brand */}
      <div className="flex items-center gap-2 min-w-[140px]">
        <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <span className="font-bold text-lg text-foreground tracking-tight">
          SkillSure
        </span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            data-ocid="header.search_input"
            type="text"
            placeholder="Search loans, payments..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-200 placeholder:text-muted-foreground"
            readOnly
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 ml-auto">
        <button
          type="button"
          data-ocid="header.bell.button"
          className="relative w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-teal-50 hover:text-teal-600 transition-colors"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2 cursor-pointer group">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-teal-600 text-white text-xs font-bold">
              MS
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex items-center gap-1">
            <span className="text-sm font-medium text-foreground">Maya S.</span>
            <ChevronDown size={14} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
