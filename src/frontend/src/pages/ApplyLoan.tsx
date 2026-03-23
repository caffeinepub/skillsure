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
import { Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { AppState, LoanApplication } from "../types";

interface ApplyLoanProps {
  state: AppState;
  onStateChange: (s: AppState) => void;
}

const LOAN_TYPES = [
  {
    icon: "🎓",
    title: "Course Loan",
    desc: "For expensive courses, bootcamps, certifications",
    color: "#0B6B6E",
    bg: "bg-teal-50 border-teal-200",
  },
  {
    icon: "📚",
    title: "Skill Development Loan",
    desc: "For working professionals with low income who want to upskill",
    color: "#7C3AED",
    bg: "bg-purple-50 border-purple-200",
  },
  {
    icon: "✈️",
    title: "Study Abroad Loan",
    desc: "For students pursuing international education",
    color: "#DB2777",
    bg: "bg-pink-50 border-pink-200",
  },
];

const DURATIONS = [12, 24, 36, 48, 60];

export function ApplyLoan({ state, onStateChange }: ApplyLoanProps) {
  const [form, setForm] = useState({
    name: "",
    profession: "",
    monthlyIncome: "",
    courseName: "",
    loanAmount: "",
    durationMonths: "24",
  });
  const [submitting, setSubmitting] = useState(false);

  const income = Number(form.monthlyIncome);
  const loan = Number(form.loanAmount);

  let eligibility: { label: string; color: string; bg: string } | null = null;
  if (income > 0 && loan > 0) {
    if (income < 30000 && loan < 300000) {
      eligibility = {
        label: "High Eligibility ✅",
        color: "text-emerald-700",
        bg: "bg-emerald-50 border-emerald-200",
      };
    } else if (income < 60000) {
      eligibility = {
        label: "Moderate Eligibility ⚡",
        color: "text-amber-700",
        bg: "bg-amber-50 border-amber-200",
      };
    } else {
      eligibility = {
        label: "Review Required 🔍",
        color: "text-blue-700",
        bg: "bg-blue-50 border-blue-200",
      };
    }
  }

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.name ||
      !form.profession ||
      !form.monthlyIncome ||
      !form.courseName ||
      !form.loanAmount
    )
      return;
    setSubmitting(true);

    setTimeout(() => {
      const newApp: LoanApplication = {
        id: `loan${Date.now()}`,
        name: form.name,
        profession: form.profession,
        monthlyIncome: Number(form.monthlyIncome),
        courseName: form.courseName,
        loanAmount: Number(form.loanAmount),
        durationMonths: Number(form.durationMonths),
        status: "pending",
      };
      onStateChange({
        ...state,
        loanApplications: [newApp, ...state.loanApplications],
      });
      toast.success(
        "Application submitted! We'll review and contact you within 2-3 business days.",
      );
      setForm({
        name: "",
        profession: "",
        monthlyIncome: "",
        courseName: "",
        loanAmount: "",
        durationMonths: "24",
      });
      setSubmitting(false);
    }, 900);
  }

  return (
    <div className="animate-fade-in space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Apply for Education Loan
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          We support students and professionals with low-income backgrounds to
          grow through learning
        </p>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50 p-4">
        <Info size={18} className="text-teal-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-teal-800 font-medium leading-relaxed">
          SkillSure provides{" "}
          <strong>ONLY education and career growth loans</strong>. We do{" "}
          <strong>NOT</strong> offer car loans, home loans, or personal loans.
        </p>
      </div>

      {/* Loan Type Cards */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">
          Available Loan Types
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {LOAN_TYPES.map((lt) => (
            <div key={lt.title} className={`rounded-xl border p-4 ${lt.bg}`}>
              <div className="text-3xl mb-2">{lt.icon}</div>
              <p className="font-semibold text-sm text-foreground">
                {lt.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {lt.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Application Form */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Loan Application Form
            </CardTitle>
            {eligibility && (
              <Badge
                data-ocid="apply.success_state"
                className={`text-xs border ${eligibility.bg} ${eligibility.color}`}
                variant="outline"
              >
                {eligibility.label}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="al-name">Full Name</Label>
              <Input
                id="al-name"
                data-ocid="apply.input"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Rahul Sharma"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-prof">Current Profession / Study Goal</Label>
              <Input
                id="al-prof"
                data-ocid="apply.input"
                value={form.profession}
                onChange={(e) => handleChange("profession", e.target.value)}
                placeholder="e.g. Software Engineer / B.Tech Student"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-income">Monthly Income (₹)</Label>
              <Input
                id="al-income"
                data-ocid="apply.input"
                type="number"
                min={0}
                value={form.monthlyIncome}
                onChange={(e) => handleChange("monthlyIncome", e.target.value)}
                placeholder="e.g. 25000"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-course">Course / Program Name</Label>
              <Input
                id="al-course"
                data-ocid="apply.input"
                value={form.courseName}
                onChange={(e) => handleChange("courseName", e.target.value)}
                placeholder="e.g. Full Stack Web Development"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-loan">
                Loan Amount Required (₹, max ₹5,00,000)
              </Label>
              <Input
                id="al-loan"
                data-ocid="apply.input"
                type="number"
                min={1000}
                max={500000}
                value={form.loanAmount}
                onChange={(e) => handleChange("loanAmount", e.target.value)}
                placeholder="e.g. 80000"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Repayment Duration</Label>
              <Select
                value={form.durationMonths}
                onValueChange={(v) => handleChange("durationMonths", v)}
              >
                <SelectTrigger data-ocid="apply.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DURATIONS.map((d) => (
                    <SelectItem key={d} value={String(d)}>
                      {d} months
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2 pt-2">
              <Button
                type="submit"
                data-ocid="apply.submit_button"
                disabled={submitting}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold"
              >
                {submitting
                  ? "Submitting Application..."
                  : "Submit Application"}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                By submitting, you agree to SkillSure's terms. We review
                applications within 2-3 business days.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Previous Applications */}
      {state.loanApplications.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3">
            Your Applications
          </h2>
          <div className="space-y-3">
            {state.loanApplications.map((app, idx) => (
              <div
                key={app.id}
                data-ocid={`apply.item.${idx + 1}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {app.courseName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {app.name} · {app.profession}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">
                    ₹{app.loanAmount.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {app.durationMonths} months
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    app.status === "approved"
                      ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                      : app.status === "reviewing"
                        ? "text-amber-600 border-amber-200 bg-amber-50"
                        : "text-blue-600 border-blue-200 bg-blue-50"
                  }
                >
                  {app.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
