import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractId',
})
export class ExtractIdPipe implements PipeTransform {
  transform(url: string): string {
    const regex = /\/(\d+)\/$/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      return '';
    }
  }
}
