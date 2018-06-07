import { Component, OnInit } from '@angular/core';

import { Tab } from '../tab';
import { TabContentsService } from '../tab-contents.service';

@Component({
  selector: 'app-tabber-list',
  templateUrl: './tabber-list.component.html',
  styleUrls: ['./tabber-list.component.css']
})

export class TabberListComponent implements OnInit {

	tabs: Tab[];

	tabsDOM: HTMLElement;

	currentTab: number;

	disabledTop: boolean;

	disabledBottom: boolean;

	//runs as soon as a class instance is on the page
	constructor(private tabContentsService: TabContentsService) {
		this.currentTab = -1;

		//deals with bug for page refreshes when before something was tab focused
		if ("activeElement" in document){
			var ae:HTMLElement = <HTMLElement> document.activeElement;

			ae.blur();
		}
	}

	ngOnInit(): void {
		this.getTabs();


	}

	getTabs(): void {
		this.tabContentsService.getTabs()
		.subscribe(tabs => this.tabs = tabs);
	}

}
