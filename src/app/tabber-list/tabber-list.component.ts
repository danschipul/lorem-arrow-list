import { Component, OnInit } from '@angular/core';

import { Tab } from '../tab';
import { TabContentsService } from '../tab-contents.service';

@Component({
  selector: 'app-tabber-list',
  templateUrl: './tabber-list.component.html',
  styleUrls: ['./tabber-list.component.scss']
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

		(window as any).that = this;

		document.addEventListener('keyup', function(e) {
			if ( (9 == (e.keyCode || e.metaKey || e.ctrlKey)) && document.activeElement.id ){

				if( document.activeElement.id != "resetLink" ){
					var ct = document.activeElement.parentElement.dataset.tid;

					(window as any).that.tabSwitch( ct );
				}

				(window as any).that.buttonGrayMaster();
			}

		}, false);

		 //this represents the master ul element, parent to all tabs
    this.tabsDOM = document.getElementById("theTabs");

    //deals with bug for page refreshes when before something was tab focused
    if ("activeElement" in document){
      var ae:HTMLElement = <HTMLElement> document.activeElement;

      ae.blur();
    }

    this.tabsReset();

	}

	buttonGrayMaster(): void{

    //determine whether a tab is in focus or a clickable button has been clicked
    var actP = (document.activeElement.parentElement.tagName == "LI")?
    document.activeElement.parentElement : document.getElementsByClassName("selected")[0];

    //don't want the reset link to meddle with the disabling of on-screen arrows
    if( document.activeElement.tagName == "A" &&
    document.activeElement.parentElement.tagName != "LI" ){
      return;
    }

    var ide:number = this.getNodeIndex( actP );

    //should the onscreen up arrow be disabled?
    if( ide > 0 ){
      this.disabledTop = false;
    }else{
      this.disabledTop = true;
    }

    //should the onscreen down arrow be disabled?
    if( ide < this.tabs.length-1 ){
      this.disabledBottom = false;
    }else{
      this.disabledBottom = true;
    }
  }

	/* 
  replacement for a jquery technique.
  find out where the index of the currently selected element is
  */
  getNodeIndex(node): number {
    var index = -1;

    if( !node || !node.parentNode ){
      return index;
    }

    var theParent = node.parentNode;

    index = Array.prototype.indexOf.call(theParent.children, node);

    return index;
  }

	getTabs(): void {
		this.tabContentsService.getTabs()
		.subscribe(tabs => this.tabs = tabs);
	}

	//When someone hits the tab key
	tabSwitch(ct): void {
		this.currentTab = parseInt(ct);

		var didA = document.getElementById( "a_tab_" + this.currentTab );

		didA.focus();

		//fiddle with those blue/gray buttons
		this.buttonGrayMaster();
	}

	//effectively only for the keyboard arrows
	onArrowKey(event, obj): void {
		if ( event.code == "ArrowUp" || event.key == "ArrowUp" ) {
			this.shiftTabLocation(true);
		}

		if ( (event.code == "ArrowDown" || event.key == "ArrowDown") && document.getElementById("li_tab_" + obj.id).nextSibling ) {
			this.shiftTabLocation(false);
		}

		//refocus the tabbed element
		document.getElementById("a_tab_" + obj.id).focus();

		//fiddle with those blue/gray buttons
		this.buttonGrayMaster();
	}

	//when either a keyboard up/down arrow or onscreen arrow is hit
  shiftTabLocation(up:boolean): void{
    var didL = document.getElementById("li_tab_" + this.currentTab);
    var didA = document.getElementById("a_tab_" + this.currentTab);

    if( up ){
      //indicate whether this item is now at the top of the stack.  if so, stop everything else.
      if( this.getNodeIndex(didL) < 1 ){
        return;
      }

      // Insert this <li> before it's earlier sibling
      this.tabsDOM.insertBefore(didL, didL.previousSibling );
    }else{

      if( didL.nextSibling ){
        // Insert <li> after its next sibling
        this.tabsDOM.insertBefore(didL, didL.nextSibling.nextSibling );
      }
    }

    this.buttonGrayMaster();
    
    //placed the moved element into focus
    didA.focus();
  }

  //fires when the reset link is hit
  tabsReset(): void{
    //defined here rather than in ngOnInit, because we want its current state
    var elems = document.querySelectorAll(".li_tab");

    for( var i=0; i<this.tabs.length; i++ ){
      var theId = "li_tab_" + i;

      var el = document.getElementById( theId );

      if(el){
        //remove the focus from this tab
        el.blur();

        //push this tab back to its origin point
        this.tabsDOM.insertBefore(el, this.tabsDOM.childNodes[ theId ]);

        //remove the focus appearance
        el.classList.remove("selected");
      }
    }

  }

}