import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getMultiplier, redemptionOptions } from "../data/initialData";
import type { AppState, Payment, PointActivity } from "../types";

interface DashboardProps {
  state: AppState;
  onStateChange: (s: AppState) => void;
}

const TIPS = [
  {
    id: "tip-early",
    title: "Pay Early, Earn More 🚀",
    body: "Paying course EMIs before the due date gives you bonus streak protection and extra loyalty points.",
    gradient: "from-teal-500 to-cyan-400",
  },
  {
    id: "tip-streak",
    title: "Protect Your Streak 🔥",
    body: "Missing a payment resets your streak multiplier. Keep your streak alive for maximum rewards on your skill investments!",
    gradient: "from-purple-500 to-pink-400",
  },
  {
    id: "tip-skills",
    title: "Invest in Skills 💡",
    body: "SkillSure loans are for education and career growth only. We help you invest in your future — not cars or homes.",
    gradient: "from-amber-400 to-orange-400",
  },
];

const QUOTES = [
  {
    id: "q1",
    text: "Learn now. Pay when you grow.",
    accent: "border-teal-500",
    bg: "bg-teal-50",
    color: "text-teal-700",
  },
  {
    id: "q2",
    text: "Data privacy matters more than money.",
    accent: "border-purple-500",
    bg: "bg-purple-50",
    color: "text-purple-700",
  },
  {
    id: "q3",
    text: "Your skills are your greatest asset.",
    accent: "border-pink-500",
    bg: "bg-pink-50",
    color: "text-pink-700",
  },
  {
    id: "q4",
    text: "Financial discipline today, freedom tomorrow.",
    accent: "border-amber-500",
    bg: "bg-amber-50",
    color: "text-amber-700",
  },
];

export function Dashboard({ state, onStateChange }: DashboardProps) {
  const [payingId, setPayingId] = useState<string | null>(null);

  const totalDue = state.emis.reduce((sum, e) => sum + e.amount, 0);
  const totalPaid = state.emis.reduce((sum, e) => sum + e.paidAmount, 0);
  const totalLoan = state.emis.reduce((sum, e) => sum + e.totalAmount, 0);
  const progressPct = Math.round((totalPaid / totalLoan) * 100);

  function handlePay(emiId: string) {
    const emi = state.emis.find((e) => e.id === emiId);
    if (!emi) return;
    setPayingId(emiId);

    setTimeout(() => {
      const basePoints = Math.round(emi.amount / 10);
      const bonus = Math.round(basePoints * state.multiplier);
      const newActivity: PointActivity = {
        id: `a${Date.now()}`,
        date: "Mar 23, 2026",
        description: `${emi.name} payment`,
        points: bonus,
        type: "earned",
      };
      const newPayment: Payment = {
        id: `p${Date.now()}`,
        date: "Mar 23, 2026",
        loanName: emi.name,
        amount: emi.amount,
        pointsEarned: bonus,
      };
      onStateChange({
        ...state,
        points: state.points + bonus,
        payments: [newPayment, ...state.payments],
        pointActivities: [newActivity, ...state.pointActivities],
        emis: state.emis.map((e) =>
          e.id === emiId ? { ...e, paidAmount: e.paidAmount + e.amount } : e,
        ),
      });
      toast.success(
        `Payment successful! +${bonus.toLocaleString()} pts earned (${state.multiplier}x streak bonus)`,
      );
      setPayingId(null);
    }, 800);
  }

  function handleRedeem(optId: string) {
    const opt = redemptionOptions.find((o) => o.id === optId);
    if (!opt) return;
    if (state.points < opt.pointsCost) {
      toast.error("Not enough points!");
      return;
    }
    const newActivity: PointActivity = {
      id: `a${Date.now()}`,
      date: "Mar 23, 2026",
      description: `${opt.label} redeemed`,
      points: opt.pointsCost,
      type: "redeemed",
    };
    onStateChange({
      ...state,
      points: state.points - opt.pointsCost,
      pointActivities: [newActivity, ...state.pointActivities],
    });
    toast.success(
      `Redeemed! ${opt.pointsCost} points deducted. You got ${opt.value}!`,
    );
  }

  const streakDots = Array.from({ length: 12 }, (_, dotIdx) => ({
    key: `dot-${dotIdx}`,
    filled: dotIdx < state.streak,
  }));
  const nextMilestone =
    state.streak >= 12
      ? 12
      : state.streak >= 6
        ? 12
        : state.streak >= 3
          ? 6
          : 3;
  const nextMultiplier = getMultiplier(nextMilestone);
  const monthsLeft = nextMilestone - state.streak;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back, Maya! 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track your education loans and grow your career.
        </p>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {/* EMI Progress Hero Card */}
          <div
            className="rounded-2xl p-6 text-white relative overflow-hidden shadow-card"
            style={{
              background:
                "linear-gradient(135deg, #0B6B6E 0%, #0891b2 60%, #0e7490 100%)",
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
                Total EMI Due
              </p>
              <p className="text-4xl font-bold mt-1">
                ₹{totalDue.toLocaleString("en-IN")}
                <span className="text-xl font-normal text-teal-200">
                  /month
                </span>
              </p>
              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-teal-100">Overall Progress</span>
                  <span className="font-semibold">{progressPct}% paid</span>
                </div>
                <div className="w-full h-3 bg-teal-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${progressPct}%`, background: "#22C55E" }}
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Badge className="bg-teal-700 text-teal-100 border-teal-600 text-xs">
                  3 payments remaining
                </Badge>
                <Badge className="bg-teal-700 text-teal-100 border-teal-600 text-xs">
                  🎓 Course Loan
                </Badge>
              </div>
              <p className="text-teal-300 text-xs mt-3">
                Next due: Apr 1, 2026
              </p>
            </div>
          </div>

          {/* Upcoming EMIs */}
          <Card className="shadow-card border-border hover:shadow-card-hover transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Upcoming EMIs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {state.emis.map((emi, idx) => (
                <div
                  key={emi.id}
                  data-ocid={`emi.item.${idx + 1}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-background hover:bg-muted/50 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{
                      background: `${emi.color}15`,
                      border: `1px solid ${emi.color}30`,
                    }}
                  >
                    {emi.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {emi.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due {emi.dueDate}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-foreground">
                      ₹{emi.amount.toLocaleString("en-IN")}
                    </p>
                    <Button
                      data-ocid={`emi.pay_button.${idx + 1}`}
                      size="sm"
                      disabled={payingId === emi.id}
                      onClick={() => handlePay(emi.id)}
                      className="mt-1 h-6 text-xs bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      {payingId === emi.id ? "Paying..." : "Pay Now"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Payments */}
          <Card className="shadow-card border-border hover:shadow-card-hover transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Recent Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {state.payments.slice(0, 5).map((p, idx) => (
                <div
                  key={p.id}
                  data-ocid={`payments.item.${idx + 1}`}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {p.loanName}
                    </p>
                    <p className="text-xs text-muted-foreground">{p.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      ₹{p.amount.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs font-medium text-emerald-500">
                      +{p.pointsEarned.toLocaleString()} pts
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* Rewards & Streak Hero */}
          <div className="rounded-2xl overflow-hidden shadow-card">
            <div
              className="p-6 relative"
              style={{
                background:
                  "linear-gradient(135deg, #0B6B6E 0%, #0891b2 35%, #7c3aed 70%, #db2777 100%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    "radial-gradient(circle at 20% 80%, white 0%, transparent 50%)",
                }}
              />
              <div className="relative">
                <p className="text-white/80 text-sm font-medium uppercase tracking-wider">
                  Points Balance
                </p>
                <div className="flex items-end gap-3 mt-1">
                  <p className="text-5xl font-bold text-white">
                    {state.points.toLocaleString()}
                  </p>
                  <p className="text-white/70 text-sm mb-2">pts</p>
                </div>
                <p className="text-white/70 text-xs mt-1">
                  +500 points this month!
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="bg-white/20 rounded-xl px-3 py-2">
                    <p className="text-white font-bold text-sm">
                      🔥 {state.streak} Month Streak
                    </p>
                    <p className="text-white/80 text-xs mt-0.5">
                      {state.multiplier}x Multiplier Active
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5">
                  {streakDots.map((dot) => (
                    <div
                      key={dot.key}
                      className={`h-2.5 flex-1 rounded-full transition-all ${dot.filled ? "bg-white" : "bg-white/25"}`}
                    />
                  ))}
                  <span className="text-base ml-1">🔥</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>Bonus Progression → {nextMultiplier}x</span>
                    <span>
                      {state.streak}/{nextMilestone} months
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-1000"
                      style={{
                        width: `${(state.streak / nextMilestone) * 100}%`,
                      }}
                    />
                  </div>
                  {monthsLeft > 0 && (
                    <p className="text-white/60 text-xs mt-1.5">
                      {monthsLeft} more month{monthsLeft > 1 ? "s" : ""} to
                      reach {nextMultiplier}x multiplier!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Reward Redemption */}
          <Card className="shadow-card border-border hover:shadow-card-hover transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">
                  Reward Redemption
                </CardTitle>
                <Badge
                  variant="outline"
                  className="text-xs text-teal-600 border-teal-200 bg-teal-50"
                >
                  {state.points.toLocaleString()} pts available
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {redemptionOptions.map((opt, idx) => (
                  <button
                    type="button"
                    key={opt.id}
                    data-ocid={`rewards.redeem_button.${idx + 1}`}
                    onClick={() => handleRedeem(opt.id)}
                    disabled={state.points < opt.pointsCost}
                    className={`p-4 rounded-xl border text-left transition-all hover:shadow-card-hover active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${opt.bgClass}`}
                  >
                    <div className="text-2xl mb-2">{opt.icon}</div>
                    <p className={`text-sm font-semibold ${opt.colorClass}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {opt.pointsCost} pts = {opt.value}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Points Activity */}
          <Card className="shadow-card border-border hover:shadow-card-hover transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Points Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {state.pointActivities.slice(0, 5).map((a, idx) => (
                <div
                  key={a.id}
                  data-ocid={`points.item.${idx + 1}`}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {a.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{a.date}</p>
                  </div>
                  <span
                    className={`text-sm font-bold ${a.type === "earned" ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {a.type === "earned" ? "+" : "-"}
                    {a.points.toLocaleString()} pts
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tips Section */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">
          SkillSure Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIPS.map((tip) => (
            <div
              key={tip.id}
              className="rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              <div
                className={`h-20 bg-gradient-to-br ${tip.gradient} flex items-center px-5`}
              >
                <span className="text-white font-bold text-sm leading-snug">
                  {tip.title}
                </span>
              </div>
              <div className="bg-white p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tip.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quotes Section */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
          <Quote size={16} className="text-teal-600" />
          Words to Live By
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {QUOTES.map((q) => (
            <div
              key={q.id}
              className={`rounded-xl p-5 border-l-4 ${q.accent} ${q.bg} hover:shadow-card hover:-translate-y-0.5 transition-all`}
            >
              <Quote size={20} className={`${q.color} mb-2 opacity-60`} />
              <p className={`text-base font-semibold ${q.color} leading-snug`}>
                {q.text}
              </p>
              <p className="text-xs text-muted-foreground mt-2">— SkillSure</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">
          Our Purpose
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="rounded-2xl p-6 text-white relative overflow-hidden shadow-card"
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
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold mb-2">Our Mission</h3>
              <p className="text-teal-100 text-sm leading-relaxed">
                Democratizing skill education through income-linked financing
                and gamified financial discipline.
              </p>
            </div>
          </div>
          <div
            className="rounded-2xl p-6 text-white relative overflow-hidden shadow-card"
            style={{
              background:
                "linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #9333ea 100%)",
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
              <div className="text-3xl mb-3">🌟</div>
              <h3 className="text-lg font-bold mb-2">Our Vision</h3>
              <p className="text-purple-100 text-sm leading-relaxed">
                To build India's most trusted pay-as-you-grow education
                ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
