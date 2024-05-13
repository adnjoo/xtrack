export interface Expense {
  id: string;
  title: string;
  amount: string;
  category?: string | null;
  description?: string | null;
  date: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}
