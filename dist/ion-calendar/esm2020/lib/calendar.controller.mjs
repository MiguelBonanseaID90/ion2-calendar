import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarModal } from './components/calendar.modal';
import { CalendarService } from './services/calendar.service';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "./services/calendar.service";
export class CalendarController {
    constructor(modalCtrl, calSvc) {
        this.modalCtrl = modalCtrl;
        this.calSvc = calSvc;
    }
    /**
     * @deprecated
     * @param {CalendarModalOptions} calendarOptions
     * @param {ModalOptions} modalOptions
     * @returns {any}
     */
    openCalendar(calendarOptions, modalOptions = {}) {
        const options = this.calSvc.safeOpt(calendarOptions);
        return this.modalCtrl
            .create({
            component: CalendarModal,
            componentProps: {
                options,
            },
            ...modalOptions,
        })
            .then((calendarModal) => {
            calendarModal.present();
            return calendarModal.onDidDismiss().then((event) => {
                return event.data ? Promise.resolve(event.data) : Promise.reject('cancelled');
            });
        });
    }
}
CalendarController.ɵfac = function CalendarController_Factory(t) { return new (t || CalendarController)(i0.ɵɵinject(i1.ModalController), i0.ɵɵinject(i2.CalendarService)); };
CalendarController.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CalendarController, factory: CalendarController.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CalendarController, [{
        type: Injectable
    }], function () { return [{ type: i1.ModalController }, { type: i2.CalendarService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY2FsZW5kYXIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUlqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7O0FBRzlELE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBbUIsU0FBMEIsRUFBUyxNQUF1QjtRQUExRCxjQUFTLEdBQVQsU0FBUyxDQUFpQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWlCO0lBQUcsQ0FBQztJQUVqRjs7Ozs7T0FLRztJQUNILFlBQVksQ0FBQyxlQUFxQyxFQUFFLGVBQTZCLEVBQUU7UUFDakYsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFckQsT0FBTyxJQUFJLENBQUMsU0FBUzthQUNsQixNQUFNLENBQUM7WUFDTixTQUFTLEVBQUUsYUFBYTtZQUN4QixjQUFjLEVBQUU7Z0JBQ2QsT0FBTzthQUNSO1lBQ0QsR0FBRyxZQUFZO1NBQ2hCLENBQUM7YUFDRCxJQUFJLENBQUMsQ0FBQyxhQUFrQyxFQUFFLEVBQUU7WUFDM0MsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXhCLE9BQU8sYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQXlCLEVBQUUsRUFBRTtnQkFDckUsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoRixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7b0ZBM0JVLGtCQUFrQjt3RUFBbEIsa0JBQWtCLFdBQWxCLGtCQUFrQjt1RkFBbEIsa0JBQWtCO2NBRDlCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XG5pbXBvcnQgeyBPdmVybGF5RXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XG5cbmltcG9ydCB7IE1vZGFsT3B0aW9ucywgQ2FsZW5kYXJNb2RhbE9wdGlvbnMgfSBmcm9tICcuL2NhbGVuZGFyLm1vZGVsJztcbmltcG9ydCB7IENhbGVuZGFyTW9kYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXIubW9kYWwnO1xuaW1wb3J0IHsgQ2FsZW5kYXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jYWxlbmRhci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2RhbEN0cmw6IE1vZGFsQ29udHJvbGxlciwgcHVibGljIGNhbFN2YzogQ2FsZW5kYXJTZXJ2aWNlKSB7fVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKiBAcGFyYW0ge0NhbGVuZGFyTW9kYWxPcHRpb25zfSBjYWxlbmRhck9wdGlvbnNcbiAgICogQHBhcmFtIHtNb2RhbE9wdGlvbnN9IG1vZGFsT3B0aW9uc1xuICAgKiBAcmV0dXJucyB7YW55fVxuICAgKi9cbiAgb3BlbkNhbGVuZGFyKGNhbGVuZGFyT3B0aW9uczogQ2FsZW5kYXJNb2RhbE9wdGlvbnMsIG1vZGFsT3B0aW9uczogTW9kYWxPcHRpb25zID0ge30pOiBQcm9taXNlPHt9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY2FsU3ZjLnNhZmVPcHQoY2FsZW5kYXJPcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzLm1vZGFsQ3RybFxuICAgICAgLmNyZWF0ZSh7XG4gICAgICAgIGNvbXBvbmVudDogQ2FsZW5kYXJNb2RhbCxcbiAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICB9LFxuICAgICAgICAuLi5tb2RhbE9wdGlvbnMsXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGNhbGVuZGFyTW9kYWw6IEhUTUxJb25Nb2RhbEVsZW1lbnQpID0+IHtcbiAgICAgICAgY2FsZW5kYXJNb2RhbC5wcmVzZW50KCk7XG5cbiAgICAgICAgcmV0dXJuIGNhbGVuZGFyTW9kYWwub25EaWREaXNtaXNzKCkudGhlbigoZXZlbnQ6IE92ZXJsYXlFdmVudERldGFpbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBldmVudC5kYXRhID8gUHJvbWlzZS5yZXNvbHZlKGV2ZW50LmRhdGEpIDogUHJvbWlzZS5yZWplY3QoJ2NhbmNlbGxlZCcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=