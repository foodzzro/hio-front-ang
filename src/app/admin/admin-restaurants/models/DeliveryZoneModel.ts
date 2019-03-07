

export class RestaurantDeliveryZoneModel {

    public id?: string;
    public name: string;
    public charge: string;
    public coordinates: any;
    
    constructor (obj?: any ) {
        Object.assign(this, obj);
    }
}