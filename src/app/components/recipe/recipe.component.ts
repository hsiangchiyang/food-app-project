import { Component, OnInit , Type, Input} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase';


@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Recipe deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">{{recipe.title}}</span> ?</strong></p>
    <p>All information associated to this recipe will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirm {
  @Input() public recipe;
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: {[name: string]: Type<any>} = {
  focusFirst: NgbdModalConfirm,
};

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  id: any;
  recipe: any;
  url:any;
  cur_user:any;
  owner_name: any;
  is_favor: boolean = false;
  info: any;
  flag: boolean = true;

  constructor(public fs: FirebaseService, private router: Router, private route: ActivatedRoute, private _modalService: NgbModal) { }

  // TODO: isfavor() method is required to be simplified
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fs.getrecipeDetails(this.id).subscribe(recipe => {
      this.recipe = recipe ;
      this.url = this.recipe.video_link;
      const tag = document.getElementById('video');
      if (recipe.video_link != ''){
        tag.setAttribute('src' , this.url.replace("watch?v=", "embed/"));
        tag.setAttribute('width' , "560");
        tag.setAttribute('height' , "315");
      }
      console.log(recipe);
    });

    var testAppUser = localStorage.getItem('my-test-app-currentUser');
    if (testAppUser){
      this.fs.getUserinfo(JSON.parse(testAppUser)["uid"]).subscribe( info =>
        {
          this.info = info;
        }
      );
    }
    this.isFavor();
  }

  onDeleteClick(){
    this.fs.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  addToFavor(){
    var testAppUser = localStorage.getItem('my-test-app-currentUser');
    if (testAppUser){
      var check = this.info['favorite'];
      if (!check.includes(this.id) || this.flag){
        let new_info =  this.info['favorite'];
        new_info.push(this.id);
        console.log(new_info)
        this.fs.updateFavorites(JSON.parse(testAppUser)["uid"], new_info, "Added To Favorites");
        this.flag = false;
      }
      this.is_favor = true;
    }
  }

  removeFromFavor(){
    var testAppUser = localStorage.getItem('my-test-app-currentUser');
    if (testAppUser){
      var myArray = this.info['favorite'];
      const index = myArray.indexOf(this.id, 0);
      if (index > -1) {
        myArray.splice(index, 1);
      }
      this.fs.updateFavorites(JSON.parse(testAppUser)["uid"], myArray, "Removed From Favorites");
      this.flag = true;
      this.is_favor = false;
    }
  }

  isFavor(){
    var testAppUser = localStorage.getItem('my-test-app-currentUser');
    if (testAppUser){
      this.fs.getUserinfo(JSON.parse(testAppUser)["uid"]).subscribe( info =>
        {
          console.log(this.route.snapshot.params['id']);
          var check = info['favorite'];
          if (check.toString().indexOf(this.route.snapshot.params['id']) > -1){
            this.is_favor = true;
          }
        }
      );
    };
  }

  open(name: string) {
    const modalRef = this._modalService.open(MODALS[name]);
    modalRef.componentInstance.recipe = this.recipe;
    modalRef.result.then(
      (data: any) => {
        if( data == 'Ok click'){
          console.log('delete');
          this.onDeleteClick();
        };
      },
      (reason: any) => {
      }
    );
  }

}
