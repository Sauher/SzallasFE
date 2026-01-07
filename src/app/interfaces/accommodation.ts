export interface Accommodation {
    id: number;
    owner_Id?: number;
    name: string;
    description: string;
    address: string;
    capacity: number;
    basePrice: number;
    active: boolean;
    createdAt: Date;
    imageUrl?: string;
}