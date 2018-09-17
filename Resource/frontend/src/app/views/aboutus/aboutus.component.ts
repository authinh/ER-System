import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  lat: number = 21.03;
  lng: number = 105.815555;
  zoom: number = 15;
  dir: any = null;
  public renderOptions = {
    suppressMarkers: true,
}

public markerOptions = {
    origin: {
    },
    destination: {
        infoWindow: "Nhà hàng CTW 409 Kim mã"
    },
}
  constructor() { }

  ngOnInit() {
  	if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.dir = { 
		  	origin: { 
		  		lat: this.lat, 
		  		lng: this.lng
		  	}, 
		  	destination: {
		  		lat: this.lat, 
		  		lng: this.lng
		  	}
		  };
		this.dir.origin.lat = position.coords.latitude;
		this.dir.origin.lng = position.coords.longitude;
        console.log(this.dir);
      });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
   }
}
