import { TbInventoryAssets } from "./tbInventoryAssets";

export class AssetInventoryModel
{
  public inventoryId: string = null;
  public inventoryCode: Number = 0; 
  public inventoryDate: Date;
  public committeeId: string = null;
  public locationId: string = null;
  public notes: string = "";

  public tbInventoryAssets : TbInventoryAssets[];
}