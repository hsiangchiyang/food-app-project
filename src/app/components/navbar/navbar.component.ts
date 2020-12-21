import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public fs: FirebaseService, private router: Router) { }

  ngOnInit(): void {

  }
  login(){
    this.fs.login();
  }
  logout(){
    this.fs.logout();
    this.router.navigate(['']);
  }
}
