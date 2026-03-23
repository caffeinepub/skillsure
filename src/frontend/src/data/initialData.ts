import type { AppState, RedemptionOption } from "../types";

export const initialState: AppState = {
  points: 12450,
  streak: 8,
  multiplier: 1.5,
  emis: [
    {
      id: "course",
      name: "Course Loan – Full Stack Dev",
      amount: 4500,
      dueDate: "Apr 1, 2026",
      color: "#0B6B6E",
      icon: "🎓",
      totalAmount: 54000,
      paidAmount: 18000,
    },
    {
      id: "skill",
      name: "Skill Development Loan",
      amount: 2800,
      dueDate: "Apr 5, 2026",
      color: "#7C3AED",
      icon: "📚",
      totalAmount: 33600,
      paidAmount: 8400,
    },
    {
      id: "abroad",
      name: "Study Abroad Loan",
      amount: 6200,
      dueDate: "Apr 10, 2026",
      color: "#DB2777",
      icon: "✈️",
      totalAmount: 74400,
      paidAmount: 12400,
    },
  ],
  payments: [
    {
      id: "p1",
      date: "Mar 1, 2026",
      loanName: "Course Loan – Full Stack Dev",
      amount: 4500,
      pointsEarned: 675,
    },
    {
      id: "p2",
      date: "Mar 5, 2026",
      loanName: "Skill Development Loan",
      amount: 2800,
      pointsEarned: 420,
    },
    {
      id: "p3",
      date: "Mar 10, 2026",
      loanName: "Study Abroad Loan",
      amount: 6200,
      pointsEarned: 930,
    },
    {
      id: "p4",
      date: "Feb 1, 2026",
      loanName: "Course Loan – Full Stack Dev",
      amount: 4500,
      pointsEarned: 675,
    },
    {
      id: "p5",
      date: "Feb 5, 2026",
      loanName: "Skill Development Loan",
      amount: 2800,
      pointsEarned: 420,
    },
  ],
  pointActivities: [
    {
      id: "a1",
      date: "Mar 1, 2026",
      description: "Course Loan payment",
      points: 675,
      type: "earned",
    },
    {
      id: "a2",
      date: "Mar 5, 2026",
      description: "Skill Development Loan payment",
      points: 420,
      type: "earned",
    },
    {
      id: "a3",
      date: "Mar 8, 2026",
      description: "Cashback redemption",
      points: 100,
      type: "redeemed",
    },
    {
      id: "a4",
      date: "Mar 10, 2026",
      description: "Study Abroad Loan payment",
      points: 930,
      type: "earned",
    },
    {
      id: "a5",
      date: "Mar 15, 2026",
      description: "EMI Reduction redemption",
      points: 500,
      type: "redeemed",
    },
  ],
  expenses: [
    {
      id: "e1",
      date: "Mar 20, 2026",
      category: "Food",
      description: "Groceries",
      amount: 850,
    },
    {
      id: "e2",
      date: "Mar 19, 2026",
      category: "Transport",
      description: "Metro pass",
      amount: 300,
    },
    {
      id: "e3",
      date: "Mar 18, 2026",
      category: "Education",
      description: "Udemy course",
      amount: 1299,
    },
    {
      id: "e4",
      date: "Mar 17, 2026",
      category: "Rent",
      description: "Room rent",
      amount: 6500,
    },
    {
      id: "e5",
      date: "Mar 16, 2026",
      category: "Health",
      description: "Pharmacy",
      amount: 450,
    },
    {
      id: "e6",
      date: "Mar 15, 2026",
      category: "Misc",
      description: "Stationery",
      amount: 220,
    },
  ],
  loanApplications: [],
};

export const redemptionOptions: RedemptionOption[] = [
  {
    id: "cashback",
    label: "Cashback",
    icon: "💰",
    pointsCost: 100,
    value: "₹10",
    colorClass: "text-emerald-600",
    bgClass: "bg-emerald-50 border-emerald-100",
  },
  {
    id: "emi_reduction",
    label: "EMI Reduction",
    icon: "📉",
    pointsCost: 500,
    value: "₹50 off",
    colorClass: "text-teal-600",
    bgClass: "bg-teal-50 border-teal-100",
  },
  {
    id: "discount",
    label: "Discount Voucher",
    icon: "🏷️",
    pointsCost: 200,
    value: "₹20 off",
    colorClass: "text-purple-600",
    bgClass: "bg-purple-50 border-purple-100",
  },
  {
    id: "store",
    label: "Store Voucher",
    icon: "🛍️",
    pointsCost: 300,
    value: "₹30 off",
    colorClass: "text-pink-600",
    bgClass: "bg-pink-50 border-pink-100",
  },
];

export function getMultiplier(streak: number): number {
  if (streak >= 12) return 2.0;
  if (streak >= 6) return 1.5;
  if (streak >= 3) return 1.2;
  return 1.0;
}

export function getMultiplierLabel(streak: number): string {
  const m = getMultiplier(streak);
  return `${m}x`;
}
