import { VehicleCardProps } from "@/components/VehicleCard/VehicleCard"
import { eVehicleClass } from "./eClasses"

export const vehiclesMock : VehicleCardProps[] =
[
    {
        id: 1,
        label: "Carro do Ano 2000",
        model: "blista",
        brand: "Vapid",
        category: eVehicleClass.compacts,
        image: "vehicle-1",

        minPrice: 15000,
        maxPrice: 30000,
        basePrice: 20000,
        offerPrice: 18000,

        stock: 5,
        availableColors: [2, 3, 4],
        enabled: true,
        
        maxSpeed: 232,
        acceleration: 10,
        braking: 5,
        handling: 2,
    },
    {
        id: 2,
        label: "Carro do Ano 2000",
        model: "elegy",
        brand: "Vapid",
        basePrice: 25000,
        minPrice: 15000,
        maxPrice: 30000,
        offerPrice: 18000,
        category: eVehicleClass.coupes,
        image: "vehicle-2",
        stock: 5,
        maxSpeed: 8,
        acceleration: 10,
        braking: 5,
        handling: 2,
        availableColors: [],
        enabled: true,
    },
    {
        id: 3,
        label: "Carro do Ano 2000",
        model: "infernus",
        brand: "Vapid",
        category: eVehicleClass.super,
        basePrice: 25000,
        minPrice: 15000,
        maxPrice: 30000,
        offerPrice: 18000,
        image: "vehicle-3",
        stock: 5,
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7,
        availableColors: [],
        enabled: true,
    },

    {
        id: 4,
        label: "Carro do Ano 2000",
        model: "champion",
        brand: "Vapid",
        category: eVehicleClass.super,
        basePrice: 25000,
        minPrice: 15000,
        maxPrice: 30000,
        offerPrice: 18000,
        image: "vehicle-4",
        stock: 5,
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7,
        availableColors: [],
        enabled: true,
    },

    {
        id: 5,
        label: "Carro do Ano 2000",
        model: "blista",
        brand: "Vapid",
        category: eVehicleClass.super,
        
        basePrice: 25000,
        minPrice: 15000,
        maxPrice: 30000,
        offerPrice: 18000,
        image: "vehicle-5",
        stock: 5,
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7,
        availableColors: [],
        enabled: true,
    },

    {
        id: 6,
        label: "Carro do Ano 2000",
        model: "elegy",
        brand: "Vapid",
        category: eVehicleClass.super,
        basePrice: 25000,
        minPrice: 15000,
        maxPrice: 30000,
        // offerPrice: 18000,
        image: "vehicle-6",
        stock: 5,
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7,
        availableColors: [],
        enabled: true
    },

    {
        id: 7,
        label: "Carro do Ano 2000",
        model: "sanchez",
        brand: "Vapid",
        category: eVehicleClass.compacts,
        basePrice: 25000,
        minPrice: 15000,
        maxPrice: 30000,
        // offerPrice: 18000,
        image: "vehicle-6",
        stock: 5,
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7,
        availableColors: [],
        enabled: true,
    },

    {
        id: 8,
        label: "Carro do",
        model: "blista",
        brand: "Vapid",
        category: eVehicleClass.sedans,
        basePrice: 25000,
        minPrice: 15000,
        maxPrice: 30000,
        offerPrice: 18000,
        image: "vehicle-6",
        stock: 5,
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7,
        availableColors: [],
        enabled: true,
    },
    {
        id: 9,
        label: "Carro Ano 2000",
        model: "blista",
        brand: "Vapid",
        category: eVehicleClass.sedans,
        basePrice: 25000,
        minPrice: 15000,
        maxPrice: 30000,
        // offerPrice: 18000,
        image: "vehicle-2",
        stock: 5,
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7,
        availableColors: [],
        enabled: true,
    },
    {
        id: 10,
        label: "Blista",
        model: "blista",
        brand: "Vapid",
        category: eVehicleClass.sedans,
        basePrice: 25000,
        minPrice: 15000,
        maxPrice: 30000,
        // offerPrice: 18000,
        image: "vehicle-3",
        stock: 5,
        maxSpeed: 232,
        acceleration: 124,
        braking: 232,
        handling: 3.7,
        availableColors: [],
        enabled: true,
    },
]