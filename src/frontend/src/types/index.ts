export type Page =
  | "dashboard"
  | "payments"
  | "rewards"
  | "profile"
  | "expenses"
  | "apply";

export interface EMI {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  color: string;
  icon: string;
  totalAmount: number;
  paidAmount: number;
}

export interface Payment {
  id: string;
  date: string;
  loanName: string;
  amount: number;
  pointsEarned: number;
}

export interface PointActivity {
  id: string;
  date: string;
  description: string;
  points: number;
  type: "earned" | "redeemed";
}

export interface RedemptionOption {
  id: string;
  label: string;
  icon: string;
  pointsCost: number;
  value: string;
  colorClass: string;
  bgClass: string;
}

export interface Expense {
  id: string;
  date: string;
  category: "Food" | "Transport" | "Education" | "Misc" | "Rent" | "Health";
  description: string;
  amount: number;
}

export interface LoanApplication {
  id: string;
  name: string;
  profession: string;
  monthlyIncome: number;
  courseName: string;
  loanAmount: number;
  durationMonths: number;
  status: "pending" | "approved" | "reviewing";
}

export interface AppState {
  points: number;
  streak: number;
  multiplier: number;
  payments: Payment[];
  pointActivities: PointActivity[];
  emis: EMI[];
  expenses: Expense[];
  loanApplications: LoanApplication[];
}
