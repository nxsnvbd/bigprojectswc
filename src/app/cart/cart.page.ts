import { Component, OnInit } from '@angular/core';
import { QuantityService } from '../services/quantity.services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(public quantityService: QuantityService) {}

  ngOnInit() {
  }

  checkPcs(quantity: number) {
    if (quantity <= 0) {
      return false;
    } else {
      return true;
    }
  }
}
