
export class MenuCategoryModel {

    id?: string;
    name: string;
    description: string;

    constructor(obj: any) {
        Object.assign(this, obj);
    }
}