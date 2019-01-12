
export class LocalStorageService {
    
    localStorageManagement: any = {};

    get = function (key: string) {
      let value = window.localStorage.getItem(key);
      try {
        return JSON.parse(value);
      }
      catch (error) {
        return value;
      }
  
    };

    set = function (key, value) {
      if (typeof (value) !== 'object') {
        window.localStorage.setItem(key, value);
      }
      else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    };
  
    clear = function () {
      window.localStorage.clear();
    };
  
    remove = function(key) {
      localStorage.removeItem(key);
    }

}
