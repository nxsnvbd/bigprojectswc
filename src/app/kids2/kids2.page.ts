import { Component, OnInit } from '@angular/core';
import { QuantityService } from '../services/quantity.services';

@Component({
  selector: 'app-kids2',
  templateUrl: './kids2.page.html',
  styleUrls: ['./kids2.page.scss'],
})
export class Kids2Page implements OnInit {

  constructor(public quantityService: QuantityService) { }

  ngOnInit() {
    this.quantityService.setItemQuantities([0,0,0,0,0,0,0,0,0,0]);
  }

  ionViewWillEnter() {
    this.quantityService.setItemQuantities([0,0,0,0,0,0,0,0,0,0]);
  }

  incrementQuantity(index: number) {
    this.quantityService.incrementQuantity(index);
  }

  decrementQuantity(index: number) {
    this.quantityService.decrementQuantity(index);
  }
}
