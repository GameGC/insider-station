import {Document} from "mongoose";

export  interface RRSModel
{
    RequestByTiker(tiker:string);
    RequestById(id:number,check?:boolean);
    Responce();

    Save(arg: Document);
}
