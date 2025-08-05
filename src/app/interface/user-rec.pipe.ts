import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRec',
  standalone: true
})
export class UserRecPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value && typeof value === 'string' && args[0] === 'email') {
      // Convert the string to lowercase and trim whitespace
      let combin:any = []
      let valueAry: string[] = value.split('');
      let maskStartIndex = valueAry.length - 13;
      valueAry.forEach((char: string, index: number) => {
        if(index>=maskStartIndex){
          combin.push('*')
        }else{
          combin.push(char);
        }
      });
      // Join the characters back into a string
      return combin.join('');
    }
    if(value && typeof value === 'string' && args[0] === 'phone') {
      // Convert the string to lowercase and trim whitespace
      let combin:any = []
      let valueAry: string[] = value.split('');
      let maskStartIndex = valueAry.length - 5;
      valueAry.forEach((char: string, index: number) => {
        if(index>=maskStartIndex){
          combin.push('*')
        }else{
          combin.push(char);
        }
      });
      // Join the characters back into a string
      return combin.join('');
    }
    return value;
  }

}
