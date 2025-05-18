import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberColor'
})
export class NumberColorPipe implements PipeTransform {

 transform(value: number): string {
    return value <= 0 ? 'red' : 'blue';
  }

}
