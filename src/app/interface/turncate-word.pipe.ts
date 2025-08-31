import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turncateWord',
  standalone: true
})
export class TurncateWordPipe implements PipeTransform {

  transform(value: unknown, args: number): unknown {
    
    if (!value) return '';
    const strValue = String(value);
    const words = strValue.split(' ');
    return words.length > args ?  words.slice(0, args).join(' ') + '...' : value;
  
  }
}
