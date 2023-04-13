import { VehicleCardProps } from "@/components/VehicleCard/VehicleCard"
import { eVehicleClass } from "./eClasses"

export const vehiclesMock : VehicleCardProps[] =
[
    {
        id: 1,
        label: "Carro do Ano 2000",
        model: "blista",
        brand: "Vapid",
        price: 20000,
        priceOffer: 18000,
        class: eVehicleClass.compacts,
        image: "vehicle-1",
        maxSpeed: 8,
        acceleration: 10,
        braking: 5,
        handling: 2
    },
    {
        id: 2,
        label: "Carro do Ano 2000",
        model: "blista",
        brand: "Vapid",
        price: 25000,
        class: eVehicleClass.coupes,
        priceOffer: 18000,
        image: "vehicle-2",
        maxSpeed: 8,
        acceleration: 10,
        braking: 5,
        handling: 2
    },
    {
        id: 3,
        label: "Carro do Ano 2000",
        model: "blista",
        brand: "Vapid",
        class: eVehicleClass.super,
        price: 25000,
        priceOffer: 18000,
        image: "vehicle-3",
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7
    },

    {
        id: 4,
        label: "Carro do Ano 2000",
        model: "blista",
        brand: "Vapid",
        class: eVehicleClass.super,
        price: 25000,
        priceOffer: 18000,
        image: "vehicle-4",
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7
    },

    {
        id: 5,
        label: "Carro do Ano 2000",
        model: "blista",
        brand: "Vapid",
        class: eVehicleClass.super,
        price: 25000,
        priceOffer: 18000,
        image: "vehicle-5",
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7
    },

    {
        id: 6,
        label: "Carro do Ano 2000",
        model: "blista",
        brand: "Vapid",
        class: eVehicleClass.super,
        price: 25000,
        // priceOffer: 18000,
        image: "vehicle-6",
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7
    },

    {
        id: 7,
        label: "Carro do Ano 2000",
        model: "blista",
        brand: "Vapid",
        class: eVehicleClass.compacts,
        price: 25000,
        // priceOffer: 18000,
        image: "vehicle-6",
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7
    },

    {
        id: 8,
        label: "Carro do",
        model: "blista",
        brand: "Vapid",
        class: eVehicleClass.sedans,
        price: 25000,
        priceOffer: 18000,
        image: "vehicle-6",
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7
    },
    {
        id: 8,
        label: "Carro Ano 2000",
        model: "blista",
        brand: "Vapid",
        class: eVehicleClass.sedans,
        price: 25000,
        // priceOffer: 18000,
        image: "vehicle-2",
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7
    },
    {
        id: 9,
        label: "Carro 2000",
        model: "blista",
        brand: "Vapid",
        class: eVehicleClass.sedans,
        price: 25000,
        // priceOffer: 18000,
        image: "vehicle-3",
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7
    },
]