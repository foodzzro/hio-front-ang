import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MapLoaderService } from 'src/app/app-commons/map-loader.service';
import { RestaurantDetailsService } from '../services/restaurant-details.service';
import { RestaurantDeliveryZoneModel } from '../../models/DeliveryZoneModel';
import { ActivatedRoute } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-delivery-area',
  templateUrl: './delivery-area.component.html',
  styleUrls: ['./delivery-area.component.css']
})
export class DeliveryAreaComponent implements OnInit, OnChanges {

  @Input()
  selected: string;

  deliveryZones: RestaurantDeliveryZoneModel[] = [];
  selectedDeliveryZone: RestaurantDeliveryZoneModel;
  restaurantId: any;
  coordinates: any;
  editMode: boolean = false;
  collapsed: boolean = false;
  collapse: any[] = [];

  map: any;
  drawingManager: any;
  selectedShape: any;
  drawedShape: any;

  constructor(
    private restaurantService: RestaurantDetailsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.restaurantId = this.route.snapshot.params.id;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.isSelectedChange(changes)) {
      this.restaurantService.getDeliveryZones(this.restaurantId).then( (result: RestaurantDeliveryZoneModel[]) => {
        this.deliveryZones = result;
        this.initCollapse();
      })
    }
  }

  isSelectedChange(changes: SimpleChanges) {
      return changes.selected.currentValue == "area" && changes.selected.previousValue !== changes.selected.currentValue;
  }

  ngAfterViewInit() {
    MapLoaderService.load().then(() => {
      this.drawPolygon();
    });
  }

  initCollapse() {
    this.collapse = this.deliveryZones.map( (element: RestaurantDeliveryZoneModel) => {
      return true;
    })
  }

  selectDeliveryZone(zone: RestaurantDeliveryZoneModel) {
    this.selectedDeliveryZone = zone;
  }

  drawPolygon() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 47.1562327, lng: 27.5169308},
      zoom: 8
    }); 

    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon']
      },
      markerOptions: {
        draggable: true
      },
      polygonOptions: {
        strokeWeight: 0,
        fillOpacity: 0.45,
        editable: true,
        draggable: true,
        fillColor: '#FF1493'
      }
    });

    this.drawingManager.setMap(this.map);
    var that = this;

    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event: any) => {
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
  
        let result = [];
        event.overlay.getPath().getArray().map( (value) => {
          let obj = {
            lat: value.lat(),
            lng: value.lng()
          };
          result.push(obj);
        });
        this.setCoordinates(result);
      }

      this.addPolygonEditEvents(event.overlay);

      if (event.type != google.maps.drawing.OverlayType.MARKER) {
        that.drawingManager.setDrawingMode(null);
        var newShape = event.overlay;
        newShape.type = event.type;
        google.maps.event.addListener(newShape, 'click', function(polygonEvent: any) {

          that.selectedShape = newShape;
          newShape.setEditable(true);
        });
        this.selectedShape = newShape;
      }
    });
  }

  clearShape() {
    if(this.selectedShape) {
      this.selectedShape.setMap(null);
      this.drawingManager.setMap(this.map);
    }
  }
  setCoordinates(coords) {
    this.coordinates = coords;
    if (this.selectedDeliveryZone) {
      this.deliveryZones = this.deliveryZones.map( val => {
        if (val.id === this.selectedDeliveryZone.id) {
          val.coordinates = JSON.stringify(coords);
        }
        return val;
      });
    }
  }

  setEditMode() {
    this.editMode = true;
  }

  setAddMode() {
    this.editMode = true;
  }

  onChangeZone(event: RestaurantDeliveryZoneModel) {

    if (!event) { 
      this.clearShape();
      return;
    }

    this.clearShape();
    this.setEditMode();
    this.collapseDeliveryZone(event.id)
    this.collapsed = !this.collapsed;
    
    this.selectedDeliveryZone = event;
    this.selectedShape = new google.maps.Polygon({
      map: this.map,
      paths: JSON.parse(event.coordinates),
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      draggable: true,
      editable:true,
      geodesic: true
    });
    this.drawingManager.setMap(this.map);
    this.addPolygonEditEvents(this.selectedShape);
  }

  addZone() {
   this.clearShape();
   this.setEditMode(); 
   this.collapseDeliveryZone(null);
  }

  collapseDeliveryZone(exclude: string) {
    let currentIndex = this.deliveryZones.findIndex( el => el.id === exclude);
    this.collapse = new Array(this.deliveryZones.length).fill(true);
    this.collapse[currentIndex] = false;
  }

  addPolygonEditEvents(polygon: any) {
    polygon.getPaths().forEach( (path, index) => {
      google.maps.event.addListener(path, 'set_at',  (event:any) => {

        let result = [];
        polygon.getPath().getArray().map( (value) => {
          let obj = {
            lat: value.lat(),
            lng: value.lng()
          };
          result.push(obj);
        });
        this.setCoordinates(result);
      });
    });
  }

  onAddComplete(deliveryZone: RestaurantDeliveryZoneModel) {
    this.deliveryZones.push(deliveryZone);
    this.collapsed = !this.collapsed;
  }

  onRemoveZone(id: any) {
    this.deliveryZones = this.deliveryZones.filter( (element: any) => element.id !== id);
  }
}
