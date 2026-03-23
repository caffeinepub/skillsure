import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import type { AppState } from "../types";

interface PaymentsProps {
  state: AppState;
}

const SUMMARY_CARDS = [
  { id: "count", label: "Total Payments" },
  { id: "paid", label: "Total Paid" },
  { id: "points", label: "Points Earned" },
  { id: "streak", label: "Active Streak" },
];

export function Payments({ state }: PaymentsProps) {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? state.payments
      : state.payments.filter((p) => p.loanName === filter);
  const totalPaid = filtered.reduce((s, p) => s + p.amount, 0);
  const totalPoints = filtered.reduce((s, p) => s + p.pointsEarned, 0);

  const summaryValues: Record<string, string | number> = {
    count: filtered.length,
    paid: `₹${totalPaid.toLocaleString("en-IN")}`,
    points: `${totalPoints.toLocaleString()} pts`,
    streak: `${state.streak} months`,
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payment History</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track all your EMI payments and points earned.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SUMMARY_CARDS.map((card) => (
          <Card key={card.id} className="shadow-card">
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="text-xl font-bold text-foreground mt-1">
                {summaryValues[card.id]}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-base">All Transactions</CardTitle>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger
                data-ocid="payments.filter.select"
                className="w-44 h-8 text-sm"
              >
                <SelectValue placeholder="Filter by loan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Loans</SelectItem>
                <SelectItem value="Home Loan">Home Loan</SelectItem>
                <SelectItem value="Car Loan">Car Loan</SelectItem>
                <SelectItem value="Personal Loan">Personal Loan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table data-ocid="payments.table">
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="pl-6">Date</TableHead>
                <TableHead>Loan</TableHead>
                <TableHead>Amount Paid</TableHead>
                <TableHead>Points Earned</TableHead>
                <TableHead className="pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                    data-ocid="payments.empty_state"
                  >
                    No payments found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p, idx) => (
                  <TableRow key={p.id} data-ocid={`payments.row.${idx + 1}`}>
                    <TableCell className="pl-6 text-sm">{p.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-teal-500" />
                        <span className="text-sm font-medium">
                          {p.loanName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ₹{p.amount.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-xs">
                        +{p.pointsEarned.toLocaleString()} pts
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6">
                      <Badge className="bg-teal-50 text-teal-600 border-teal-100 text-xs">
                        Paid
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Loan breakdown */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Loan Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {state.emis.map((emi) => {
            const pct = Math.round((emi.paidAmount / emi.totalAmount) * 100);
            return (
              <div key={emi.id}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{emi.icon}</span>
                    <span className="text-sm font-medium">{emi.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">
                      ₹{emi.paidAmount.toLocaleString("en-IN")} / ₹
                      {emi.totalAmount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs font-bold text-teal-600 ml-2">
                      {pct}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
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
