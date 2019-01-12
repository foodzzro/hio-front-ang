import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class MapLoaderService {
    private static promise: Promise<any>;
    public static load(): Promise<any> {

      let map = {
        URL: environment.gMaps_URL + environment.gMaps_API_KEY + '&callback=__onGoogleLoaded',      
      }
  
      // First time 'load' is called?
      if (!this.promise) {
  
        // Make promise to load
        this.promise = new Promise(resolve => {
          this.loadScript(map.URL);        
          // Set callback for when google maps is loaded.
          window['__onGoogleLoaded'] = ($event) => {
            resolve('google maps api loaded');
          };
        })
      }
  
      // Always return promise. When 'load' is called many times, the promise is already resolved.
      return this.promise;
    }
  
    //this function will work cross-browser for loading scripts asynchronously
    static loadScript(src, callback?): void {
      var s: any,
        r,
        t;
      r = false;
      s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = src;
      s.onload = s.onreadystatechange = function () {
        //console.log( this.readyState ); //uncomment this line to see which ready states are called.
        if (!r && (!this.readyState || this.readyState == 'complete')) {
          r = true;
          if (typeof callback === "function")
            callback();
        }
      };
      t = document.getElementsByTagName('script')[0];
      t.parentNode.insertBefore(s, t);
    }
  }