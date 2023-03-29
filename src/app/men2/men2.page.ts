import { Component, OnInit } from '@angular/core';
import { QuantityService } from '../services/quantity.services';

@Component({
  selector: 'app-men2',
  templateUrl: './men2.page.html',
  styleUrls: ['./men2.page.scss'],
})
export class Men2Page implements OnInit {

  constructor(public quantityService: QuantityService) { }

  ngOnInit() {
    this.quantityService.setItemQuantities([0,0]);
  }

  ionViewWillEnter() {
    this.quantityService.setItemQuantities([0,0]);
  }

  incrementQuantity(index: number) {
    this.quantityService.incrementQuantity(index);
  }

  decrementQuantity(index: number) {
    this.quantityService.decrementQuantity(index);
  }
}
