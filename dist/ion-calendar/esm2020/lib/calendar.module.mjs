import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { CalendarController } from './calendar.controller';
import { DEFAULT_CALENDAR_OPTIONS } from './services/calendar-options.provider';
import { CalendarService } from './services/calendar.service';
import { CALENDAR_COMPONENTS } from './components';
import * as i0 from "@angular/core";
import * as i1 from "./components/calendar.modal";
import * as i2 from "./components/calendar-week.component";
import * as i3 from "./components/month.component";
import * as i4 from "./components/calendar.component";
import * as i5 from "./components/month-picker.component";
export function calendarController(modalCtrl, calSvc) {
    return new CalendarController(modalCtrl, calSvc);
}
export class CalendarModule {
    static forRoot(defaultOptions = {}) {
        return {
            ngModule: CalendarModule,
            providers: [
                { provide: DEFAULT_CALENDAR_OPTIONS, useValue: defaultOptions }
            ]
        };
    }
}
CalendarModule.ɵfac = function CalendarModule_Factory(t) { return new (t || CalendarModule)(); };
CalendarModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: CalendarModule });
CalendarModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        CalendarService,
        {
            provide: CalendarController,
            useFactory: calendarController,
            deps: [ModalController, CalendarService],
        },
    ], imports: [CommonModule, IonicModule, FormsModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CalendarModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, IonicModule, FormsModule],
                declarations: CALENDAR_COMPONENTS,
                exports: CALENDAR_COMPONENTS,
                providers: [
                    CalendarService,
                    {
                        provide: CalendarController,
                        useFactory: calendarController,
                        deps: [ModalController, CalendarService],
                    },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CalendarModule, { declarations: [i1.CalendarModal, i2.CalendarWeekComponent, i3.MonthComponent, i4.CalendarComponent, i5.MonthPickerComponent], imports: [CommonModule, IonicModule, FormsModule], exports: [i1.CalendarModal, i2.CalendarWeekComponent, i3.MonthComponent, i4.CalendarComponent, i5.MonthPickerComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9jYWxlbmRhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7QUFFbkQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFNBQTBCLEVBQUUsTUFBdUI7SUFDcEYsT0FBTyxJQUFJLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBZ0JELE1BQU0sT0FBTyxjQUFjO0lBQ3pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQXVDLEVBQUU7UUFDdEQsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFO2FBQ2hFO1NBQ0YsQ0FBQztJQUNKLENBQUM7OzRFQVJVLGNBQWM7Z0VBQWQsY0FBYztxRUFWWjtRQUNQLGVBQWU7UUFDZjtZQUNJLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsVUFBVSxFQUFFLGtCQUFrQjtZQUM5QixJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO1NBQzNDO0tBQ0osWUFWUyxZQUFZLEVBQUUsV0FBVyxFQUFFLFdBQVc7dUZBYXZDLGNBQWM7Y0FkMUIsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDO2dCQUNqRCxZQUFZLEVBQUUsbUJBQW1CO2dCQUNqQyxPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixTQUFTLEVBQUU7b0JBQ1AsZUFBZTtvQkFDZjt3QkFDSSxPQUFPLEVBQUUsa0JBQWtCO3dCQUMzQixVQUFVLEVBQUUsa0JBQWtCO3dCQUM5QixJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO3FCQUMzQztpQkFDSjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzthQUNwQzs7d0ZBQ1ksY0FBYyw0SUFiYixZQUFZLEVBQUUsV0FBVyxFQUFFLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW9uaWNNb2R1bGUsIE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcbmltcG9ydCB7IENhbGVuZGFyTW9kYWxPcHRpb25zIH0gZnJvbSAnLi9jYWxlbmRhci5tb2RlbCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbnRyb2xsZXIgfSBmcm9tICcuL2NhbGVuZGFyLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgREVGQVVMVF9DQUxFTkRBUl9PUFRJT05TIH0gZnJvbSAnLi9zZXJ2aWNlcy9jYWxlbmRhci1vcHRpb25zLnByb3ZpZGVyJztcbmltcG9ydCB7IENhbGVuZGFyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY2FsZW5kYXIuc2VydmljZSc7XG5pbXBvcnQgeyBDQUxFTkRBUl9DT01QT05FTlRTIH0gZnJvbSAnLi9jb21wb25lbnRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGVuZGFyQ29udHJvbGxlcihtb2RhbEN0cmw6IE1vZGFsQ29udHJvbGxlciwgY2FsU3ZjOiBDYWxlbmRhclNlcnZpY2UpIHtcbiAgcmV0dXJuIG5ldyBDYWxlbmRhckNvbnRyb2xsZXIobW9kYWxDdHJsLCBjYWxTdmMpO1xufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIElvbmljTW9kdWxlLCBGb3Jtc01vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBDQUxFTkRBUl9DT01QT05FTlRTLFxuICAgIGV4cG9ydHM6IENBTEVOREFSX0NPTVBPTkVOVFMsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENhbGVuZGFyU2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogQ2FsZW5kYXJDb250cm9sbGVyLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogY2FsZW5kYXJDb250cm9sbGVyLFxuICAgICAgICAgICAgZGVwczogW01vZGFsQ29udHJvbGxlciwgQ2FsZW5kYXJTZXJ2aWNlXSxcbiAgICAgICAgfSxcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGRlZmF1bHRPcHRpb25zOiBDYWxlbmRhck1vZGFsT3B0aW9ucyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxDYWxlbmRhck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ2FsZW5kYXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBERUZBVUxUX0NBTEVOREFSX09QVElPTlMsIHVzZVZhbHVlOiBkZWZhdWx0T3B0aW9ucyB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19