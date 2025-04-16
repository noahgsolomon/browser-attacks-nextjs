"use client";

import { Bar, BarChart, Line, LineChart } from "recharts";
import { CreditCard, DollarSign, Plus, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

import { Header } from "../page";

const accountData = [
  { month: "Jan", balance: 2500 },
  { month: "Feb", balance: 3800 },
  { month: "Mar", balance: 3200 },
  { month: "Apr", balance: 4100 },
  { month: "May", balance: 3700 },
  { month: "Jun", balance: 5200 },
  { month: "Jul", balance: 4800 },
];

const transactionData = [
  { month: "Jan", spending: 850 },
  { month: "Feb", spending: 1200 },
  { month: "Mar", spending: 900 },
  { month: "Apr", spending: 1100 },
  { month: "May", spending: 750 },
  { month: "Jun", spending: 1300 },
  { month: "Jul", spending: 1000 },
];

const chartConfig = {
  balance: {
    label: "Balance",
    color: "var(--primary)",
  },
  spending: {
    label: "Spending",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <h1 className="text-3xl text-secondary mb-8 font-bold">Welcome, John!</h1>
      <Dashboard />
    </div>
  );
}

export function Dashboard() {
  return (
    <main className="my-auto py-8 max-w-[75%] mx-auto">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Checking Account
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,825</div>
            <p className="text-xs text-muted-foreground">Account #: XXXX1234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Savings Account
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,458</div>
            <p className="text-xs text-muted-foreground">Account #: XXXX5678</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Card</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,280</div>
            <p className="text-xs text-muted-foreground">Available: $8,719</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 mb-6">
        <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button>
            <Send className="mr-2 h-4 w-4" /> Transfer Money
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add Account
          </Button>
          <Button variant="outline">
            <CreditCard className="mr-2 h-4 w-4" /> View Cards
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
            <CardDescription>Your account balance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <LineChart
                data={accountData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="balance"
                  stroke="var(--color-balance)"
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending</CardTitle>
            <CardDescription>
              Your spending over the last months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <BarChart data={transactionData}>
                <Bar
                  dataKey="spending"
                  fill="var(--color-spending)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
