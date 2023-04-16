import { eVehicleClass } from "./category";

export type VehicleType =
{
    id: number;
    label: string;
    model: string;
    brand: string;
    category: eVehicleClass;
    image: string;

    minPrice: number;
    maxPrice: number;
    basePrice: number;
    offerPrice?: number;

    stock: number;
    availableColors: number[];

    enabled: boolean;
}