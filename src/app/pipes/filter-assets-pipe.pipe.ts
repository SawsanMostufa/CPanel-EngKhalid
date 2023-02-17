import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAssetsPipe'
})
export class FilterAssetsPipePipe implements PipeTransform {

  transform(assets: any[], filter: any): any[] {
    if (!assets || !filter) {
        return assets;
    }
    return assets.filter(item => item.assetBarcode.indexOf(filter) !== -1);
}

}
