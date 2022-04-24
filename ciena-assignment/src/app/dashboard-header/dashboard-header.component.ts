import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from '../services/notifications.service';

@Component({
    selector: 'app-dashboard-header',
    templateUrl: './dashboard-header.component.html',
    styleUrls: ['./dashboard-header.component.sass']
})
export class DashboardHeaderComponent implements OnInit {

    alarms: AlarmItem[] = [];

    constructor(
        private modalService: NgbModal,
        private notificationsService: NotificationsService
        ) { }

    ngOnInit() {
        this.notificationsService.selectedAlarms.subscribe(alarms => {
            this.alarms = alarms;
        })
    }

    triggerModal(content: HTMLElement) {
        this.modalService.open(content, { ariaLabelledBy: 'logout-modal' });
    }

    onConfirmLogoutClick() {
        window.close();
    }

}
