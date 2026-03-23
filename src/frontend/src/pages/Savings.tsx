import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Eye, EyeOff, Lock, PiggyBank, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { AppState, SavingsAccount } from "../types";

interface SavingsProps {
  state: AppState;
  onStateChange: (s: AppState) => void;
}

export function Savings({ state, onStateChange }: SavingsProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formBalance, setFormBalance] = useState("");
  const [formGoal, setFormGoal] = useState("");
  const [formContrib, setFormContrib] = useState("");

  const totalSaved = state.savings.reduce((s, a) => s + a.balance, 0);
  const totalGoal = state.savings.reduce((s, a) => s + a.goal, 0);
  const overallPct =
    totalGoal > 0 ? Math.round((totalSaved / totalGoal) * 100) : 0;

  const COLORS = ["#0B6B6E", "#7C3AED", "#DB2777", "#F59E0B", "#10B981"];
  const ICONS = ["🐷", "🎓", "📈", "🛡️", "🏆"];

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!formName.trim() || !formBalance || !formGoal) return;
    const newAccount: SavingsAccount = {
      id: `s${Date.now()}`,
      name: formName.trim(),
      balance: Number(formBalance),
      goal: Number(formGoal),
      monthlyContribution: Number(formContrib) || 0,
      icon: ICONS[state.savings.length % ICONS.length],
      color: COLORS[state.savings.length % COLORS.length],
    };
    onStateChange({ ...state, savings: [...state.savings, newAccount] });
    toast.success(`Savings account "${newAccount.name}" added!`);
    setFormName("");
    setFormBalance("");
    setFormGoal("");
    setFormContrib("");
    setShowForm(false);
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <PiggyBank className="text-teal-600" size={28} />
            Savings Tracker
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitor your savings goals and monthly contributions.
          </p>
        </div>
        {isRevealed && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-1.5"
          >
            {showForm ? <X size={14} /> : <Plus size={14} />}
            {showForm ? "Cancel" : "Add Account"}
          </Button>
        )}
      </div>

      {/* Add savings form */}
      {isRevealed && showForm && (
        <Card className="border-teal-200 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">New Savings Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleAdd}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="space-y-1.5">
                <Label>Account Name</Label>
                <Input
                  data-ocid="savings.input"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Travel Fund"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Current Balance (₹)</Label>
                <Input
                  data-ocid="savings.input"
                  type="number"
                  min={0}
                  value={formBalance}
                  onChange={(e) => setFormBalance(e.target.value)}
                  placeholder="e.g. 5000"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Goal Amount (₹)</Label>
                <Input
                  data-ocid="savings.input"
                  type="number"
                  min={1}
                  value={formGoal}
                  onChange={(e) => setFormGoal(e.target.value)}
                  placeholder="e.g. 25000"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Monthly Contribution (₹)</Label>
                <Input
                  data-ocid="savings.input"
                  type="number"
                  min={0}
                  value={formContrib}
                  onChange={(e) => setFormContrib(e.target.value)}
                  placeholder="e.g. 2000"
                />
              </div>
              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  data-ocid="savings.submit_button"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Add Savings Account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Privacy Lock */}
      {!isRevealed ? (
        <div className="relative">
          {/* Blurred preview behind */}
          <div className="blur-sm pointer-events-none select-none opacity-40 space-y-4">
            <div className="rounded-2xl p-6 bg-gradient-to-br from-teal-500 to-cyan-400 text-white">
              <p className="text-sm">Total Savings</p>
              <p className="text-4xl font-bold mt-1">₹••,•••</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-2xl bg-muted" />
              ))}
            </div>
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/80 backdrop-blur-md rounded-2xl border border-border shadow-card">
            <div className="flex flex-col items-center gap-3 text-center px-6">
              <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-teal-200 flex items-center justify-center">
                <Lock size={28} className="text-teal-600" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Your savings are private.
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Only you can view your savings details. Tap below to reveal your
                accounts.
              </p>
              <Button
                data-ocid="savings.primary_button"
                onClick={() => setIsRevealed(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 mt-1"
              >
                <Eye size={16} />
                Reveal My Savings
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Reveal toggle */}
          <div className="flex justify-end">
            <Button
              data-ocid="savings.toggle"
              variant="ghost"
              size="sm"
              onClick={() => setIsRevealed(false)}
              className="text-muted-foreground text-xs flex items-center gap-1"
            >
              <EyeOff size={13} />
              Hide Details
            </Button>
          </div>

          {/* Summary hero */}
          <div
            className="rounded-2xl p-6 text-white relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0B6B6E 0%, #0891b2 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background:
                  "radial-gradient(circle at 80% 20%, white 0%, transparent 60%)",
              }}
            />
            <div className="relative">
              <p className="text-teal-200 text-sm font-medium uppercase tracking-wider">
                Total Saved
              </p>
              <p className="text-4xl font-bold mt-1">
                ₹{totalSaved.toLocaleString("en-IN")}
              </p>
              <p className="text-teal-200 text-sm mt-1">
                of ₹{totalGoal.toLocaleString("en-IN")} goal
              </p>
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-xs text-teal-100">
                  <span>Overall Progress</span>
                  <span>{overallPct}%</span>
                </div>
                <div className="w-full h-2.5 bg-teal-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${overallPct}%`, background: "#22C55E" }}
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Badge className="bg-teal-700 text-teal-100 border-teal-600 text-xs">
                  {state.savings.length} accounts
                </Badge>
              </div>
            </div>
          </div>

          {/* Accounts grid */}
          {state.savings.length === 0 ? (
            <p
              data-ocid="savings.empty_state"
              className="text-center text-muted-foreground text-sm py-10"
            >
              No savings accounts yet. Click "Add Account" to get started.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.savings.map((acc, idx) => {
                const pct =
                  acc.goal > 0 ? Math.round((acc.balance / acc.goal) * 100) : 0;
                return (
                  <Card
                    key={acc.id}
                    data-ocid={`savings.item.${idx + 1}`}
                    className="shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all border-border"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                          style={{
                            background: `${acc.color}18`,
                            border: `1px solid ${acc.color}30`,
                          }}
                        >
                          {acc.icon}
                        </div>
                        <div>
                          <CardTitle className="text-sm font-semibold">
                            {acc.name}
                          </CardTitle>
                          {acc.linkedLoanId && (
                            <Badge variant="outline" className="text-xs mt-0.5">
                              Linked to loan
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Saved</p>
                          <p
                            className="text-xl font-bold"
                            style={{ color: acc.color }}
                          >
                            ₹{acc.balance.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Goal</p>
                          <p className="text-sm font-semibold text-foreground">
                            ₹{acc.goal.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{pct}% reached</span>
                          <span>
                            ₹{(acc.goal - acc.balance).toLocaleString("en-IN")}{" "}
                            to go
                          </span>
                        </div>
                        <Progress value={pct} className="h-2" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +₹{acc.monthlyContribution.toLocaleString("en-IN")}
                        /month contribution
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
