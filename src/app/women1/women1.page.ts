import { Component, OnInit } from '@angular/core';
import { QuantityService } from '../services/quantity.services';

@Component({
  selector: 'app-women1',
  templateUrl: './women1.page.html',
  styleUrls: ['./women1.page.scss'],
})
export class Women1Page implements OnInit {

  constructor(public quantityService: QuantityService) { }

  ngOnInit() {
    this.quantityService.setItemQuantities([0,0,0,0,0]);
  }

  ionViewWillEnter() {
    this.quantityService.setItemQuantities([0,0,0,0,0]);
  }

  incrementQuantity(index: number) {
    this.quantityService.incrementQuantity(index);
  }

  decrementQuantity(index: number) {
    this.quantityService.decrementQuantity(index);
  }
}
