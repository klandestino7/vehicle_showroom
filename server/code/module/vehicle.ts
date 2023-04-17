import { eVehicleClass } from "data/eClasses";

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

export class Vehicle
{
    constructor(
        public readonly id: number,

        public label: string,
        public model: string,
        public brand: string,
        public category: eVehicleClass,
        public image: string = "no-image",
    
        public readonly minPrice: number,
        public readonly maxPrice: number,
        public basePrice: number,
        public offerPrice: number,
    
        public stock: number,
        public availableColors: number[],
    
        public enabled: boolean = true
    ){
        this.id = id;
        this.label = label;
        this.model = model;
        this.brand = brand;
        this.category = category;
        this.image = image;
    
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.basePrice = basePrice;
        this.offerPrice = offerPrice;
    
        this.stock = stock;
        this.availableColors = availableColors;
    
        this.enabled = enabled;
    }

    setLabel(label: string)
    {
        this.label = label;
    }

    setModel(model: string)
    {
        this.model = model;
    }

    setBrand(brand: string)
    {
        this.brand = brand;
    }

    setClass(category: eVehicleClass)
    {
        if (category != eVehicleClass.all)
            this.category = category;
    }

    setImage(image: string)
    {
        this.image = image;
    }

    setStatus(status: boolean)
    {
        this.enabled = status;
    }

    setPrice(price: number)
    {
        if (price < this.minPrice || price > this.maxPrice)
        {
            return console.log("ERROR: Try set wron price to vehicle :: ", this.id);
        }

        this.basePrice = price;
    }

    setAvailableColors(colors: number[])
    {
        this.availableColors = colors;
    }

    setStock(number: number)
    {
        this.stock = number;
    }

    updateData(data: VehicleType)
    {
        this.label = data.label;
        this.model = data.model;
        this.brand = data.brand;
    
        this.basePrice = data.basePrice;
        this.offerPrice = data.offerPrice;
    
        this.availableColors = data.availableColors;
    
        this.enabled = data.enabled;
    }
}