import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main-dashboard',
    templateUrl: './main-dashboard.component.html',
    styleUrls: ['./main-dashboard.component.sass']
})
export class MainDashboardComponent implements OnInit {

    menuItems: String[];

    constructor() { }

    ngOnInit() {
        this.menuItems = ['Item 1', 'Item 2', 'Item 3'];
    }

    onMenuItemClick(item: String) {
        alert(item + " has been clicked in the menu.");
    }

}
