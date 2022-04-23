import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-dashboard-header',
    templateUrl: './dashboard-header.component.html',
    styleUrls: ['./dashboard-header.component.sass']
})
export class DashboardHeaderComponent implements OnInit {

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
