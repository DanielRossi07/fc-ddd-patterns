import Address from "../value-object/address";

export default class CustomerDTO {
    private _name: string = "";
    private _address!: Address;
    private _rewardPoints: number = 0;
    private _street: string = "";
    private _number: number = 0;
    private _zip: string = "";
    private _city: string = "";

    constructor (name: string, rewardPoints: number, city: string, street: string, number: number, zip: string){
        this._name = name;
        this._rewardPoints = rewardPoints;
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
    }

    
    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get Address(): Address {
        return this._address;
    }

    get street(): string {
        return this._street;
    }
    
    get number(): number {
        return this._number;
    }
    
    get zip(): string {
        return this._zip;
    }

    get city(): string {
        return this._city;
    }
}