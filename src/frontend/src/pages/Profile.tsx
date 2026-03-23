import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMultiplier } from "../data/initialData";
import type { AppState } from "../types";

interface ProfileProps {
  state: AppState;
}

const STREAK_HISTORY = [
  { id: "oct", month: "Oct", months: 1 },
  { id: "nov", month: "Nov", months: 2 },
  { id: "dec", month: "Dec", months: 3 },
  { id: "jan", month: "Jan", months: 4 },
  { id: "feb", month: "Feb", months: 5 },
  { id: "mar6", month: "Mar (6m)", months: 6 },
  { id: "apr", month: "Apr", months: 7 },
  { id: "may8", month: "May (8m)", months: 8 },
];

const MAX_BAR = 8;

const STAT_CARDS = [
  { id: "paid", icon: "💰", color: "text-teal-600" },
  { id: "points", icon: "⭐", color: "text-amber-500" },
  { id: "streak", icon: "🔥", color: "text-orange-500" },
  { id: "multiplier", icon: "🚀", color: "text-purple-600" },
];

export function Profile({ state }: ProfileProps) {
  const totalPaid = state.payments.reduce((s, p) => s + p.amount, 0);
  const totalPointsEarned = state.pointActivities
    .filter((a) => a.type === "earned")
    .reduce((s, a) => s + a.points, 0);

  const statValues: Record<string, { label: string; value: string }> = {
    paid: {
      label: "Total Paid",
      value: `₹${totalPaid.toLocaleString("en-IN")}`,
    },
    points: {
      label: "Points Earned",
      value: totalPointsEarned.toLocaleString(),
    },
    streak: { label: "Streak", value: `${state.streak} months` },
    multiplier: { label: "Multiplier", value: `${state.multiplier}x` },
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Your account overview and streak history.
        </p>
      </div>

      {/* Profile header */}
      <Card className="shadow-card">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center gap-5 flex-wrap">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-teal-600 text-white text-xl font-bold">
                MS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">Maya Sharma</h2>
              <p className="text-muted-foreground text-sm">
                maya.sharma@email.com
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge className="bg-teal-50 text-teal-600 border-teal-100">
                  Premium Member
                </Badge>
                <Badge className="bg-amber-50 text-amber-600 border-amber-100">
                  🔥 {state.streak} Month Streak
                </Badge>
                <Badge className="bg-purple-50 text-purple-600 border-purple-100">
                  {state.multiplier}x Multiplier
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-teal-600">
                {state.points.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Total Points</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <Card key={card.id} className="shadow-card">
            <CardContent className="pt-4 pb-4">
              <div className="text-2xl mb-1">{card.icon}</div>
              <p className={`text-xl font-bold ${card.color}`}>
                {statValues[card.id].value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {statValues[card.id].label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Streak history chart */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            Streak History (Last 8 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-32">
            {STREAK_HISTORY.map((entry) => {
              const height = (entry.months / MAX_BAR) * 100;
              const isActive = entry.months <= state.streak;
              const multiplier = getMultiplier(entry.months);
              return (
                <div
                  key={entry.id}
                  className="flex flex-col items-center flex-1 gap-1"
                >
                  <span className="text-xs text-muted-foreground">
                    {multiplier}x
                  </span>
                  <div
                    className="w-full flex flex-col justify-end"
                    style={{ height: "80px" }}
                  >
                    <div
                      title={`Month ${entry.months}: ${multiplier}x`}
                      className={`w-full rounded-t-lg transition-all duration-700 ${
                        isActive ? "bg-teal-500" : "bg-muted"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span
                    className="text-xs text-muted-foreground whitespace-nowrap"
                    style={{ fontSize: "10px" }}
                  >
                    {entry.month}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Streak multiplier grows with consecutive on-time payments. Current:{" "}
            {state.multiplier}x
          </p>
        </CardContent>
      </Card>

      {/* Active loans */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Active Loans</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {state.emis.map((emi) => {
            const pct = Math.round((emi.paidAmount / emi.totalAmount) * 100);
            return (
              <div
                key={emi.id}
                className="p-4 rounded-xl bg-background border border-border"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: `${emi.color}15` }}
                  >
                    {emi.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{emi.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ₹{emi.amount.toLocaleString("en-IN")}/month • Next:{" "}
                      {emi.dueDate}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{ color: emi.color, borderColor: `${emi.color}50` }}
                  >
                    {pct}% paid
                  </Badge>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: emi.color }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
