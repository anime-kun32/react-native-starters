export interface Asset {
    id: string;
    name: string;
    amount: number;
    type: 'equity' | 'mutualFund' | 'other';
    date: string;
}

export interface Expense {
    id: string;
    amount: number;
    category: string;
    date: string;
    description: string;
}

export interface Income {
    id: string;
    source: string;
    amount: number;
    frequency: 'monthly' | 'yearly' | 'one-time';
    date: string;
}

export interface FinanceData {
    assets: Asset[];
    expenses: Expense[];
    incomes: Income[];
}
