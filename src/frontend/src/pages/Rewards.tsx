import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { getMultiplier, redemptionOptions } from "../data/initialData";
import type { AppState, PointActivity } from "../types";

interface RewardsProps {
  state: AppState;
  onStateChange: (s: AppState) => void;
}

const MULTIPLIER_MILESTONES = [
  { months: 1, multiplier: 1.0, label: "Start" },
  { months: 3, multiplier: 1.2, label: "3 months" },
  { months: 6, multiplier: 1.5, label: "6 months" },
  { months: 12, multiplier: 2.0, label: "12 months" },
];

export function Rewards({ state, onStateChange }: RewardsProps) {
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
      `Redeemed! ${opt.pointsCost} pts deducted. You got ${opt.value}!`,
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Rewards Center</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Redeem your points and track your streak journey.
        </p>
      </div>

      {/* Points & Streak hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="rounded-2xl p-6 text-white"
          style={{
            background: "linear-gradient(135deg, #0B6B6E 0%, #0891b2 100%)",
          }}
        >
          <p className="text-white/80 text-sm font-medium">
            Total Points Balance
          </p>
          <p className="text-5xl font-bold mt-1">
            {state.points.toLocaleString()}
          </p>
          <p className="text-white/70 text-sm mt-1">
            ≈ ₹{Math.round(state.points / 10).toLocaleString("en-IN")} value
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className="bg-white/20 text-white border-white/30">
              🔥 {state.streak} month streak
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30">
              {state.multiplier}x active
            </Badge>
          </div>
        </div>

        {/* Streak multiplier journey */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Streak Multiplier Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="flex justify-between mb-6">
                {MULTIPLIER_MILESTONES.map((m) => {
                  const achieved = state.streak >= m.months;
                  return (
                    <div
                      key={m.months}
                      className="flex flex-col items-center gap-1"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                          achieved
                            ? "bg-teal-600 text-white border-teal-600"
                            : "bg-background text-muted-foreground border-border"
                        }`}
                      >
                        {m.multiplier}x
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {m.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Progress line */}
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-border -z-0">
                <div
                  className="h-full bg-teal-500 transition-all duration-1000"
                  style={{
                    width: `${Math.min((state.streak / 12) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Current: {state.streak} months → {state.multiplier}x multiplier
              {state.streak < 12 && ` • ${12 - state.streak} months to 2x`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* How points work */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">How Points Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-100">
              <p className="text-2xl mb-2">💳</p>
              <p className="text-sm font-semibold text-teal-700">
                Earn on Every Payment
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                ₹100 paid = 10 base points. EMI payments give massive points!
              </p>
              <p className="text-xs text-teal-600 font-medium mt-2">
                ₹5,000 EMI → 500 pts
              </p>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
              <p className="text-2xl mb-2">🔥</p>
              <p className="text-sm font-semibold text-purple-700">
                Streak Multiplier
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Consecutive months boost your points automatically.
              </p>
              <p className="text-xs text-purple-600 font-medium mt-2">
                8 months → 500 pts becomes 750 pts!
              </p>
            </div>
            <div className="p-4 rounded-xl bg-pink-50 border border-pink-100">
              <p className="text-2xl mb-2">🎁</p>
              <p className="text-sm font-semibold text-pink-700">
                Redeem Anytime
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Use points for cashback, EMI cuts, discounts, and vouchers.
              </p>
              <p className="text-xs text-pink-600 font-medium mt-2">
                100 pts = ₹10 value
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Redemption center */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Redemption Center</CardTitle>
            <Badge
              variant="outline"
              className="text-teal-600 border-teal-200 bg-teal-50"
            >
              {state.points.toLocaleString()} pts
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {redemptionOptions.map((opt, idx) => (
              <div
                key={opt.id}
                className={`p-5 rounded-xl border ${opt.bgClass} flex flex-col gap-3`}
              >
                <div className="text-3xl">{opt.icon}</div>
                <div>
                  <p className={`font-semibold text-sm ${opt.colorClass}`}>
                    {opt.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {opt.pointsCost} pts = {opt.value}
                  </p>
                </div>
                <Button
                  data-ocid={`rewards.redeem_button.${idx + 1}`}
                  size="sm"
                  disabled={state.points < opt.pointsCost}
                  onClick={() => handleRedeem(opt.id)}
                  className="mt-auto bg-teal-600 hover:bg-teal-700 text-white text-xs h-8"
                >
                  Redeem {opt.pointsCost} pts
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Full points history */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Points History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {state.pointActivities.map((a, idx) => (
            <div
              key={a.id}
              data-ocid={`points.item.${idx + 1}`}
              className="flex items-center justify-between p-3 rounded-xl bg-background hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                    a.type === "earned"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {a.type === "earned" ? "↑" : "↓"}
                </div>
                <div>
                  <p className="text-sm font-medium">{a.description}</p>
                  <p className="text-xs text-muted-foreground">{a.date}</p>
                </div>
              </div>
              <span
                className={`text-sm font-bold ${
                  a.type === "earned" ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {a.type === "earned" ? "+" : "-"}
                {a.points.toLocaleString()} pts
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
