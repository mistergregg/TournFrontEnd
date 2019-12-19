import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tourn = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor() { }

  ngOnInit() {
  }

  buttonSignUp() {}

}
