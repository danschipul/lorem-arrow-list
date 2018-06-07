import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Tab } from './tab';
import { TABCONTENTS } from './tab-contents';


@Injectable({
  providedIn: 'root'
})
export class TabContentsService {

  constructor() { }

  getTabs(): Observable<Tab[]> {
  	return of(TABCONTENTS);
  }

  getTab(id: number): Observable<Tab> {
  	return of(TABCONTENTS.find(tab => tab.id === id));
  }
}
