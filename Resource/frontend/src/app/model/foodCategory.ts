export class FoodCategory {
    id: number;
    name: string;
    description: string;
    image: string;
    parent: {
        parentId:number;
        parentName:string;
    }
}