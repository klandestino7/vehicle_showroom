/*
import chalk = require("chalk");
const luminousPrefix = chalk.white.bgGreen.bold('luminous') + ' ';
const isServer = IsDuplicityVersion();
export function println(text: string) {
    //const date = new Date();
    //console.log(chalk.white.bgGreen.bold('luminous') + chalk.dim(date.toLocaleTimeString()) + ` :: ${text}`);
    
    console.log( (isServer ? luminousPrefix : '') + `:: ${text}`);
}
*/

const HEX_REGEX = /0[xX][0-9a-fA-F]+/;

export const isHex = function hexColor(value: string): void {
    if (!HEX_REGEX.test(value)) {
        throw new Error(`"${value}" is not a hex color value.`);
    }
}

export function decodeProtobuffer(buffer: any): Uint8Array {
    return Uint8Array.from(Object.values(buffer));
}

export interface Vec3 {
    x: number;
    y: number;
    z: number;
}

export class Vector3 implements Vec3 {
    public static create(v1: number | Vec3 | number[]): Vector3 {
    if (typeof v1 === 'number') {
        return new Vector3(v1, v1, v1);
    }

    if (Array.isArray(v1))
    {
        return new Vector3(v1[0], v1[1], v1[2]);
    }

    return new Vector3(v1.x, v1.y, v1.z);
    }

    public static clone(v1: Vec3): Vector3 {
    return Vector3.create(v1);
    }

    public static add(v1: Vec3, v2: number | Vec3): Vector3 {
    if (typeof v2 === 'number') {
        return new Vector3(v1.x + v2, v1.y + v2, v1.z + v2);
    }
    return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    public static subtract(v1: Vec3, v2: Vec3): Vector3 {
    return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }

    public static multiply(v1: Vec3, v2: Vec3 | number): Vector3 {
    if (typeof v2 === 'number') {
        return new Vector3(v1.x * v2, v1.y * v2, v1.z * v2);
    }
    return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
    }

    public static divide(v1: Vec3, v2: Vec3 | number): Vector3 {
    if (typeof v2 === 'number') {
        return new Vector3(v1.x / v2, v1.y / v2, v1.z / v2);
    }
    return new Vector3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
    }

    public static dotProduct(v1: Vec3, v2: Vec3): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    public static crossProduct(v1: Vec3, v2: Vec3): Vector3 {
    const x = v1.y * v2.z - v1.z * v2.y;
    const y = v1.z * v2.x - v1.z * v2.z;
    const z = v1.x * v2.y - v1.z * v2.x;
    return new Vector3(x, y, z);
    }

    public static normalize(v: Vector3): Vector3 {
    return Vector3.divide(v, v.Length);
    }

    constructor(public x: number, public y: number, public z: number) {}

    public clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
    }

    /**
     * The product of the Euclidean magnitudes of this and another Vector3.
     *
     * @param v Vector3 to find Euclidean magnitude between.
     * @returns Euclidean magnitude with another vector.
     */
    public distanceSquared(v: Vec3): number {
    const w: Vector3 = this.subtract(v);
    return Vector3.dotProduct(w, w);
    }

    /**
     * The distance between two Vectors.
     *
     * @param v Vector3 to find distance between.
     * @returns Distance between this and another vector.
     */
    public distance(v: Vec3): number {
    return Math.sqrt(this.distanceSquared(v));
    }

    public get normalize(): Vector3 {
    return Vector3.normalize(this);
    }

    public crossProduct(v: Vec3): Vector3 {
    return Vector3.crossProduct(this, v);
    }

    public dotProduct(v: Vec3): number {
    return Vector3.dotProduct(this, v);
    }

    public add(v: number | Vec3): Vec3 {
    return Vector3.add(this, v);
    }

    public subtract(v: Vec3): Vector3 {
    return Vector3.subtract(this, v);
    }

    public multiply(v: number | Vec3): Vector3 {
    return Vector3.multiply(this, v);
    }

    public divide(v: number | Vec3): Vec3 {
    return Vector3.divide(this, v);
    }

    public replace(v: Vec3): void {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    }

    public get Length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public toArray(): [number, number, number]
    {
        return [ this.x, this.y, this.z ];
    }
}