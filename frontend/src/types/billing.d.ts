declare type Billing = {
    id: string;
    user_id: string;
    month: number;
    year: number;
    usage: number;
    price: number;
    tax: number;
    total: number;
    created_at: string;
}

declare interface AddBillingParams {
    user_id: string;
    month: number;
    year: number;
}

declare interface GetBillingParams {
    user_id: string;
}