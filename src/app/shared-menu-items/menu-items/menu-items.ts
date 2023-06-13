import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'home', type: 'link', name: 'Home', icon: 'home' },
  { state: 'leads', type: 'link', name: 'Leads', icon: 'people' },
  { state: 'projects', type: 'link', name: 'Projects', icon: 'folder_open' },
  { state: 'users', type: 'link', name: 'Users', icon: 'person_add' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
