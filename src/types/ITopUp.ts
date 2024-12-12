export interface TopUpItem {
    top_up_amount: number;
    total_amount?: number;
}
export interface ITopUp {
    status?: number;
    data?: TopUpItem;
    top_up_amount: number;
    message?: string;
    total_amount?: number; 
}