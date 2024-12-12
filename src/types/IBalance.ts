export interface BalanceItem {
    balance: number
}

export interface IBalance {
    status: number;
    message: string;
    data: BalanceItem;
}