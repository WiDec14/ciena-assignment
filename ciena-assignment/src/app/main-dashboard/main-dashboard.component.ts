import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-main-dashboard',
    templateUrl: './main-dashboard.component.html',
    styleUrls: ['./main-dashboard.component.sass']
})
export class MainDashboardComponent implements OnInit {

    menuItems: String[];

    constructor(private modalService: NgbModal) { }

    ngOnInit() {
        this.menuItems = ['Item 1', 'Item 2', 'Item 3'];
    }

    triggerModal(content: HTMLElement) {
        this.modalService.open(content, { ariaLabelledBy: 'logout-modal' });
    }

    onConfirmLogoutClick() {
        window.close();
    }

    onMenuItemClick(item: String) {
        alert(item + " has been clicked in the menu.");
    }

}
