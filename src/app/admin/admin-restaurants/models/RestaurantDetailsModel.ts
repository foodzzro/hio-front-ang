

export class RestaurantDetailsModel {

    static deliveryTypes:any = ["delivery", "pickup", "pickup_delivery"]
    static cuisines:any = [
        { name: "italiana"},
        { name: "romana"},
        { name: "turca"}
    ];
    static paymentMethods = ['CARD', 'CASH_ON_DELIVERY'];

    name: string;
    description?:string;
    min_order: number;
    mediumTimeDelivery:number;
    standardTax: number;
    freeDelivery: number;
    emailAlert?: string;
    deliveryType: string;
    showInSearch?: Boolean;
    contactPhone?: string;
    address?: string;
    city?: string;
    county?: string;
    cuisine: string;
    paymentType: any;
    active: Boolean;
    image_src: string;

    constructor(obj?:any) {
        Object.assign(this, obj);
        this.active = obj.active !== undefined ? obj.active : true;
        this.paymentType = obj.paymentType !== undefined ? obj.paymentType : [];
    }
}