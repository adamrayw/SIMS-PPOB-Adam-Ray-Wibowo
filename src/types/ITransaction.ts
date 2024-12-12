interface RecordItem {
    invoice_number: string;
    transaction_type: string;
    description: string;
    total_amount: number;
    created_on: string;
}

interface TransactionData {
    limit: number;
    offset: number;
    records: RecordItem[];
}

export interface ITransaction {
    status: number;
    message: string;
    data: TransactionData;
}