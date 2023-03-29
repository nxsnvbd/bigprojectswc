import { Component, OnInit } from '@angular/core';
import { QuantityService } from '../services/quantity.services';

@Component({
  selector: 'app-women4',
  templateUrl: './women4.page.html',
  styleUrls: ['./women4.page.scss'],
})
export class Women4Page implements OnInit {

  constructor(public quantityService: QuantityService) { }

  ngOnInit() {
    this.quantityService.setItemQuantities([0,0,0,0,0,0,0,0]);
  }

  ionViewWillEnter() {
    this.quantityService.setItemQuantities([0,0,0,0,0,0,0,0]);
  }

  incrementQuantity(index: number) {
    this.quantityService.incrementQuantity(index);
  }

  decrementQuantity(index: number) {
    this.quantityService.decrementQuantity(index);
  }
}
