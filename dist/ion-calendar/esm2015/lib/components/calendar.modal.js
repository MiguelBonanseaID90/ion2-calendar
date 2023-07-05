import { Component, ViewChild, ElementRef, ChangeDetectorRef, Renderer2, Input, HostBinding, } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular';
import { CalendarService } from '../services/calendar.service';
import moment from 'moment';
import { pickModes } from '../config';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "../services/calendar.service";
import * as i3 from "./calendar-week.component";
import * as i4 from "./month.component";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
const NUM_OF_MONTHS_TO_CREATE = 3;
export class CalendarModal {
    constructor(_renderer, _elementRef, modalCtrl, ref, calSvc) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.modalCtrl = modalCtrl;
        this.ref = ref;
        this.calSvc = calSvc;
        this.ionPage = true;
        this.datesTemp = [null, null];
        this._scrollLock = true;
    }
    ngOnInit() {
        this.init();
        this.initDefaultDate();
    }
    ngAfterViewInit() {
        this.findCssClass();
        if (this._d.canBackwardsSelected)
            this.backwardsMonth();
        this.scrollToDefaultDate();
    }
    init() {
        this._d = this.calSvc.safeOpt(this.options);
        this._d.showAdjacentMonthDay = false;
        this.step = this._d.step;
        if (this.step < this.calSvc.DEFAULT_STEP) {
            this.step = this.calSvc.DEFAULT_STEP;
        }
        this.calendarMonths = this.calSvc.createMonthsByPeriod(moment(this._d.from).valueOf(), this.findInitMonthNumber(this._d.defaultScrollTo) + this.step, this._d);
    }
    initDefaultDate() {
        const { pickMode, defaultDate, defaultDateRange, defaultDates } = this._d;
        switch (pickMode) {
            case pickModes.SINGLE:
                if (defaultDate) {
                    this.datesTemp[0] = this.calSvc.createCalendarDay(this._getDayTime(defaultDate), this._d);
                }
                break;
            case pickModes.RANGE:
                if (defaultDateRange) {
                    if (defaultDateRange.from) {
                        this.datesTemp[0] = this.calSvc.createCalendarDay(this._getDayTime(defaultDateRange.from), this._d);
                    }
                    if (defaultDateRange.to) {
                        this.datesTemp[1] = this.calSvc.createCalendarDay(this._getDayTime(defaultDateRange.to), this._d);
                    }
                }
                break;
            case pickModes.MULTI:
                if (defaultDates && defaultDates.length) {
                    this.datesTemp = defaultDates.map((e) => this.calSvc.createCalendarDay(this._getDayTime(e), this._d));
                }
                break;
            default:
                this.datesTemp = [null, null];
        }
    }
    findCssClass() {
        const { cssClass } = this._d;
        if (cssClass) {
            cssClass.split(' ').forEach((_class) => {
                if (_class.trim() !== '')
                    this._renderer.addClass(this._elementRef.nativeElement, _class);
            });
        }
    }
    onChange(data) {
        const { pickMode, autoDone } = this._d;
        this.datesTemp = data;
        this.ref.detectChanges();
        if (pickMode !== pickModes.MULTI && autoDone && this.canDone()) {
            this.done();
        }
        this.repaintDOM();
    }
    onCancel() {
        this.modalCtrl.dismiss(null, 'cancel');
    }
    done() {
        const { pickMode } = this._d;
        this.modalCtrl.dismiss(this.calSvc.wrapResult(this.datesTemp, pickMode), 'done');
    }
    canDone() {
        if (!Array.isArray(this.datesTemp)) {
            return false;
        }
        const { pickMode, defaultEndDateToStartDate } = this._d;
        switch (pickMode) {
            case pickModes.SINGLE:
                return !!(this.datesTemp[0] && this.datesTemp[0].time);
            case pickModes.RANGE:
                if (defaultEndDateToStartDate) {
                    return !!(this.datesTemp[0] && this.datesTemp[0].time);
                }
                return !!(this.datesTemp[0] && this.datesTemp[1]) && !!(this.datesTemp[0].time && this.datesTemp[1].time);
            case pickModes.MULTI:
                return this.datesTemp.length > 0 && this.datesTemp.every(e => !!e && !!e.time);
            default:
                return false;
        }
    }
    clear() {
        this.datesTemp = [null, null];
    }
    canClear() {
        return !!this.datesTemp[0];
    }
    nextMonth(event) {
        const len = this.calendarMonths.length;
        const final = this.calendarMonths[len - 1];
        const nextTime = moment(final.original.time)
            .add(1, 'M')
            .valueOf();
        const rangeEnd = this._d.to ? moment(this._d.to).subtract(1, 'M') : 0;
        if (len <= 0 || (rangeEnd !== 0 && moment(final.original.time).isAfter(rangeEnd))) {
            event.target.disabled = true;
            return;
        }
        this.calendarMonths.push(...this.calSvc.createMonthsByPeriod(nextTime, NUM_OF_MONTHS_TO_CREATE, this._d));
        event.target.complete();
        this.repaintDOM();
    }
    backwardsMonth() {
        const first = this.calendarMonths[0];
        if (first.original.time <= 0) {
            this._d.canBackwardsSelected = false;
            return;
        }
        const firstTime = (this.actualFirstTime = moment(first.original.time)
            .subtract(NUM_OF_MONTHS_TO_CREATE, 'M')
            .valueOf());
        this.calendarMonths.unshift(...this.calSvc.createMonthsByPeriod(firstTime, NUM_OF_MONTHS_TO_CREATE, this._d));
        this.ref.detectChanges();
        this.repaintDOM();
    }
    scrollToDate(date) {
        const defaultDateIndex = this.findInitMonthNumber(date);
        const monthElement = this.monthsEle.nativeElement.children[`month-${defaultDateIndex}`];
        const domElemReadyWaitTime = 300;
        setTimeout(() => {
            const defaultDateMonth = monthElement ? monthElement.offsetTop : 0;
            if (defaultDateIndex !== -1 && defaultDateMonth !== 0) {
                this.content.scrollByPoint(0, defaultDateMonth, 128);
            }
        }, domElemReadyWaitTime);
    }
    scrollToDefaultDate() {
        this.scrollToDate(this._d.defaultScrollTo);
    }
    onScroll($event) {
        if (!this._d.canBackwardsSelected)
            return;
        const { detail } = $event;
        if (detail.scrollTop <= 200 && detail.velocityY < 0 && this._scrollLock) {
            this.content.getScrollElement().then((scrollElem) => {
                this._scrollLock = !1;
                const heightBeforeMonthPrepend = scrollElem.scrollHeight;
                this.backwardsMonth();
                setTimeout(() => {
                    const heightAfterMonthPrepend = scrollElem.scrollHeight;
                    this.content.scrollByPoint(0, heightAfterMonthPrepend - heightBeforeMonthPrepend, 0).then(() => {
                        this._scrollLock = !0;
                    });
                }, 180);
            });
        }
    }
    /**
     * In some older Safari versions (observed at Mac's Safari 10.0), there is an issue where style updates to
     * shadowRoot descendants don't cause a browser repaint.
     * See for more details: https://github.com/Polymer/polymer/issues/4701
     */
    repaintDOM() {
        return this.content.getScrollElement().then((scrollElem) => {
            // Update scrollElem to ensure that height of the container changes as Months are appended/prepended
            scrollElem.style.zIndex = '2';
            scrollElem.style.zIndex = 'initial';
            // Update monthsEle to ensure selected state is reflected when tapping on a day
            this.monthsEle.nativeElement.style.zIndex = '2';
            this.monthsEle.nativeElement.style.zIndex = 'initial';
        });
    }
    findInitMonthNumber(date) {
        let startDate = this.actualFirstTime ? moment(this.actualFirstTime) : moment(this._d.from);
        const defaultScrollTo = moment(date);
        const isAfter = defaultScrollTo.isAfter(startDate);
        if (!isAfter)
            return -1;
        if (this.showYearPicker) {
            startDate = moment(new Date(this.year, 0, 1));
        }
        return defaultScrollTo.diff(startDate, 'month');
    }
    _getDayTime(date) {
        return moment(moment(date).format('YYYY-MM-DD')).valueOf();
    }
    _monthFormat(date) {
        return moment(date).format(this._d.monthFormat.replace(/y/g, 'Y'));
    }
    _getDayFormatted(data) {
        if (!data) {
            return null;
        }
        return moment(data.time).format('ddd, MMM Do');
    }
    trackByIndex(index, momentDate) {
        return momentDate.original ? momentDate.original.time : index;
    }
}
CalendarModal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: CalendarModal, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1.ModalController }, { token: i0.ChangeDetectorRef }, { token: i2.CalendarService }], target: i0.ɵɵFactoryTarget.Component });
CalendarModal.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: CalendarModal, selector: "ion-calendar-modal", inputs: { options: "options" }, host: { properties: { "class.ion-page": "this.ionPage" } }, viewQueries: [{ propertyName: "content", first: true, predicate: IonContent, descendants: true, static: true }, { propertyName: "monthsEle", first: true, predicate: ["months"], descendants: true, static: true }], ngImport: i0, template: `
    <ion-header>
      <ion-toolbar>
          <ion-buttons slot="secondary">
              <ion-button type='button' slot="icon-only" fill="clear" class="primary" (click)="onCancel()">
              <span *ngIf="_d.closeLabel !== '' && !_d.closeIcon">{{ _d.closeLabel }}</span>
              <ion-icon *ngIf="_d.closeIcon" name="close"></ion-icon>
            </ion-button>
          </ion-buttons>

          <ion-title>{{ _d.title }}</ion-title>
      </ion-toolbar>

      <ng-content select="[sub-header]"></ng-content>

      <ion-row *ngIf="_d.pickMode === 'range'" lines="none" [class]="'dates-toolbar'" no-border>
        <ion-col size="4" class="start-date ion-text-nowrap">
          {{ _getDayFormatted(datesTemp[0]) || 'Start Date' }}
        </ion-col>
        <ion-col size="4" class="ion-text-center">
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </ion-col>
        <ion-col size="4" class="end-date ion-text-right ion-text-nowrap">
          {{ _getDayFormatted(datesTemp[1]) || 'End Date' }}
        </ion-col>
      </ion-row>

      <ion-calendar-week
        [color]="_d.color"
        [weekArray]="_d.weekdays"
        [weekStart]="_d.weekStart">
      </ion-calendar-week>

    </ion-header>

    <ion-content (ionScroll)="onScroll($event)" class="calendar-page" [scrollEvents]="true"
                 [ngClass]="{'multi-selection': _d.pickMode === 'multi'}">

      <div #months>
        <ng-template ngFor let-month [ngForOf]="calendarMonths" [ngForTrackBy]="trackByIndex" let-i="index">
          <div class="month-box" [attr.id]="'month-' + i">
            <h4 class="month-title">{{ _monthFormat(month.original?.date) }}</h4>
            <ion-calendar-month [month]="month"
                                [pickMode]="_d.pickMode"
                                [isSaveHistory]="_d.isSaveHistory"
                                [id]="_d.id"
                                [color]="_d.color"
                                [maxMultiDates]="_d.maxMultiDates"
                                (change)="onChange($event)"
                                [(ngModel)]="datesTemp">
            </ion-calendar-month>
          </div>
        </ng-template>

      </div>

      <ion-infinite-scroll threshold="25%" (ionInfinite)="nextMonth($event)">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>

    </ion-content>

    <ion-footer>

        <ion-button expand="full" *ngIf="!_d.autoDone" [disabled]="!canDone()" (click)="done()">
          <span *ngIf="_d.doneLabel !== '' && !_d.doneIcon">{{ _d.doneLabel }}</span>
          <ion-icon *ngIf="_d.doneIcon" name="checkmark"></ion-icon>
        </ion-button>

    </ion-footer>
  `, isInline: true, styles: [":host ion-select{max-width:unset}:host ion-select .select-icon>.select-icon-inner,:host ion-select .select-text{color:#fff!important}:host ion-select.select-ios{max-width:unset}:host ion-toolbar ion-button.md{color:var(--ion-color-primary)}:host .dates-toolbar{--background: transparent;padding:0 1rem}:host .dates-toolbar.primary{--background: var(--ion-color-primary)}:host .dates-toolbar.secondary{--background: var(--ion-color-secondary)}:host .dates-toolbar.danger{--background: var(--ion-color-danger)}:host .dates-toolbar.dark{--background: var(--ion-color-dark)}:host .dates-toolbar.light{--background: var(--ion-color-light)}:host .dates-toolbar.transparent{--background: transparent}:host .dates-toolbar.toolbar-md{min-height:44px}:host .ios.dates-toolbar{padding-top:1rem}:host .start-date{padding-left:.5rem}:host .end-date{margin-right:-.5rem}:host .calendar-page{background-color:#fbfbfb}:host .month-box{display:inline-block;width:100%;padding-bottom:1em}:host #month-0{padding-top:1rem}:host .month-title{padding-left:1rem;text-align:left;color:#363749}:host h4{font-weight:400;font-size:1.1rem;display:block;text-align:center;margin:1rem 0 0;color:#929292}body[data-dark-mode=true] :host .month-title{color:#fff}body[data-dark-mode=true] :host .dates-toolbar{color:#fff}\n"], components: [{ type: i1.IonHeader, selector: "ion-header", inputs: ["collapse", "mode", "translucent"] }, { type: i1.IonToolbar, selector: "ion-toolbar", inputs: ["color", "mode"] }, { type: i1.IonButtons, selector: "ion-buttons", inputs: ["collapse"] }, { type: i1.IonButton, selector: "ion-button", inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"] }, { type: i1.IonIcon, selector: "ion-icon", inputs: ["color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "sanitize", "size", "src"] }, { type: i1.IonTitle, selector: "ion-title", inputs: ["color", "size"] }, { type: i1.IonRow, selector: "ion-row" }, { type: i1.IonCol, selector: "ion-col", inputs: ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXs", "pull", "pullLg", "pullMd", "pullSm", "pullXl", "pullXs", "push", "pushLg", "pushMd", "pushSm", "pushXl", "pushXs", "size", "sizeLg", "sizeMd", "sizeSm", "sizeXl", "sizeXs"] }, { type: i3.CalendarWeekComponent, selector: "ion-calendar-week", inputs: ["color", "weekArray", "weekStart"] }, { type: i1.IonContent, selector: "ion-content", inputs: ["color", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"] }, { type: i4.MonthComponent, selector: "ion-calendar-month", inputs: ["month", "pickMode", "isSaveHistory", "id", "readonly", "color", "maxMultiDates"], outputs: ["change", "select", "selectStart", "selectEnd"] }, { type: i1.IonInfiniteScroll, selector: "ion-infinite-scroll", inputs: ["disabled", "position", "threshold"] }, { type: i1.IonInfiniteScrollContent, selector: "ion-infinite-scroll-content", inputs: ["loadingSpinner", "loadingText"] }, { type: i1.IonFooter, selector: "ion-footer", inputs: ["collapse", "mode", "translucent"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: CalendarModal, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-calendar-modal',
                    styleUrls: ['./calendar.modal.scss'],
                    template: `
    <ion-header>
      <ion-toolbar>
          <ion-buttons slot="secondary">
              <ion-button type='button' slot="icon-only" fill="clear" class="primary" (click)="onCancel()">
              <span *ngIf="_d.closeLabel !== '' && !_d.closeIcon">{{ _d.closeLabel }}</span>
              <ion-icon *ngIf="_d.closeIcon" name="close"></ion-icon>
            </ion-button>
          </ion-buttons>

          <ion-title>{{ _d.title }}</ion-title>
      </ion-toolbar>

      <ng-content select="[sub-header]"></ng-content>

      <ion-row *ngIf="_d.pickMode === 'range'" lines="none" [class]="'dates-toolbar'" no-border>
        <ion-col size="4" class="start-date ion-text-nowrap">
          {{ _getDayFormatted(datesTemp[0]) || 'Start Date' }}
        </ion-col>
        <ion-col size="4" class="ion-text-center">
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </ion-col>
        <ion-col size="4" class="end-date ion-text-right ion-text-nowrap">
          {{ _getDayFormatted(datesTemp[1]) || 'End Date' }}
        </ion-col>
      </ion-row>

      <ion-calendar-week
        [color]="_d.color"
        [weekArray]="_d.weekdays"
        [weekStart]="_d.weekStart">
      </ion-calendar-week>

    </ion-header>

    <ion-content (ionScroll)="onScroll($event)" class="calendar-page" [scrollEvents]="true"
                 [ngClass]="{'multi-selection': _d.pickMode === 'multi'}">

      <div #months>
        <ng-template ngFor let-month [ngForOf]="calendarMonths" [ngForTrackBy]="trackByIndex" let-i="index">
          <div class="month-box" [attr.id]="'month-' + i">
            <h4 class="month-title">{{ _monthFormat(month.original?.date) }}</h4>
            <ion-calendar-month [month]="month"
                                [pickMode]="_d.pickMode"
                                [isSaveHistory]="_d.isSaveHistory"
                                [id]="_d.id"
                                [color]="_d.color"
                                [maxMultiDates]="_d.maxMultiDates"
                                (change)="onChange($event)"
                                [(ngModel)]="datesTemp">
            </ion-calendar-month>
          </div>
        </ng-template>

      </div>

      <ion-infinite-scroll threshold="25%" (ionInfinite)="nextMonth($event)">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>

    </ion-content>

    <ion-footer>

        <ion-button expand="full" *ngIf="!_d.autoDone" [disabled]="!canDone()" (click)="done()">
          <span *ngIf="_d.doneLabel !== '' && !_d.doneIcon">{{ _d.doneLabel }}</span>
          <ion-icon *ngIf="_d.doneIcon" name="checkmark"></ion-icon>
        </ion-button>

    </ion-footer>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.ModalController }, { type: i0.ChangeDetectorRef }, { type: i2.CalendarService }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: [IonContent, { static: true }]
            }], monthsEle: [{
                type: ViewChild,
                args: ['months', { static: true }]
            }], ionPage: [{
                type: HostBinding,
                args: ['class.ion-page']
            }], options: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudHMvY2FsZW5kYXIubW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixTQUFTLEVBRVQsS0FBSyxFQUVMLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUcsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7Ozs7QUFFdEMsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLENBQUM7QUE2RWxDLE1BQU0sT0FBTyxhQUFhO0lBc0J4QixZQUNVLFNBQW9CLEVBQ3JCLFdBQXVCLEVBQ3ZCLFNBQTBCLEVBQzFCLEdBQXNCLEVBQ3RCLE1BQXVCO1FBSnRCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBaUI7UUFDMUIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFwQmhDLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFLZixjQUFTLEdBQTZCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBTW5ELGdCQUFXLEdBQUcsSUFBSSxDQUFDO0lBVWhCLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFlBQVks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TztzQkFETixTQUFTO3VCQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBR3ZDLFNBQVM7c0JBRFIsU0FBUzt1QkFBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUlyQyxPQUFPO3NCQUROLFdBQVc7dUJBQUMsZ0JBQWdCO2dCQUk3QixPQUFPO3NCQUROLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFJlbmRlcmVyMixcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgSG9zdEJpbmRpbmcsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgIE1vZGFsQ29udHJvbGxlciwgSW9uQ29udGVudCB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcbmltcG9ydCB7IENhbGVuZGFyRGF5LCBDYWxlbmRhck1vbnRoLCBDYWxlbmRhck1vZGFsT3B0aW9ucyB9IGZyb20gJy4uL2NhbGVuZGFyLm1vZGVsJztcbmltcG9ydCB7IENhbGVuZGFyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NhbGVuZGFyLnNlcnZpY2UnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgcGlja01vZGVzIH0gZnJvbSAnLi4vY29uZmlnJztcblxuY29uc3QgTlVNX09GX01PTlRIU19UT19DUkVBVEUgPSAzO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tY2FsZW5kYXItbW9kYWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci5tb2RhbC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlvbi1oZWFkZXI+XG4gICAgICA8aW9uLXRvb2xiYXI+XG4gICAgICAgICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzZWNvbmRhcnlcIj5cbiAgICAgICAgICAgICAgPGlvbi1idXR0b24gdHlwZT0nYnV0dG9uJyBzbG90PVwiaWNvbi1vbmx5XCIgZmlsbD1cImNsZWFyXCIgY2xhc3M9XCJwcmltYXJ5XCIgKGNsaWNrKT1cIm9uQ2FuY2VsKClcIj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJfZC5jbG9zZUxhYmVsICE9PSAnJyAmJiAhX2QuY2xvc2VJY29uXCI+e3sgX2QuY2xvc2VMYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPGlvbi1pY29uICpuZ0lmPVwiX2QuY2xvc2VJY29uXCIgbmFtZT1cImNsb3NlXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cbiAgICAgICAgICA8L2lvbi1idXR0b25zPlxuXG4gICAgICAgICAgPGlvbi10aXRsZT57eyBfZC50aXRsZSB9fTwvaW9uLXRpdGxlPlxuICAgICAgPC9pb24tdG9vbGJhcj5cblxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3N1Yi1oZWFkZXJdXCI+PC9uZy1jb250ZW50PlxuXG4gICAgICA8aW9uLXJvdyAqbmdJZj1cIl9kLnBpY2tNb2RlID09PSAncmFuZ2UnXCIgbGluZXM9XCJub25lXCIgW2NsYXNzXT1cIidkYXRlcy10b29sYmFyJ1wiIG5vLWJvcmRlcj5cbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjRcIiBjbGFzcz1cInN0YXJ0LWRhdGUgaW9uLXRleHQtbm93cmFwXCI+XG4gICAgICAgICAge3sgX2dldERheUZvcm1hdHRlZChkYXRlc1RlbXBbMF0pIHx8ICdTdGFydCBEYXRlJyB9fVxuICAgICAgICA8L2lvbi1jb2w+XG4gICAgICAgIDxpb24tY29sIHNpemU9XCI0XCIgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImFycm93LWZvcndhcmQtb3V0bGluZVwiPjwvaW9uLWljb24+XG4gICAgICAgIDwvaW9uLWNvbD5cbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjRcIiBjbGFzcz1cImVuZC1kYXRlIGlvbi10ZXh0LXJpZ2h0IGlvbi10ZXh0LW5vd3JhcFwiPlxuICAgICAgICAgIHt7IF9nZXREYXlGb3JtYXR0ZWQoZGF0ZXNUZW1wWzFdKSB8fCAnRW5kIERhdGUnIH19XG4gICAgICAgIDwvaW9uLWNvbD5cbiAgICAgIDwvaW9uLXJvdz5cblxuICAgICAgPGlvbi1jYWxlbmRhci13ZWVrXG4gICAgICAgIFtjb2xvcl09XCJfZC5jb2xvclwiXG4gICAgICAgIFt3ZWVrQXJyYXldPVwiX2Qud2Vla2RheXNcIlxuICAgICAgICBbd2Vla1N0YXJ0XT1cIl9kLndlZWtTdGFydFwiPlxuICAgICAgPC9pb24tY2FsZW5kYXItd2Vlaz5cblxuICAgIDwvaW9uLWhlYWRlcj5cblxuICAgIDxpb24tY29udGVudCAoaW9uU2Nyb2xsKT1cIm9uU2Nyb2xsKCRldmVudClcIiBjbGFzcz1cImNhbGVuZGFyLXBhZ2VcIiBbc2Nyb2xsRXZlbnRzXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J211bHRpLXNlbGVjdGlvbic6IF9kLnBpY2tNb2RlID09PSAnbXVsdGknfVwiPlxuXG4gICAgICA8ZGl2ICNtb250aHM+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtbW9udGggW25nRm9yT2ZdPVwiY2FsZW5kYXJNb250aHNcIiBbbmdGb3JUcmFja0J5XT1cInRyYWNrQnlJbmRleFwiIGxldC1pPVwiaW5kZXhcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9udGgtYm94XCIgW2F0dHIuaWRdPVwiJ21vbnRoLScgKyBpXCI+XG4gICAgICAgICAgICA8aDQgY2xhc3M9XCJtb250aC10aXRsZVwiPnt7IF9tb250aEZvcm1hdChtb250aC5vcmlnaW5hbD8uZGF0ZSkgfX08L2g0PlxuICAgICAgICAgICAgPGlvbi1jYWxlbmRhci1tb250aCBbbW9udGhdPVwibW9udGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcGlja01vZGVdPVwiX2QucGlja01vZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXNTYXZlSGlzdG9yeV09XCJfZC5pc1NhdmVIaXN0b3J5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cIl9kLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NvbG9yXT1cIl9kLmNvbG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21heE11bHRpRGF0ZXNdPVwiX2QubWF4TXVsdGlEYXRlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiZGF0ZXNUZW1wXCI+XG4gICAgICAgICAgICA8L2lvbi1jYWxlbmRhci1tb250aD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxpb24taW5maW5pdGUtc2Nyb2xsIHRocmVzaG9sZD1cIjI1JVwiIChpb25JbmZpbml0ZSk9XCJuZXh0TW9udGgoJGV2ZW50KVwiPlxuICAgICAgICA8aW9uLWluZmluaXRlLXNjcm9sbC1jb250ZW50PjwvaW9uLWluZmluaXRlLXNjcm9sbC1jb250ZW50PlxuICAgICAgPC9pb24taW5maW5pdGUtc2Nyb2xsPlxuXG4gICAgPC9pb24tY29udGVudD5cblxuICAgIDxpb24tZm9vdGVyPlxuXG4gICAgICAgIDxpb24tYnV0dG9uIGV4cGFuZD1cImZ1bGxcIiAqbmdJZj1cIiFfZC5hdXRvRG9uZVwiIFtkaXNhYmxlZF09XCIhY2FuRG9uZSgpXCIgKGNsaWNrKT1cImRvbmUoKVwiPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiX2QuZG9uZUxhYmVsICE9PSAnJyAmJiAhX2QuZG9uZUljb25cIj57eyBfZC5kb25lTGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgPGlvbi1pY29uICpuZ0lmPVwiX2QuZG9uZUljb25cIiBuYW1lPVwiY2hlY2ttYXJrXCI+PC9pb24taWNvbj5cbiAgICAgICAgPC9pb24tYnV0dG9uPlxuXG4gICAgPC9pb24tZm9vdGVyPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vZGFsIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZChJb25Db250ZW50LCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBjb250ZW50OiBJb25Db250ZW50IHwgYW55O1xuICBAVmlld0NoaWxkKCdtb250aHMnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBtb250aHNFbGU6IEVsZW1lbnRSZWYgfCBhbnk7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pb24tcGFnZScpXG4gIGlvblBhZ2UgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIG9wdGlvbnM6IENhbGVuZGFyTW9kYWxPcHRpb25zIHwgYW55O1xuXG4gIGRhdGVzVGVtcDogQXJyYXk8Q2FsZW5kYXJEYXk+IHwgYW55ID0gW251bGwsIG51bGxdO1xuICBjYWxlbmRhck1vbnRoczogQXJyYXk8Q2FsZW5kYXJNb250aD4gfCBhbnk7XG4gIHN0ZXA6IG51bWJlciB8IGFueTtcbiAgc2hvd1llYXJQaWNrZXI6IGJvb2xlYW4gfCBhbnk7XG4gIHllYXI6IG51bWJlciB8IGFueTtcbiAgeWVhcnM6IEFycmF5PG51bWJlcj4gfCBhbnk7XG4gIF9zY3JvbGxMb2NrID0gdHJ1ZTtcbiAgX2Q6IGFueTtcbiAgYWN0dWFsRmlyc3RUaW1lOiBudW1iZXIgfCBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIG1vZGFsQ3RybDogTW9kYWxDb250cm9sbGVyLFxuICAgIHB1YmxpYyByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHB1YmxpYyBjYWxTdmM6IENhbGVuZGFyU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5pbml0RGVmYXVsdERhdGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmZpbmRDc3NDbGFzcygpO1xuICAgIGlmICh0aGlzLl9kLmNhbkJhY2t3YXJkc1NlbGVjdGVkKSB0aGlzLmJhY2t3YXJkc01vbnRoKCk7XG4gICAgdGhpcy5zY3JvbGxUb0RlZmF1bHREYXRlKCk7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2QgPSB0aGlzLmNhbFN2Yy5zYWZlT3B0KHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5fZC5zaG93QWRqYWNlbnRNb250aERheSA9IGZhbHNlO1xuICAgIHRoaXMuc3RlcCA9IHRoaXMuX2Quc3RlcDtcbiAgICBpZiAodGhpcy5zdGVwIDwgdGhpcy5jYWxTdmMuREVGQVVMVF9TVEVQKSB7XG4gICAgICB0aGlzLnN0ZXAgPSB0aGlzLmNhbFN2Yy5ERUZBVUxUX1NURVA7XG4gICAgfVxuXG4gICAgdGhpcy5jYWxlbmRhck1vbnRocyA9IHRoaXMuY2FsU3ZjLmNyZWF0ZU1vbnRoc0J5UGVyaW9kKFxuICAgICAgbW9tZW50KHRoaXMuX2QuZnJvbSkudmFsdWVPZigpLFxuICAgICAgdGhpcy5maW5kSW5pdE1vbnRoTnVtYmVyKHRoaXMuX2QuZGVmYXVsdFNjcm9sbFRvKSArIHRoaXMuc3RlcCxcbiAgICAgIHRoaXMuX2RcbiAgICApO1xuICB9XG5cbiAgaW5pdERlZmF1bHREYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgcGlja01vZGUsIGRlZmF1bHREYXRlLCBkZWZhdWx0RGF0ZVJhbmdlLCBkZWZhdWx0RGF0ZXMgfSA9IHRoaXMuX2Q7XG4gICAgc3dpdGNoIChwaWNrTW9kZSkge1xuICAgICAgY2FzZSBwaWNrTW9kZXMuU0lOR0xFOlxuICAgICAgICBpZiAoZGVmYXVsdERhdGUpIHtcbiAgICAgICAgICB0aGlzLmRhdGVzVGVtcFswXSA9IHRoaXMuY2FsU3ZjLmNyZWF0ZUNhbGVuZGFyRGF5KHRoaXMuX2dldERheVRpbWUoZGVmYXVsdERhdGUpLCB0aGlzLl9kKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgcGlja01vZGVzLlJBTkdFOlxuICAgICAgICBpZiAoZGVmYXVsdERhdGVSYW5nZSkge1xuICAgICAgICAgIGlmIChkZWZhdWx0RGF0ZVJhbmdlLmZyb20pIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZXNUZW1wWzBdID0gdGhpcy5jYWxTdmMuY3JlYXRlQ2FsZW5kYXJEYXkodGhpcy5fZ2V0RGF5VGltZShkZWZhdWx0RGF0ZVJhbmdlLmZyb20pLCB0aGlzLl9kKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRlZmF1bHREYXRlUmFuZ2UudG8pIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZXNUZW1wWzFdID0gdGhpcy5jYWxTdmMuY3JlYXRlQ2FsZW5kYXJEYXkodGhpcy5fZ2V0RGF5VGltZShkZWZhdWx0RGF0ZVJhbmdlLnRvKSwgdGhpcy5fZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBwaWNrTW9kZXMuTVVMVEk6XG4gICAgICAgIGlmIChkZWZhdWx0RGF0ZXMgJiYgZGVmYXVsdERhdGVzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuZGF0ZXNUZW1wID0gZGVmYXVsdERhdGVzLm1hcCgoZTogYW55KSA9PiB0aGlzLmNhbFN2Yy5jcmVhdGVDYWxlbmRhckRheSh0aGlzLl9nZXREYXlUaW1lKGUpLCB0aGlzLl9kKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmRhdGVzVGVtcCA9IFtudWxsLCBudWxsXTtcbiAgICB9XG4gIH1cblxuICBmaW5kQ3NzQ2xhc3MoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjc3NDbGFzcyB9ID0gdGhpcy5fZDtcbiAgICBpZiAoY3NzQ2xhc3MpIHtcbiAgICAgIGNzc0NsYXNzLnNwbGl0KCcgJykuZm9yRWFjaCgoX2NsYXNzOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKF9jbGFzcy50cmltKCkgIT09ICcnKSB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIF9jbGFzcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbkNoYW5nZShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCB7IHBpY2tNb2RlLCBhdXRvRG9uZSB9ID0gdGhpcy5fZDtcblxuICAgIHRoaXMuZGF0ZXNUZW1wID0gZGF0YTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICBpZiAocGlja01vZGUgIT09IHBpY2tNb2Rlcy5NVUxUSSAmJiBhdXRvRG9uZSAmJiB0aGlzLmNhbkRvbmUoKSkge1xuICAgICAgdGhpcy5kb25lKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZXBhaW50RE9NKCk7XG4gIH1cblxuICBvbkNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGFsQ3RybC5kaXNtaXNzKG51bGwsICdjYW5jZWwnKTtcbiAgfVxuXG4gIGRvbmUoKTogdm9pZCB7XG4gICAgY29uc3QgeyBwaWNrTW9kZSB9ID0gdGhpcy5fZDtcblxuICAgIHRoaXMubW9kYWxDdHJsLmRpc21pc3ModGhpcy5jYWxTdmMud3JhcFJlc3VsdCh0aGlzLmRhdGVzVGVtcCwgcGlja01vZGUpLCAnZG9uZScpO1xuICB9XG5cbiAgY2FuRG9uZSgpOiBib29sZWFuIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5kYXRlc1RlbXApKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHsgcGlja01vZGUsIGRlZmF1bHRFbmREYXRlVG9TdGFydERhdGUgfSA9IHRoaXMuX2Q7XG5cbiAgICBzd2l0Y2ggKHBpY2tNb2RlKSB7XG4gICAgICBjYXNlIHBpY2tNb2Rlcy5TSU5HTEU6XG4gICAgICAgIHJldHVybiAhISh0aGlzLmRhdGVzVGVtcFswXSAmJiB0aGlzLmRhdGVzVGVtcFswXS50aW1lKTtcbiAgICAgIGNhc2UgcGlja01vZGVzLlJBTkdFOlxuICAgICAgICBpZiAoZGVmYXVsdEVuZERhdGVUb1N0YXJ0RGF0ZSkge1xuICAgICAgICAgIHJldHVybiAhISh0aGlzLmRhdGVzVGVtcFswXSAmJiB0aGlzLmRhdGVzVGVtcFswXS50aW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gISEodGhpcy5kYXRlc1RlbXBbMF0gJiYgdGhpcy5kYXRlc1RlbXBbMV0pICYmICEhKHRoaXMuZGF0ZXNUZW1wWzBdLnRpbWUgJiYgdGhpcy5kYXRlc1RlbXBbMV0udGltZSk7XG4gICAgICBjYXNlIHBpY2tNb2Rlcy5NVUxUSTpcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZXNUZW1wLmxlbmd0aCA+IDAgJiYgdGhpcy5kYXRlc1RlbXAuZXZlcnkoZSA9PiAhIWUgJiYgISFlLnRpbWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuZGF0ZXNUZW1wID0gW251bGwsIG51bGxdO1xuICB9XG5cbiAgY2FuQ2xlYXIoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5kYXRlc1RlbXBbMF07XG4gIH1cblxuICBuZXh0TW9udGgoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGxlbiA9IHRoaXMuY2FsZW5kYXJNb250aHMubGVuZ3RoO1xuICAgIGNvbnN0IGZpbmFsID0gdGhpcy5jYWxlbmRhck1vbnRoc1tsZW4gLSAxXTtcbiAgICBjb25zdCBuZXh0VGltZSA9IG1vbWVudChmaW5hbC5vcmlnaW5hbC50aW1lKVxuICAgICAgLmFkZCgxLCAnTScpXG4gICAgICAudmFsdWVPZigpO1xuICAgIGNvbnN0IHJhbmdlRW5kID0gdGhpcy5fZC50byA/IG1vbWVudCh0aGlzLl9kLnRvKS5zdWJ0cmFjdCgxLCAnTScpIDogMDtcblxuICAgIGlmIChsZW4gPD0gMCB8fCAocmFuZ2VFbmQgIT09IDAgJiYgbW9tZW50KGZpbmFsLm9yaWdpbmFsLnRpbWUpLmlzQWZ0ZXIocmFuZ2VFbmQpKSkge1xuICAgICAgZXZlbnQudGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNhbGVuZGFyTW9udGhzLnB1c2goLi4udGhpcy5jYWxTdmMuY3JlYXRlTW9udGhzQnlQZXJpb2QobmV4dFRpbWUsIE5VTV9PRl9NT05USFNfVE9fQ1JFQVRFLCB0aGlzLl9kKSk7XG4gICAgZXZlbnQudGFyZ2V0LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5yZXBhaW50RE9NKCk7XG4gIH1cblxuICBiYWNrd2FyZHNNb250aCgpOiB2b2lkIHtcbiAgICBjb25zdCBmaXJzdCA9IHRoaXMuY2FsZW5kYXJNb250aHNbMF07XG5cbiAgICBpZiAoZmlyc3Qub3JpZ2luYWwudGltZSA8PSAwKSB7XG4gICAgICB0aGlzLl9kLmNhbkJhY2t3YXJkc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RUaW1lID0gKHRoaXMuYWN0dWFsRmlyc3RUaW1lID0gbW9tZW50KGZpcnN0Lm9yaWdpbmFsLnRpbWUpXG4gICAgICAuc3VidHJhY3QoTlVNX09GX01PTlRIU19UT19DUkVBVEUsICdNJylcbiAgICAgIC52YWx1ZU9mKCkpO1xuXG4gICAgdGhpcy5jYWxlbmRhck1vbnRocy51bnNoaWZ0KC4uLnRoaXMuY2FsU3ZjLmNyZWF0ZU1vbnRoc0J5UGVyaW9kKGZpcnN0VGltZSwgTlVNX09GX01PTlRIU19UT19DUkVBVEUsIHRoaXMuX2QpKTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5yZXBhaW50RE9NKCk7XG4gIH1cblxuICBzY3JvbGxUb0RhdGUoZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgIGNvbnN0IGRlZmF1bHREYXRlSW5kZXggPSB0aGlzLmZpbmRJbml0TW9udGhOdW1iZXIoZGF0ZSk7XG4gICAgY29uc3QgbW9udGhFbGVtZW50ID0gdGhpcy5tb250aHNFbGUubmF0aXZlRWxlbWVudC5jaGlsZHJlbltgbW9udGgtJHtkZWZhdWx0RGF0ZUluZGV4fWBdO1xuICAgIGNvbnN0IGRvbUVsZW1SZWFkeVdhaXRUaW1lID0gMzAwO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBkZWZhdWx0RGF0ZU1vbnRoID0gbW9udGhFbGVtZW50ID8gbW9udGhFbGVtZW50Lm9mZnNldFRvcCA6IDA7XG5cbiAgICAgIGlmIChkZWZhdWx0RGF0ZUluZGV4ICE9PSAtMSAmJiBkZWZhdWx0RGF0ZU1vbnRoICE9PSAwKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5zY3JvbGxCeVBvaW50KDAsIGRlZmF1bHREYXRlTW9udGgsIDEyOCk7XG4gICAgICB9XG4gICAgfSwgZG9tRWxlbVJlYWR5V2FpdFRpbWUpO1xuICB9XG5cbiAgc2Nyb2xsVG9EZWZhdWx0RGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNjcm9sbFRvRGF0ZSh0aGlzLl9kLmRlZmF1bHRTY3JvbGxUbyk7XG4gIH1cblxuICBvblNjcm9sbCgkZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZC5jYW5CYWNrd2FyZHNTZWxlY3RlZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgeyBkZXRhaWwgfSA9ICRldmVudDtcblxuICAgIGlmIChkZXRhaWwuc2Nyb2xsVG9wIDw9IDIwMCAmJiBkZXRhaWwudmVsb2NpdHlZIDwgMCAmJiB0aGlzLl9zY3JvbGxMb2NrKSB7XG4gICAgICB0aGlzLmNvbnRlbnQuZ2V0U2Nyb2xsRWxlbWVudCgpLnRoZW4oKHNjcm9sbEVsZW0gOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsTG9jayA9ICExO1xuXG4gICAgICAgIGNvbnN0IGhlaWdodEJlZm9yZU1vbnRoUHJlcGVuZCA9IHNjcm9sbEVsZW0uc2Nyb2xsSGVpZ2h0O1xuICAgICAgICB0aGlzLmJhY2t3YXJkc01vbnRoKCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGhlaWdodEFmdGVyTW9udGhQcmVwZW5kID0gc2Nyb2xsRWxlbS5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgICB0aGlzLmNvbnRlbnQuc2Nyb2xsQnlQb2ludCgwLCBoZWlnaHRBZnRlck1vbnRoUHJlcGVuZCAtIGhlaWdodEJlZm9yZU1vbnRoUHJlcGVuZCwgMCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxMb2NrID0gITA7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIDE4MCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW4gc29tZSBvbGRlciBTYWZhcmkgdmVyc2lvbnMgKG9ic2VydmVkIGF0IE1hYydzIFNhZmFyaSAxMC4wKSwgdGhlcmUgaXMgYW4gaXNzdWUgd2hlcmUgc3R5bGUgdXBkYXRlcyB0b1xuICAgKiBzaGFkb3dSb290IGRlc2NlbmRhbnRzIGRvbid0IGNhdXNlIGEgYnJvd3NlciByZXBhaW50LlxuICAgKiBTZWUgZm9yIG1vcmUgZGV0YWlsczogaHR0cHM6Ly9naXRodWIuY29tL1BvbHltZXIvcG9seW1lci9pc3N1ZXMvNDcwMVxuICAgKi9cbiAgcmVwYWludERPTSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50LmdldFNjcm9sbEVsZW1lbnQoKS50aGVuKChzY3JvbGxFbGVtOiBhbnkpID0+IHtcbiAgICAgIC8vIFVwZGF0ZSBzY3JvbGxFbGVtIHRvIGVuc3VyZSB0aGF0IGhlaWdodCBvZiB0aGUgY29udGFpbmVyIGNoYW5nZXMgYXMgTW9udGhzIGFyZSBhcHBlbmRlZC9wcmVwZW5kZWRcbiAgICAgIHNjcm9sbEVsZW0uc3R5bGUuekluZGV4ID0gJzInO1xuICAgICAgc2Nyb2xsRWxlbS5zdHlsZS56SW5kZXggPSAnaW5pdGlhbCc7XG4gICAgICAvLyBVcGRhdGUgbW9udGhzRWxlIHRvIGVuc3VyZSBzZWxlY3RlZCBzdGF0ZSBpcyByZWZsZWN0ZWQgd2hlbiB0YXBwaW5nIG9uIGEgZGF5XG4gICAgICB0aGlzLm1vbnRoc0VsZS5uYXRpdmVFbGVtZW50LnN0eWxlLnpJbmRleCA9ICcyJztcbiAgICAgIHRoaXMubW9udGhzRWxlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuekluZGV4ID0gJ2luaXRpYWwnO1xuICAgIH0pO1xuICB9XG5cbiAgZmluZEluaXRNb250aE51bWJlcihkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICBsZXQgc3RhcnREYXRlID0gdGhpcy5hY3R1YWxGaXJzdFRpbWUgPyBtb21lbnQodGhpcy5hY3R1YWxGaXJzdFRpbWUpIDogbW9tZW50KHRoaXMuX2QuZnJvbSk7XG4gICAgY29uc3QgZGVmYXVsdFNjcm9sbFRvID0gbW9tZW50KGRhdGUpO1xuICAgIGNvbnN0IGlzQWZ0ZXI6IGJvb2xlYW4gPSBkZWZhdWx0U2Nyb2xsVG8uaXNBZnRlcihzdGFydERhdGUpO1xuICAgIGlmICghaXNBZnRlcikgcmV0dXJuIC0xO1xuXG4gICAgaWYgKHRoaXMuc2hvd1llYXJQaWNrZXIpIHtcbiAgICAgIHN0YXJ0RGF0ZSA9IG1vbWVudChuZXcgRGF0ZSh0aGlzLnllYXIsIDAsIDEpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmYXVsdFNjcm9sbFRvLmRpZmYoc3RhcnREYXRlLCAnbW9udGgnKTtcbiAgfVxuXG4gIF9nZXREYXlUaW1lKGRhdGU6IGFueSk6IG51bWJlciB7XG4gICAgcmV0dXJuIG1vbWVudChtb21lbnQoZGF0ZSkuZm9ybWF0KCdZWVlZLU1NLUREJykpLnZhbHVlT2YoKTtcbiAgfVxuXG4gIF9tb250aEZvcm1hdChkYXRlOiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiBtb21lbnQoZGF0ZSkuZm9ybWF0KHRoaXMuX2QubW9udGhGb3JtYXQucmVwbGFjZSgveS9nLCAnWScpKTtcbiAgfVxuXG4gIF9nZXREYXlGb3JtYXR0ZWQoZGF0YTogYW55KSB7XG4gICAgaWYgKCFkYXRhKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIG1vbWVudChkYXRhLnRpbWUpLmZvcm1hdCgnZGRkLCBNTU0gRG8nKTtcbiAgfVxuXG4gIHRyYWNrQnlJbmRleChpbmRleDogbnVtYmVyLCBtb21lbnREYXRlOiBDYWxlbmRhck1vbnRoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbW9tZW50RGF0ZS5vcmlnaW5hbCA/IG1vbWVudERhdGUub3JpZ2luYWwudGltZSA6IGluZGV4O1xuICB9XG59XG4iXX0=