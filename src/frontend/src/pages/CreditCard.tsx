import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle, Star, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { AppState } from "../types";

interface CreditCardPageProps {
  state: AppState;
  onStateChange: (s: AppState) => void;
}

export function CreditCardPage({ state, onStateChange }: CreditCardPageProps) {
  const { creditCard } = state;
  const [paying, setPaying] = useState(false);

  const utilization = Math.round(
    (creditCard.outstanding / creditCard.creditLimit) * 100,
  );

  function handlePayNow() {
    setPaying(true);
    setTimeout(() => {
      onStateChange({
        ...state,
        creditCard: {
          ...creditCard,
          outstanding: 0,
          availableCredit: creditCard.creditLimit,
        },
      });
      toast.success("Payment successful! Outstanding cleared.");
      setPaying(false);
    }, 1000);
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Wallet className="text-purple-600" size={28} />
          SkillSure Credit Card
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your SkillSure credit card, track spending, and earn rewards.
        </p>
      </div>

      {/* Virtual Card */}
      <div className="max-w-sm">
        <div
          className="rounded-2xl p-6 relative overflow-hidden text-white"
          style={{
            background:
              "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4c1d95 60%, #6d28d9 100%)",
            minHeight: "200px",
          }}
        >
          {/* Shine effect */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-48 h-48 rounded-full opacity-10"
            style={{ background: "white", transform: "translate(25%, 25%)" }}
          />
          <div
            className="absolute top-0 right-8 w-32 h-32 rounded-full opacity-5"
            style={{ background: "white", transform: "translateY(-30%)" }}
          />

          <div className="relative flex flex-col h-full gap-6">
            {/* Top row */}
            <div className="flex justify-between items-start">
              <div className="w-10 h-8 rounded bg-gradient-to-br from-amber-300 to-amber-500 opacity-90" />
              <div className="text-right">
                <p className="text-xs font-bold tracking-widest text-purple-200">
                  SKILLSURE
                </p>
                <p className="text-[10px] text-purple-300">CREDIT</p>
              </div>
            </div>

            {/* Card number */}
            <p className="text-xl tracking-[0.25em] font-mono font-medium">
              {creditCard.cardNumber}
            </p>

            {/* Bottom row */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-purple-300 uppercase tracking-wider">
                  Card Holder
                </p>
                <p className="text-sm font-semibold tracking-wide">
                  {creditCard.cardHolder}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-purple-300 uppercase tracking-wider">
                  Expires
                </p>
                <p className="text-sm font-semibold">{creditCard.expiryDate}</p>
              </div>
              <div className="flex -space-x-3">
                <div className="w-9 h-9 rounded-full bg-red-500 opacity-80" />
                <div className="w-9 h-9 rounded-full bg-amber-400 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Credit Limit
            </p>
            <p className="text-xl font-bold text-foreground mt-1">
              ₹{creditCard.creditLimit.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Outstanding
            </p>
            <p className="text-xl font-bold text-red-500 mt-1">
              ₹{creditCard.outstanding.toLocaleString("en-IN")}
            </p>
            {creditCard.outstanding > 0 && (
              <Button
                data-ocid="creditcard.primary_button"
                size="sm"
                disabled={paying}
                onClick={handlePayNow}
                className="mt-2 h-7 text-xs bg-red-500 hover:bg-red-600 text-white w-full"
              >
                {paying ? "Processing..." : "Pay Now"}
              </Button>
            )}
            {creditCard.outstanding === 0 && (
              <div className="flex items-center gap-1 mt-2">
                <CheckCircle size={12} className="text-emerald-500" />
                <span className="text-xs text-emerald-600">Cleared</span>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Available
            </p>
            <p className="text-xl font-bold text-emerald-600 mt-1">
              ₹{creditCard.availableCredit.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Due Date
            </p>
            <p className="text-base font-bold text-foreground mt-1">
              {creditCard.dueDate}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <AlertCircle size={11} className="text-amber-500" />
              <span className="text-xs text-amber-600">Upcoming</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Utilization bar */}
      <Card className="shadow-card">
        <CardContent className="p-5">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold">Credit Utilization</p>
            <Badge
              className={`text-xs ${
                utilization > 70
                  ? "bg-red-50 text-red-600 border-red-200"
                  : utilization > 30
                    ? "bg-amber-50 text-amber-600 border-amber-200"
                    : "bg-emerald-50 text-emerald-600 border-emerald-200"
              }`}
              variant="outline"
            >
              {utilization}% used
            </Badge>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${utilization}%`,
                background:
                  utilization > 70
                    ? "#EF4444"
                    : utilization > 30
                      ? "#F59E0B"
                      : "#10B981",
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Keep utilization below 30% for the best credit score.
          </p>
        </CardContent>
      </Card>

      {/* Rewards + Transactions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Rewards */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Star size={16} className="text-amber-400" />
                Rewards Points
              </CardTitle>
              <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-sm font-bold px-3">
                {creditCard.rewards.toLocaleString()} pts
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-4">
              <p className="text-sm text-amber-800">
                🎉 You've earned{" "}
                <strong>{creditCard.rewards} reward points</strong> from card
                spending! Redeem for cashback, vouchers, or EMI reduction.
              </p>
              <Button
                data-ocid="creditcard.secondary_button"
                variant="outline"
                size="sm"
                className="mt-3 border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                Redeem Rewards
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {creditCard.transactions.map((tx, idx) => (
              <div key={tx.id}>
                <div
                  data-ocid={`creditcard.item.${idx + 1}`}
                  className="flex items-center gap-3 py-2.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-lg flex-shrink-0">
                    {tx.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {tx.merchant}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tx.date} · {tx.category}
                    </p>
                  </div>
                  <p
                    className={`text-sm font-bold flex-shrink-0 ${
                      tx.type === "credit" ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {tx.type === "credit" ? "+" : "-"}₹
                    {tx.amount.toLocaleString("en-IN")}
                  </p>
                </div>
                {idx < creditCard.transactions.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
