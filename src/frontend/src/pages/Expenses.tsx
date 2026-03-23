import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { AppState, Expense } from "../types";

interface ExpensesProps {
  state: AppState;
  onStateChange: (s: AppState) => void;
}

const CATEGORY_META: Record<
  Expense["category"],
  { icon: string; color: string; bg: string }
> = {
  Food: {
    icon: "🍔",
    color: "text-orange-600",
    bg: "bg-orange-50 border-orange-100",
  },
  Transport: {
    icon: "🚌",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-100",
  },
  Education: {
    icon: "📚",
    color: "text-teal-600",
    bg: "bg-teal-50 border-teal-100",
  },
  Rent: {
    icon: "🏠",
    color: "text-purple-600",
    bg: "bg-purple-50 border-purple-100",
  },
  Health: {
    icon: "💊",
    color: "text-rose-600",
    bg: "bg-rose-50 border-rose-100",
  },
  Misc: {
    icon: "📦",
    color: "text-gray-600",
    bg: "bg-gray-50 border-gray-100",
  },
};

const CATEGORIES: Expense["category"][] = [
  "Food",
  "Transport",
  "Education",
  "Rent",
  "Health",
  "Misc",
];

export function Expenses({ state, onStateChange }: ExpensesProps) {
  const [showForm, setShowForm] = useState(false);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Expense["category"]>("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const expenses = state.expenses;

  // Current month total
  const totalThisMonth = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Category totals
  const categoryTotals = CATEGORIES.map((cat) => ({
    cat,
    total: expenses
      .filter((e) => e.category === cat)
      .reduce((s, e) => s + e.amount, 0),
  }));

  // Sorted expenses
  const sorted = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!desc.trim() || !amount) return;
    const newExpense: Expense = {
      id: `exp${Date.now()}`,
      date: new Date(date).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      category,
      description: desc.trim(),
      amount: Number(amount),
    };
    onStateChange({ ...state, expenses: [newExpense, ...expenses] });
    toast.success(`Expense added: ₹${Number(amount).toLocaleString("en-IN")}`);
    setDesc("");
    setAmount("");
    setShowForm(false);
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Expense Tracker
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Track where your money goes each month
          </p>
        </div>
        <Button
          data-ocid="expenses.open_modal_button"
          onClick={() => setShowForm((v) => !v)}
          className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Cancel" : "Add Expense"}
        </Button>
      </div>

      {/* Inline Add Form */}
      {showForm && (
        <Card
          data-ocid="expenses.dialog"
          className="border-teal-200 shadow-card"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              New Expense
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="space-y-1.5">
                <Label htmlFor="exp-desc">Description</Label>
                <Input
                  id="exp-desc"
                  data-ocid="expenses.input"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="e.g. Grocery shopping"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="exp-amount">Amount (₹)</Label>
                <Input
                  id="exp-amount"
                  data-ocid="expenses.input"
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 500"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={category}
                  onValueChange={(v) => setCategory(v as Expense["category"])}
                >
                  <SelectTrigger data-ocid="expenses.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {CATEGORY_META[c].icon} {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="exp-date">Date</Label>
                <Input
                  id="exp-date"
                  data-ocid="expenses.input"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  data-ocid="expenses.submit_button"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Add Expense
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Summary Row */}
      <div
        className="rounded-2xl p-5 text-white relative overflow-hidden"
        style={{ background: "#0B6B6E" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, white 0%, transparent 60%)",
          }}
        />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-teal-200 text-sm font-medium uppercase tracking-wider">
              Total Spent This Month
            </p>
            <p className="text-4xl font-bold mt-1">
              ₹{totalThisMonth.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-teal-200 text-sm">
              {expenses.length} transactions
            </p>
            <Badge className="mt-1 bg-teal-700 text-teal-100 border-teal-600 text-xs">
              March 2026
            </Badge>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">
          Category Breakdown
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categoryTotals.map(({ cat, total }) => {
            const meta = CATEGORY_META[cat];
            return (
              <div
                key={cat}
                className={`rounded-xl p-4 border text-center ${meta.bg}`}
              >
                <div className="text-2xl mb-1">{meta.icon}</div>
                <p className={`text-xs font-semibold ${meta.color}`}>{cat}</p>
                <p className="text-sm font-bold text-foreground mt-0.5">
                  ₹{total.toLocaleString("en-IN")}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Expenses */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Recent Expenses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sorted.length === 0 ? (
            <p
              data-ocid="expenses.empty_state"
              className="text-center text-muted-foreground text-sm py-8"
            >
              No expenses yet. Click "Add Expense" to get started.
            </p>
          ) : (
            sorted.map((exp, idx) => {
              const meta = CATEGORY_META[exp.category];
              return (
                <div
                  key={exp.id}
                  data-ocid={`expenses.item.${idx + 1}`}
                  className="flex items-center gap-3 py-2.5 border-b border-border last:border-0"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border ${meta.bg}`}
                  >
                    {meta.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {exp.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {exp.date} · {exp.category}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-foreground">
                    ₹{exp.amount.toLocaleString("en-IN")}
                  </p>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
