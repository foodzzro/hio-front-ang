import { ViewChildren } from '@angular/core';

export class FilterComponent {

  @ViewChildren('filterInput') filterInputs;
  @ViewChildren('filterOpt') filterOpts;

  data: any;
  dataBkp: any;
  selected: any;

  constructor() {
    this.selected = [];
  }

  clearAllInputs() {
    this.filterInputs.forEach(
      (filterInput) => {
        filterInput.nativeElement.value = '';
      });
    this.data = this.dataBkp;
  }

  filterTable() {
    this.data = this.dataBkp;
    this.filterInputs.forEach(
      (filterInput) => {
        let keys;

        const value = filterInput.nativeElement ? filterInput.nativeElement.value.trim() : filterInput.value.trim();
        const key = filterInput.nativeElement ? filterInput.nativeElement.getAttribute('filterkey') : filterInput._elementRef.nativeElement.getAttribute('filterkey');

        if (value !== '') {
          // can filter for fieldslike "field.subfield"
          keys = key.split('.');
          this.data = this.data.filter(
            cell => {
              if (cell[key] != null && value != null) {
                return cell[key].toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1;
              } else if (keys && keys.length > 0 ) {
                // "field.subfield" case
                const attrib = cell[keys[0]];
                if (attrib != null) {
                  return attrib[keys[1]].toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1;
                }
              }
            }
          );
        }
      }
    );
  }

  showFilter() {
    this.clearAllInputs();
  }

  refreshData() {
    this.dataBkp = [...this.dataBkp];
    this.data = this.dataBkp;
  }

}
