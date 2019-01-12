import { Component, OnInit } from '@angular/core';
import { MapLoaderService } from 'src/app/app-commons/map-loader.service';
declare var google: any;

@Component({
  selector: 'app-delivery-area',
  templateUrl: './delivery-area.component.html',
  styleUrls: ['./delivery-area.component.css']
})
export class DeliveryAreaComponent implements OnInit {

  map: any;
  drawingManager: any;
  selectedShape: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    MapLoaderService.load().then(() => {
      this.drawPolygon();
    })
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

    var redCoords = [
      {lat: 45.774, lng: 23.190},
      {lat: 46.466, lng: 22.118},
      {lat: 48.321, lng: 21.757}
    ];

    this.selectedShape = new google.maps.Polygon({
      map: this.map,
      paths: redCoords,
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
    var that = this;
    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        //this is the coordinate, you can assign it to a variable or pass into another function.
        alert(event.overlay.getPath().getArray());
      }

         
      if (event.type != google.maps.drawing.OverlayType.MARKER) {
        // Switch back to non-drawing mode after drawing a shape.
        that.drawingManager.setDrawingMode(null);
  
        // Add an event listener that selects the newly-drawn shape when the user
        // mouses down on it.
        var newShape = event.overlay;
        newShape.type = event.type;
        google.maps.event.addListener(newShape, 'click', function() {
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

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

}
