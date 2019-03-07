import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Renderer } from '@angular/core';
import { RestaurantListService } from '../../services/restaurant-list.service';
import { environment } from 'src/environments/environment';
import { NotifyService } from 'src/app/app-commons/notify.service';
import { DecisionModalControlInterface } from 'src/app/app-commons/admin/interfaces/decision-modal.interface';

@Component({
  selector: 'app-restaurant-card-list',
  templateUrl: './restaurant-card-list.component.html',
  styleUrls: ['./restaurant-card-list.component.scss']
})
export class RestaurantCardListComponent implements OnInit {

  @ViewChild('fileInput') fileInput:any;

  @Input()
  data:any;

  @Output()
  clicked = new EventEmitter<any>();

  decisionModal: DecisionModalControlInterface;
  defaultModalCtrl = {
    closeDecision: false,
    decisionMessage: '',
    data: []
  };

  selectedFile:any;
  selectedRestId:any;
  imageUrl:string; 
  cardOptions:any = ["image", "edit", "trash"];

  constructor(
    private restaurantService: RestaurantListService,
    private notify: NotifyService,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.decisionModal = this.defaultModalCtrl;
  }

  ngOnChanges() {
  }

  async onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    let result:any = await this.restaurantService.saveImage(this.selectedFile, this.selectedRestId);

    if(result.image_src) { 
      let index = this.getCurrentRestIndex(result.id);
      this.data[index] = result;
      this.notify.success("admin.restaurant.image_changed");
    } 
  }

  goToDetails(id?: number) {
     this.clicked.emit({ go: true, id: id})
  }

  getBackground(id) {
    return `${environment.service_URL}/admin/restaurants/restaurant-image/${id}`;
  }

  getCurrentRestIndex(id) {
    return this.data.findIndex( val => val.id === id);
  }

  cardOptionClicked(evt, restaurantId) {
    this.selectedRestId = restaurantId;
    switch(evt) {
      case 'image': return this.triggerChildClickEvent(this.fileInput);
    case "edit": return this.goToDetails();
      case "trash": return this.remove(restaurantId);
    }
  }

  triggerChildClickEvent(child) {
    let event = new MouseEvent('click', {bubbles: true});
    this.renderer.invokeElementMethod(
        child.nativeElement, 'dispatchEvent', [event]);
  }

  remove(id) {
    this.decisionModal = {
      closeDecision: false,
      decisionMessage: "admin.restaurant.delete_restaurant",
      data: id
    }
  } 

  decisionConfirm(evt) {
    if(evt.opt) {
      console.log(evt.data);
    }
    this.decisionModal = {closeDecision: true};
  }
}

