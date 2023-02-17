import { CommitteeInventoryEmployee } from "./committeeInventoryEmployee";

export class CommitteeInventory
{
  public committeeId: string;
  public committeeCode : Number = 0; 
  public committeeNameAr : string;
  public committeeNameEn: string;
  public isActive : Boolean;

  public TbCommitteeInventoryEmployees : CommitteeInventoryEmployee[];
}