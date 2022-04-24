import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import { BarChart } from '../utility/BarChart';

@Component({
    selector: 'app-alarms-view',
    templateUrl: './alarms-view.component.html',
    styleUrls: ['./alarms-view.component.sass']
})
export class AlarmsViewComponent implements OnInit {

    selectedTab = "alarms";
    alarms: any;
    computedAlarms: AlarmItem[] = [];

    globalCheckbox = false;

    constructor(
        private httpClient: HttpClient,
        private notificationsService: NotificationsService
        ) { }

    ngOnInit() {
        this.httpClient.get("assets/alarms.json").subscribe(data => {
            this.alarms = data;
            this.generateComputedAlarms();

            new BarChart(document.getElementById("barChart"), this.alarms.facets["condition-severity"]);
        });
    }

    private generateComputedAlarms() {
        this.computedAlarms = [];
        this.globalCheckbox = false;
        for (const alarm of this.alarms.items) {
            if (this.showSeverityColors || this.selectedTab === alarm["condition-severity"].toLowerCase()) {
                this.computedAlarms.push({
                    id: alarm.id + alarm.resource,
                    isChecked: false,
                    severity: alarm["condition-severity"],
                    description: alarm["native-condition-type"],
                    nodeType: alarm["node-type"],
                    clearable: alarm["manual-clearable"],
                    state: alarm["state"],
                    raiseTime: alarm["first-raise-time"],
                });
            }
        }
        if (this.selectedTab === "nodeType") {
            this.computedAlarms.sort((a, b) => a.nodeType.localeCompare(b.nodeType));
        }
    }

    getSeverityCount(severity: string): number {
        if (!this.alarms) return 0;

        for (const severityItem of this.alarms.facets["condition-severity"]) {
            if (severityItem.key.toLowerCase() === severity.toLowerCase()) {
                return severityItem.count;
            }
        }

        return 0;
    }

    onTabChange() {
        this.generateComputedAlarms();
        this.notificationsService.clear();
    }

    onGlobalCheckboxChange() {
        this.computedAlarms.forEach(alarm => alarm.isChecked = this.globalCheckbox);
        if (this.globalCheckbox) {
            this.notificationsService.replaceAll([...this.computedAlarms]);
        }
        else {
            this.notificationsService.clear();
        }
    }

    onRowCheckboxChange(event: any, alarm: AlarmItem) {
        if (event.currentTarget.checked) {
            let isAllChecked = true;
            for (const alarm of this.computedAlarms) {
                if (!alarm.isChecked) {
                    isAllChecked = false;
                    break;
                }
            }
            this.globalCheckbox = isAllChecked;
            this.notificationsService.add(alarm);
        }
        else {
            this.globalCheckbox = false;
            this.notificationsService.remove(alarm);
        }
    }

    get showSeverityColors(): boolean {
        return this.selectedTab === "alarms" || this.selectedTab === "nodeType";
    }

}
