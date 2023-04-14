import { eVehicleClass } from "data/eClasses";


export type VehicleTypeNode = {
    id: number;
    label: string;
    model: string;
    brand: string;

    price: number;
    priceOffer?: number;

    class: eVehicleClass;

    image: string;

    maxSpeed: number;
    acceleration: number;
    braking: number;
    handling: number;

    showVehicleStatus?: boolean;
}
