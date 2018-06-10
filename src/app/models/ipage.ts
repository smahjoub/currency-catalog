export interface IPage<T> {
    data: T[];
    total: number;
    pages: number;
}
