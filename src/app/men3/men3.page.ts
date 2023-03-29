import { Component, OnInit } from '@angular/core';
import { QuantityService } from '../services/quantity.services';

@Component({
  selector: 'app-men3',
  templateUrl: './men3.page.html',
  styleUrls: ['./men3.page.scss'],
})
export class Men3Page implements OnInit {

  constructor(public quantityService: QuantityService) { }

  ngOnInit() {
    this.quantityService.setItemQuantities([0,0,0]);
  }

  ionViewWillEnter() {
    this.quantityService.setItemQuantities([0,0,0]);
  }

  incrementQuantity(index: number) {
    this.quantityService.incrementQuantity(index);
  }

  decrementQuantity(index: number) {
    this.quantityService.decrementQuantity(index);
  }
}
