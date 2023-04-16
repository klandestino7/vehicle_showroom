import { requestModel } from "./utils/nativeWrapper";
import { Vec3 } from "./utils/vector3";

export class Vehicle {
    protected entity: number;

    protected readonly model: string;
    protected plate: string;
    public primaryColor: number;
    public secondaryColor: number;

    public position: Vec3;
    public rotation: Vec3;
    public isFreezed: boolean;
    public isLocked: boolean;

    constructor(
        model: string,
        position: Vec3,
        rotation: Vec3,
        primaryColor: number = 1,
        secondaryColor: number = 1,
        isFreezed: boolean = true,
        isLocked: boolean = true
    ){
        this.model = model;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.position = position;
        this.rotation = rotation;
        this.isFreezed = isFreezed;
        this.isLocked = isLocked;

        this.create(model, position, rotation);

        this.setRotation(rotation);
    }

    async create(model: string, position: Vec3, rotation: Vec3)
    {
        if (! this.entity )
        {
            const hash = GetHashKey(model);

            await requestModel(hash);

            const entity = CreateVehicle(hash, position.x, position.y, position.z, 0.0, false, true);
            this.entity = entity;
        }
    }

    destroy()
    {
        if (this.entity)
        {
            DeleteEntity(this.entity)
        }
    }

    setPosition(position: Vec3)
    {
        if (!this.entity) { return }
        this.position = position;

        SetEntityCoords(this.entity, position.x, position.y, position.z, false, false, false, false);
    }
    getPosition()
    {
        return this.position
    }

    setRotation(rotation: Vec3)
    {
        if (!this.entity) { return }
        this.rotation = rotation;

        SetEntityRotation(this.entity, rotation.x, rotation.y, rotation.z, 0, false);
    }
    getRotation()
    {
        return this.rotation
    }

    getFreeze()
    {
        return this.isFreezed
    }
    freeze(bool: boolean)
    {
        if (this.entity)
        {
            this.isFreezed = bool
            FreezeEntityPosition(this.entity, bool);
        }
    }

    getLockedStatus()
    {
        return this.isLocked
    }
    setLockStatus(bool: boolean)
    {
        if (this.entity)
        {
            this.isLocked = bool

            const status = this.isLocked ? 2 : 1;
            SetVehicleDoorsLocked(this.entity, status)
        }
    }

    setColor(primaryColor: number, secondaryColor: number = 1)
    {
        if (!this.entity) { return }
        SetVehicleColours(this.entity, primaryColor, secondaryColor);
    }
    setPlate(plate: string)
    {
        if (!this.entity) { return }
        this.plate = plate;
        SetVehicleNumberPlateText(this.entity, plate)
    }

    getEntity()
    {
        return this.entity;
    }
}