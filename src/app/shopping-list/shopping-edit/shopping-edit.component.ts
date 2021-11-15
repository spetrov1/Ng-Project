import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  a: number;
  constructor() { }

  ngOnInit(): void {
  }

  helloWorld() {
    this.a = 5;
    this.a = this.a + 1;
    console.log(this.a);
  }

}
