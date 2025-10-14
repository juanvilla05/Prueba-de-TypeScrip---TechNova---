export interface Product {
    _id?: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    quantity: number;
    isActive: boolean;
    imageUrl?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface ApiResponse<T> {
    ok?:boolean;
    data?:T;
    error?:string;
}