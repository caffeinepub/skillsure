import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { initialState } from "./data/initialData";
import { ApplyLoan } from "./pages/ApplyLoan";
import { Dashboard } from "./pages/Dashboard";
import { Expenses } from "./pages/Expenses";
import { Payments } from "./pages/Payments";
import { Profile } from "./pages/Profile";
import { Rewards } from "./pages/Rewards";
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
      <Toaster position="top-right" richColors />
      <Sidebar activePage={page} onNavigate={setPage} />
      <Header />

      {/* Main content area */}
      <main className="ml-16 pt-16 min-h-screen">
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
