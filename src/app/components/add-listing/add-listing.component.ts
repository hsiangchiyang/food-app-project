import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

  title:any;
  city:any;
  owner:any;
  image:any;
  bedrooms:any;
  type:any;
  price:any;

  constructor(private fs: FirebaseService, private router: Router) { }

  ngOnInit(): void {
  }
  onAddsubmit(){
    let listing = {
      title: this.title,
      city: this.city,
      owner: this.owner,
      type: this.type,
      bedrooms: this.bedrooms,
      price: this.price
    };
    this.fs.addListing(listing);
    this.router.navigate(['listings']);
  }

}
