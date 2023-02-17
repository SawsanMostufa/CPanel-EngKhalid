import { Size } from "./size";

export class Product
{
  public id: number = 0; 
  public name: string;
  public categoryId: number;
  public quantity: number = 0; 
  public description: string; 
  public pictureUrl: string = ""; 
  public productSizes: Size[];
  
}