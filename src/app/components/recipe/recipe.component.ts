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

  constructor(public fs: FirebaseService, private router: Router, private route: ActivatedRoute, private _modalService: NgbModal) { }

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
  }

  onDeleteClick(){
    this.fs.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
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
