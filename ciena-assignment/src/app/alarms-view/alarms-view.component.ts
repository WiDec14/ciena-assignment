import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface AlarmItem {
    isChecked: boolean,
    severity: string,
    description: string,
    nodeType: string,
    clearable: string,
    state: string,
    raiseTime: string,
}

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

    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
        this.httpClient.get("assets/alarms.json").subscribe(data => {
            this.alarms = data;
            this.generateComputedAlarms();
        });
    }

    private generateComputedAlarms() {
        this.computedAlarms = [];
        this.globalCheckbox = false;
        for (const alarm of this.alarms.items) {
            if (this.showSeverityColors || this.selectedTab === alarm["condition-severity"].toLowerCase()) {
                this.computedAlarms.push({
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
    }

    onGlobalCheckboxChange() {
        this.computedAlarms.forEach(alarm => alarm.isChecked = this.globalCheckbox);
    }

    onRowCheckboxChange(event: any) {
        if (event.currentTarget.checked) {
            let isAllChecked = true;
            for (const alarm of this.computedAlarms) {
                if (!alarm.isChecked) {
                    isAllChecked = false;
                    break;
                }
            }
            this.globalCheckbox = isAllChecked;
        }
        else {
            this.globalCheckbox = false;
        }
    }

    get showSeverityColors(): boolean {
        return this.selectedTab === "alarms" || this.selectedTab === "nodeType";
    }

}
