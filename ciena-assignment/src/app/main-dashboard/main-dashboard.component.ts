import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-main-dashboard',
    templateUrl: './main-dashboard.component.html',
    styleUrls: ['./main-dashboard.component.sass']
})
export class MainDashboardComponent implements OnInit {

    constructor(private modalService: NgbModal) { }

    ngOnInit() {
    }

    triggerModal(content: HTMLElement) {
        this.modalService.open(content, { ariaLabelledBy: 'logout-modal' });
    }

    onConfirmLogoutClick() {
        window.close();
    }

}
