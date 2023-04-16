

class Category {
    public id : number;
    public label : string;
    public length : number;

    constructor(
        id : number,
        label : string,
        length : number
    )
    {
        this.id = id;
        this.label = label;
        this.length = length;
    }

    addLength(value: number)
    {
        this.length += value;
    }
}