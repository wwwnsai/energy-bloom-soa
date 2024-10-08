declare type ElectricityUsage = {
    id: string;
    user_id: string;
    month: number;
    year: number;
    usage: number;
    price: number;
    created_at: string;
    updated_at: string;
};

declare interface GetTodayUsageParams {
    user_id: string;
}

declare interface GetMonthlyUsageParams {
    user_id: string;
}

declare interface AddElectricityUsageParams {
    user_id: string;
    usage: number;
    price: number;
}

declare interface UpdateElectricityUsageParams {
    user_id: string;
    usage: number;
    price: number;
}

declare interface AddorUpdateElectricityUsageParams {
    user_id: string;
    usage: number;
    price: number;
}

