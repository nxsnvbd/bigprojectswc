import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuantityService {

  itemQuantities: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  incrementQuantity(index: number) {
    this.itemQuantities[index]++;
  }
  
  decrementQuantity(index: number) {
    if (this.itemQuantities[index] > 0) {
      this.itemQuantities[index]--;
    }
  }

  setItemQuantities(dateparam: number[]) {
    this.itemQuantities = dateparam;
  }

  constructor() { }
}