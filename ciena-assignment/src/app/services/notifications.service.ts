import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    selectedAlarms: BehaviorSubject<AlarmItem[]> = new BehaviorSubject<AlarmItem[]>([]);
    //selectedAlarmsObservable: Observable<AlarmItem[]> = of(this.selectedAlarms);

    constructor() { }

    add(alarm: AlarmItem) {
        this.selectedAlarms.getValue().push(alarm);
        this.selectedAlarms.next(this.selectedAlarms.getValue());
    }

    replaceAll(alarms: AlarmItem[]) {
        this.selectedAlarms.next(alarms);
    }

    remove(alarm: AlarmItem) {
        // Remove alarm based on its raise-time, since the given json does not provide unique id.
        this.selectedAlarms.next(this.selectedAlarms.getValue().filter(item => item.id !== alarm.id));
    }

    clear() {
        this.selectedAlarms.next([]);
    }
}
