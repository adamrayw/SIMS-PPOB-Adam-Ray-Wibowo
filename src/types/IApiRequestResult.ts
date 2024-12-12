export interface IApiRequestResult <T> {
    data: T | null;
    loading: boolean;
}