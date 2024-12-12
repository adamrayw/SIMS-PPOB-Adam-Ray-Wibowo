export interface UserItem extends IUser {
    email?: string;
    first_name?: string;
    last_name?: string;
    profile_image?: string;
    file?: string;
}

export interface IUser {
    status?: number;
    data?: UserItem;
}