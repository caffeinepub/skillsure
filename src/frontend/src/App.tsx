import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { initialState } from "./data/initialData";
import { ApplyLoan } from "./pages/ApplyLoan";
import { Contact } from "./pages/Contact";
import { CreditCardPage } from "./pages/CreditCard";
import { Dashboard } from "./pages/Dashboard";
import { Expenses } from "./pages/Expenses";
import { Payments } from "./pages/Payments";
import { Profile } from "./pages/Profile";
import { Rewards } from "./pages/Rewards";
import { Savings } from "./pages/Savings";
import type { AppState, Page } from "./types";

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [appState, setAppState] = useState<AppState>(initialState);

  function renderPage() {
    switch (page) {
      case "dashboard":
        return <Dashboard state={appState} onStateChange={setAppState} />;
      case "payments":
        return <Payments state={appState} />;
      case "rewards":
        return <Rewards state={appState} onStateChange={setAppState} />;
      case "expenses":
        return <Expenses state={appState} onStateChange={setAppState} />;
      case "savings":
        return <Savings state={appState} onStateChange={setAppState} />;
      case "creditcard":
        return <CreditCardPage state={appState} onStateChange={setAppState} />;
      case "contact":
        return <Contact />;
      case "apply":
        return <ApplyLoan state={appState} onStateChange={setAppState} />;
      case "profile":
        return <Profile state={appState} />;
      default:
        return <Dashboard state={appState} onStateChange={setAppState} />;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Brand accent bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 z-50" />
      <Toaster position="top-right" richColors />
      <Sidebar activePage={page} onNavigate={setPage} />
      <Header />

      {/* Main content area */}
      <main className="ml-20 pt-16 min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
        <div className="p-6 max-w-7xl mx-auto">{renderPage()}</div>

        {/* Footer */}
        <footer className="border-t border-border mt-12 px-6 py-4 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SkillSure. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
