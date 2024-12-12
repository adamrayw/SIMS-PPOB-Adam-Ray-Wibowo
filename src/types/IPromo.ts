export interface PromoItem {
    banner_image: string
    banner_name: string;
    description: string;
}

export interface IPromo {
    status: number;
    message: string;
    data: PromoItem[];
}