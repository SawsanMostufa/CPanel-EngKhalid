export class SearchModel
{
  public pageNo: number;
  public pageSize: number;
  public dateFrom: Date = null;
  public dateTo: Date = null;
}   

export class CommonSearchModel
{
  public pageNo: number;
  public pageSize: number;
  public searchText: string = null;
}   