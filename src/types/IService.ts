export interface ServiceItem extends IService {
    service_code: string;
    service_icon?: string;
    service_name?: string;
    service_tariff?: number;
    status?: number;
    total_amount?: number;
}

export interface IService {
    status?: number;
    message?: string;
    data?: ServiceItem[]
}