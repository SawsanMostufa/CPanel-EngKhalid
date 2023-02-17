export class Authority
{
  public objectId   : string;
  public userGroupId   : string;
  public canEnter   :Boolean = false;
  public canAdd     :Boolean = false;
  public canEdit    :Boolean = false;
  public canShow    :Boolean = false;
  public canDelete  :Boolean = false;
  public canPrint   :Boolean = false;

  public hasEnter   :Boolean = false;
  public hasAdd   :Boolean = false;
  public hasEdit   :Boolean = false;
  public hasShow   :Boolean = false;   
  public hasDelete   :Boolean = false; 
  public hasPrint   :Boolean = false;
  
  public objectNameAr: string;
  public objectNameEn: string;
  
  public objectType: Number;
}