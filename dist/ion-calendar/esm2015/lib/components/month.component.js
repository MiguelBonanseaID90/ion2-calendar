import { Component, ChangeDetectorRef, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { defaults, pickModes } from '../config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const MONTH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MonthComponent),
    multi: true,
};
export class MonthComponent {
    constructor(ref) {
        this.ref = ref;
        this.readonly = false;
        this.color = defaults.COLOR;
        this.change = new EventEmitter();
        this.select = new EventEmitter();
        this.selectStart = new EventEmitter();
        this.selectEnd = new EventEmitter();
        this._date = [null, null];
        this._isInit = false;
        this.DAY_DATE_FORMAT = 'MMMM dd, yyyy';
    }
    get _isRange() {
        return this.pickMode === pickModes.RANGE;
    }
    ngAfterViewInit() {
        this._isInit = true;
    }
    get value() {
        return this._date;
    }
    writeValue(obj) {
        if (Array.isArray(obj)) {
            this._date = obj;
        }
    }
    registerOnChange(fn) {
        this._onChanged = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    trackByTime(index, item) {
        return item ? item.time : index;
    }
    isEndSelection(day) {
        if (!day)
            return false;
        if (this.pickMode !== pickModes.RANGE || !this._isInit || this._date[1] === null) {
            return false;
        }
        return this._date[1].time === day.time;
    }
    getDayLabel(day) {
        return new Date(day.time);
    }
    isBetween(day) {
        if (!day)
            return false;
        if (this.pickMode !== pickModes.RANGE || !this._isInit) {
            return false;
        }
        if (this._date[0] === null || this._date[1] === null) {
            return false;
        }
        const start = this._date[0].time;
        const end = this._date[1].time;
        return day.time < end && day.time > start;
    }
    isStartSelection(day) {
        if (!day)
            return false;
        if (this.pickMode !== pickModes.RANGE || !this._isInit || this._date[0] === null) {
            return false;
        }
        return this._date[0].time === day.time && this._date[1] !== null;
    }
    isSelected(time) {
        if (Array.isArray(this._date)) {
            if (this.pickMode !== pickModes.MULTI) {
                if (this._date[0] !== null) {
                    return time === this._date[0].time;
                }
                if (this._date[1] !== null) {
                    return time === this._date[1].time;
                }
            }
            else {
                return this._date.findIndex(e => e !== null && e.time === time) !== -1;
            }
        }
        else {
            return false;
        }
    }
    onSelected(item) {
        if (this.readonly)
            return;
        item.selected = true;
        this.select.emit(item);
        if (this.pickMode === pickModes.SINGLE) {
            this._date[0] = item;
            const emitValue = this._date;
            this.change.emit(emitValue);
            return;
        }
        if (this.pickMode === pickModes.RANGE) {
            if (this._date[0] === null) {
                this._date[0] = item;
                this.selectStart.emit(item);
            }
            else if (this._date[1] === null) {
                if (this._date[0].time < item.time) {
                    this._date[1] = item;
                    this.selectEnd.emit(item);
                }
                else {
                    this._date[1] = this._date[0];
                    this.selectEnd.emit(this._date[0]);
                    this._date[0] = item;
                    this.selectStart.emit(item);
                }
                // Ensure if the user has selected a date range, when a user interacts with another date on the calendar the range will reset.
                // } else if (this._date[0].time > item.time) {
                //   this._date[0] = item;
                //   this.selectStart.emit(item);
                // } else if (this._date[1].time < item.time) {
                //   this._date[1] = item;
                //   this.selectEnd.emit(item);
            }
            else {
                this._date[0] = item;
                this.selectStart.emit(item);
                this._date[1] = null;
            }
            const emitValue = this._date;
            this.change.emit(emitValue);
            return;
        }
        if (this.pickMode === pickModes.MULTI) {
            const index = this._date.findIndex(e => e !== null && e.time === item.time);
            if (index === -1) {
                if ((this.maxMultiDates && this._date.length < this.maxMultiDates) || !this.maxMultiDates) {
                    this._date.push(item);
                }
            }
            else {
                this._date.splice(index, 1);
            }
            const emitValue = this._date.filter(e => e !== null);
            this.change.emit(emitValue);
        }
    }
}
MonthComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MonthComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MonthComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: MonthComponent, selector: "ion-calendar-month", inputs: { month: "month", pickMode: "pickMode", isSaveHistory: "isSaveHistory", id: "id", readonly: "readonly", color: "color", maxMultiDates: "maxMultiDates" }, outputs: { change: "change", select: "select", selectStart: "selectStart", selectEnd: "selectEnd" }, providers: [MONTH_VALUE_ACCESSOR], ngImport: i0, template: `
    <div [class]="color">
      <ng-template [ngIf]="!_isRange" [ngIfElse]="rangeBox">
        <div class="days-box">
          <ng-template ngFor let-day [ngForOf]="month?.days" [ngForTrackBy]="trackByTime">
            <div class="days">
              <ng-container *ngIf="day">
                <button type='button'
                        [class]="'days-btn ' + day.cssClass"
                        [class.today]="day.isToday"
                        (click)="onSelected(day)"
                        [class.marked]="day.marked"
                        [class.last-month-day]="day.isLastMonth"
                        [class.next-month-day]="day.isNextMonth"
                        [class.on-selected]="isSelected(day.time)"
                        [disabled]="day.disable"
                        [attr.aria-label]="getDayLabel(day) | date:DAY_DATE_FORMAT">
                  <p>{{ day.title }}</p>
                  <small *ngIf="day.subTitle">{{ day?.subTitle }}</small>
                </button>
              </ng-container>
            </div>
          </ng-template>
        </div>
      </ng-template>

      <ng-template #rangeBox>
        <div class="days-box">
          <ng-template ngFor let-day [ngForOf]="month.days" [ngForTrackBy]="trackByTime">
            <div class="days"
                 [class.startSelection]="isStartSelection(day)"
                 [class.endSelection]="isEndSelection(day)"
                 [class.is-first-wrap]="day?.isFirst"
                 [class.is-last-wrap]="day?.isLast"
                 [class.between]="isBetween(day)">
              <ng-container *ngIf="day">
                <button type='button'
                        [class]="'days-btn ' + day.cssClass"
                        [class.today]="day.isToday"
                        (click)="onSelected(day)"
                        [class.marked]="day.marked"
                        [class.last-month-day]="day.isLastMonth"
                        [class.next-month-day]="day.isNextMonth"
                        [class.is-first]="day.isFirst"
                        [class.is-last]="day.isLast"
                        [class.on-selected]="isSelected(day.time)"
                        [disabled]="day.disable">
                  <p>{{ day.title }}</p>
                  <small *ngIf="day.subTitle">{{ day?.subTitle }}</small>
                </button>
              </ng-container>

            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `, isInline: true, styles: [":host{display:inline-block;width:100%}:host .days-box{padding:.5rem}:host .days:nth-of-type(7n),:host .days:nth-of-type(7n + 1){width:15%}:host .days{width:14%;float:left;text-align:center;height:36px;margin-bottom:5px}:host .days .marked p{font-weight:500}:host .days .on-selected{border:none}:host .days .on-selected p{font-size:1.3em}:host button.days-btn{border-radius:36px;width:36px;display:block;margin:0 auto;padding:0;height:36px;background-color:transparent;position:relative;z-index:2;outline:0}:host button.days-btn p{margin:0;font-size:1.2em;color:#333;text-align:center}:host button.days-btn[disabled] p{color:#00000040}:host button.days-btn.on-selected small{transition:bottom .3s;bottom:-14px}:host button.days-btn small{overflow:hidden;display:block;left:0;right:0;bottom:-5px;position:absolute;z-index:1;text-align:center;font-weight:200}:host .primary button.days-btn small,:host .primary .days .marked p,:host .primary .days .today p{color:var(--ion-color-primary)}:host .primary .days .today p{font-weight:700}:host .primary .days .today.on-selected p,:host .primary .days .marked.on-selected p{color:#fff}:host .primary .days .on-selected,:host .primary .startSelection button.days-btn,:host .primary .endSelection button.days-btn{background-color:var(--ion-color-primary);color:#fff}:host .primary .startSelection{position:relative}:host .primary .startSelection:before,:host .primary .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .primary .startSelection:before{background-color:var(--ion-color-primary)}:host .primary .startSelection:after{background-color:#fff;opacity:.25}:host .primary .endSelection{position:relative}:host .primary .endSelection:before,:host .primary .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .primary .endSelection:before{background-color:var(--ion-color-primary)}:host .primary .endSelection:after{background-color:#fff;opacity:.25}:host .primary .startSelection.endSelection:after{background-color:transparent}:host .primary .startSelection button.days-btn{border-radius:50%}:host .primary .between button.days-btn{background-color:var(--ion-color-primary);width:100%;border-radius:0;position:relative}:host .primary .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .primary .between button.days-btn p{color:#fff}:host .primary .endSelection button.days-btn{border-radius:50%}:host .primary .endSelection button.days-btn p{color:#fff}:host .primary .days.startSelection:nth-child(7n):before,:host .primary .days.between:nth-child(7n) button.days-btn,:host .primary button.days-btn.is-last{border-radius:0 36px 36px 0}:host .primary .days.startSelection:nth-child(7n):before.on-selected,:host .primary .days.between:nth-child(7n) button.days-btn.on-selected,:host .primary button.days-btn.is-last.on-selected{border-radius:50%}:host .primary .days.endSelection:nth-child(7n+1):before,:host .primary .days.between:nth-child(7n+1) button.days-btn,:host .primary .days.between.is-first-wrap button.days-btn.is-first,:host .primary button.days-btn.is-first{border-radius:36px 0 0 36px}:host .primary .startSelection button.days-btn.is-first,:host .primary .endSelection button.days-btn.is-first,:host .primary button.days-btn.is-first.on-selected,:host .primary button.days-btn.is-last.on-selected,:host .primary .startSelection button.days-btn.is-last,:host .primary .endSelection button.days-btn.is-last{border-radius:50%}:host .primary .startSelection.is-last-wrap:before,:host .primary .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .primary .endSelection.is-first-wrap:before,:host .primary .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .primary .days .on-selected p{color:#fff}:host .primary .startSelection button.days-btn,:host .primary .endSelection button.days-btn,:host .primary .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .primary .startSelection.endSelection:before{--ion-color-primary: transparent}:host .secondary button.days-btn small,:host .secondary .days .marked p,:host .secondary .days .today p{color:var(--ion-color-secondary)}:host .secondary .days .today p{font-weight:700}:host .secondary .days .today.on-selected p,:host .secondary .days .marked.on-selected p{color:#fff}:host .secondary .days .on-selected,:host .secondary .startSelection button.days-btn,:host .secondary .endSelection button.days-btn{background-color:var(--ion-color-secondary);color:#fff}:host .secondary .startSelection{position:relative}:host .secondary .startSelection:before,:host .secondary .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .secondary .startSelection:before{background-color:var(--ion-color-secondary)}:host .secondary .startSelection:after{background-color:#fff;opacity:.25}:host .secondary .endSelection{position:relative}:host .secondary .endSelection:before,:host .secondary .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .secondary .endSelection:before{background-color:var(--ion-color-secondary)}:host .secondary .endSelection:after{background-color:#fff;opacity:.25}:host .secondary .startSelection.endSelection:after{background-color:transparent}:host .secondary .startSelection button.days-btn{border-radius:50%}:host .secondary .between button.days-btn{background-color:var(--ion-color-secondary);width:100%;border-radius:0;position:relative}:host .secondary .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .secondary .between button.days-btn p{color:#fff}:host .secondary .endSelection button.days-btn{border-radius:50%}:host .secondary .endSelection button.days-btn p{color:#fff}:host .secondary .days.startSelection:nth-child(7n):before,:host .secondary .days.between:nth-child(7n) button.days-btn,:host .secondary button.days-btn.is-last{border-radius:0 36px 36px 0}:host .secondary .days.startSelection:nth-child(7n):before.on-selected,:host .secondary .days.between:nth-child(7n) button.days-btn.on-selected,:host .secondary button.days-btn.is-last.on-selected{border-radius:50%}:host .secondary .days.endSelection:nth-child(7n+1):before,:host .secondary .days.between:nth-child(7n+1) button.days-btn,:host .secondary .days.between.is-first-wrap button.days-btn.is-first,:host .secondary button.days-btn.is-first{border-radius:36px 0 0 36px}:host .secondary .startSelection button.days-btn.is-first,:host .secondary .endSelection button.days-btn.is-first,:host .secondary button.days-btn.is-first.on-selected,:host .secondary button.days-btn.is-last.on-selected,:host .secondary .startSelection button.days-btn.is-last,:host .secondary .endSelection button.days-btn.is-last{border-radius:50%}:host .secondary .startSelection.is-last-wrap:before,:host .secondary .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .secondary .endSelection.is-first-wrap:before,:host .secondary .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .secondary .days .on-selected p{color:#fff}:host .secondary .startSelection button.days-btn,:host .secondary .endSelection button.days-btn,:host .secondary .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .secondary .startSelection.endSelection:before{--ion-color-primary: transparent}:host .danger button.days-btn small,:host .danger .days .marked p,:host .danger .days .today p{color:var(--ion-color-danger)}:host .danger .days .today p{font-weight:700}:host .danger .days .today.on-selected p,:host .danger .days .marked.on-selected p{color:#fff}:host .danger .days .on-selected,:host .danger .startSelection button.days-btn,:host .danger .endSelection button.days-btn{background-color:var(--ion-color-danger);color:#fff}:host .danger .startSelection{position:relative}:host .danger .startSelection:before,:host .danger .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .danger .startSelection:before{background-color:var(--ion-color-danger)}:host .danger .startSelection:after{background-color:#fff;opacity:.25}:host .danger .endSelection{position:relative}:host .danger .endSelection:before,:host .danger .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .danger .endSelection:before{background-color:var(--ion-color-danger)}:host .danger .endSelection:after{background-color:#fff;opacity:.25}:host .danger .startSelection.endSelection:after{background-color:transparent}:host .danger .startSelection button.days-btn{border-radius:50%}:host .danger .between button.days-btn{background-color:var(--ion-color-danger);width:100%;border-radius:0;position:relative}:host .danger .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .danger .between button.days-btn p{color:#fff}:host .danger .endSelection button.days-btn{border-radius:50%}:host .danger .endSelection button.days-btn p{color:#fff}:host .danger .days.startSelection:nth-child(7n):before,:host .danger .days.between:nth-child(7n) button.days-btn,:host .danger button.days-btn.is-last{border-radius:0 36px 36px 0}:host .danger .days.startSelection:nth-child(7n):before.on-selected,:host .danger .days.between:nth-child(7n) button.days-btn.on-selected,:host .danger button.days-btn.is-last.on-selected{border-radius:50%}:host .danger .days.endSelection:nth-child(7n+1):before,:host .danger .days.between:nth-child(7n+1) button.days-btn,:host .danger .days.between.is-first-wrap button.days-btn.is-first,:host .danger button.days-btn.is-first{border-radius:36px 0 0 36px}:host .danger .startSelection button.days-btn.is-first,:host .danger .endSelection button.days-btn.is-first,:host .danger button.days-btn.is-first.on-selected,:host .danger button.days-btn.is-last.on-selected,:host .danger .startSelection button.days-btn.is-last,:host .danger .endSelection button.days-btn.is-last{border-radius:50%}:host .danger .startSelection.is-last-wrap:before,:host .danger .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .danger .endSelection.is-first-wrap:before,:host .danger .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .danger .days .on-selected p{color:#fff}:host .danger .startSelection button.days-btn,:host .danger .endSelection button.days-btn,:host .danger .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .danger .startSelection.endSelection:before{--ion-color-primary: transparent}:host .dark button.days-btn small,:host .dark .days .marked p,:host .dark .days .today p{color:var(--ion-color-dark)}:host .dark .days .today p{font-weight:700}:host .dark .days .today.on-selected p,:host .dark .days .marked.on-selected p{color:#fff}:host .dark .days .on-selected,:host .dark .startSelection button.days-btn,:host .dark .endSelection button.days-btn{background-color:var(--ion-color-dark);color:#fff}:host .dark .startSelection{position:relative}:host .dark .startSelection:before,:host .dark .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .dark .startSelection:before{background-color:var(--ion-color-dark)}:host .dark .startSelection:after{background-color:#fff;opacity:.25}:host .dark .endSelection{position:relative}:host .dark .endSelection:before,:host .dark .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .dark .endSelection:before{background-color:var(--ion-color-dark)}:host .dark .endSelection:after{background-color:#fff;opacity:.25}:host .dark .startSelection.endSelection:after{background-color:transparent}:host .dark .startSelection button.days-btn{border-radius:50%}:host .dark .between button.days-btn{background-color:var(--ion-color-dark);width:100%;border-radius:0;position:relative}:host .dark .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .dark .between button.days-btn p{color:#fff}:host .dark .endSelection button.days-btn{border-radius:50%}:host .dark .endSelection button.days-btn p{color:#fff}:host .dark .days.startSelection:nth-child(7n):before,:host .dark .days.between:nth-child(7n) button.days-btn,:host .dark button.days-btn.is-last{border-radius:0 36px 36px 0}:host .dark .days.startSelection:nth-child(7n):before.on-selected,:host .dark .days.between:nth-child(7n) button.days-btn.on-selected,:host .dark button.days-btn.is-last.on-selected{border-radius:50%}:host .dark .days.endSelection:nth-child(7n+1):before,:host .dark .days.between:nth-child(7n+1) button.days-btn,:host .dark .days.between.is-first-wrap button.days-btn.is-first,:host .dark button.days-btn.is-first{border-radius:36px 0 0 36px}:host .dark .startSelection button.days-btn.is-first,:host .dark .endSelection button.days-btn.is-first,:host .dark button.days-btn.is-first.on-selected,:host .dark button.days-btn.is-last.on-selected,:host .dark .startSelection button.days-btn.is-last,:host .dark .endSelection button.days-btn.is-last{border-radius:50%}:host .dark .startSelection.is-last-wrap:before,:host .dark .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .dark .endSelection.is-first-wrap:before,:host .dark .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .dark .days .on-selected p{color:#fff}:host .dark .startSelection button.days-btn,:host .dark .endSelection button.days-btn,:host .dark .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .dark .startSelection.endSelection:before{--ion-color-primary: transparent}:host .light button.days-btn small,:host .light .days .marked p,:host .light .days .today p{color:var(--ion-color-light)}:host .light .days .today p{font-weight:700}:host .light .days .today.on-selected p,:host .light .days .marked.on-selected p{color:#a0a0a0}:host .light .days .on-selected,:host .light .startSelection button.days-btn,:host .light .endSelection button.days-btn{background-color:var(--ion-color-light);color:#a0a0a0}:host .light .startSelection{position:relative}:host .light .startSelection:before,:host .light .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .light .startSelection:before{background-color:var(--ion-color-light)}:host .light .startSelection:after{background-color:#fff;opacity:.25}:host .light .endSelection{position:relative}:host .light .endSelection:before,:host .light .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .light .endSelection:before{background-color:var(--ion-color-light)}:host .light .endSelection:after{background-color:#fff;opacity:.25}:host .light .startSelection.endSelection:after{background-color:transparent}:host .light .startSelection button.days-btn{border-radius:50%}:host .light .between button.days-btn{background-color:var(--ion-color-light);width:100%;border-radius:0;position:relative}:host .light .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .light .between button.days-btn p{color:#a0a0a0}:host .light .endSelection button.days-btn{border-radius:50%}:host .light .endSelection button.days-btn p{color:#a0a0a0}:host .light .days.startSelection:nth-child(7n):before,:host .light .days.between:nth-child(7n) button.days-btn,:host .light button.days-btn.is-last{border-radius:0 36px 36px 0}:host .light .days.startSelection:nth-child(7n):before.on-selected,:host .light .days.between:nth-child(7n) button.days-btn.on-selected,:host .light button.days-btn.is-last.on-selected{border-radius:50%}:host .light .days.endSelection:nth-child(7n+1):before,:host .light .days.between:nth-child(7n+1) button.days-btn,:host .light .days.between.is-first-wrap button.days-btn.is-first,:host .light button.days-btn.is-first{border-radius:36px 0 0 36px}:host .light .startSelection button.days-btn.is-first,:host .light .endSelection button.days-btn.is-first,:host .light button.days-btn.is-first.on-selected,:host .light button.days-btn.is-last.on-selected,:host .light .startSelection button.days-btn.is-last,:host .light .endSelection button.days-btn.is-last{border-radius:50%}:host .light .startSelection.is-last-wrap:before,:host .light .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .light .endSelection.is-first-wrap:before,:host .light .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .light .days .on-selected p{color:#a0a0a0}:host .light .startSelection button.days-btn,:host .light .endSelection button.days-btn,:host .light .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .light .startSelection.endSelection:before{--ion-color-primary: transparent}:host .light .days .today p{color:#565656}:host .cal-color .days .today p{font-weight:700}:host .cal-color .days .today.on-selected p,:host .cal-color .days .marked.on-selected p{color:#fff}:host .cal-color .days .on-selected,:host .cal-color .startSelection button.days-btn,:host .cal-color .endSelection button.days-btn{color:#fff}:host .cal-color .startSelection{position:relative}:host .cal-color .startSelection:before,:host .cal-color .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .cal-color .startSelection:after{background-color:#fff;opacity:.25}:host .cal-color .endSelection{position:relative}:host .cal-color .endSelection:before,:host .cal-color .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .cal-color .endSelection:after{background-color:#fff;opacity:.25}:host .cal-color .startSelection.endSelection:after{background-color:transparent}:host .cal-color .startSelection button.days-btn{border-radius:50%}:host .cal-color .between button.days-btn{width:100%;border-radius:0;position:relative}:host .cal-color .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .cal-color .between button.days-btn p{color:#fff}:host .cal-color .endSelection button.days-btn{border-radius:50%}:host .cal-color .endSelection button.days-btn p{color:#fff}:host .cal-color .days.startSelection:nth-child(7n):before,:host .cal-color .days.between:nth-child(7n) button.days-btn,:host .cal-color button.days-btn.is-last{border-radius:0 36px 36px 0}:host .cal-color .days.startSelection:nth-child(7n):before.on-selected,:host .cal-color .days.between:nth-child(7n) button.days-btn.on-selected,:host .cal-color button.days-btn.is-last.on-selected{border-radius:50%}:host .cal-color .days.endSelection:nth-child(7n+1):before,:host .cal-color .days.between:nth-child(7n+1) button.days-btn,:host .cal-color .days.between.is-first-wrap button.days-btn.is-first,:host .cal-color button.days-btn.is-first{border-radius:36px 0 0 36px}:host .cal-color .startSelection button.days-btn.is-first,:host .cal-color .endSelection button.days-btn.is-first,:host .cal-color button.days-btn.is-first.on-selected,:host .cal-color button.days-btn.is-last.on-selected,:host .cal-color .startSelection button.days-btn.is-last,:host .cal-color .endSelection button.days-btn.is-last{border-radius:50%}:host .cal-color .startSelection.is-last-wrap:before,:host .cal-color .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .cal-color .endSelection.is-first-wrap:before,:host .cal-color .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .cal-color .days .on-selected p{color:#fff}:host .cal-color .startSelection button.days-btn,:host .cal-color .endSelection button.days-btn,:host .cal-color .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .cal-color .startSelection.endSelection:before{--ion-color-primary: transparent}body[data-dark-mode=true] :host button.days-btn p{color:#fff}body[data-dark-mode=true] :host button.days-btn[disabled] p{color:#ffffff80}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "date": i1.DatePipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: MonthComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ion-calendar-month',
                    providers: [MONTH_VALUE_ACCESSOR],
                    styleUrls: ['./month.component.scss'],
                    template: `
    <div [class]="color">
      <ng-template [ngIf]="!_isRange" [ngIfElse]="rangeBox">
        <div class="days-box">
          <ng-template ngFor let-day [ngForOf]="month?.days" [ngForTrackBy]="trackByTime">
            <div class="days">
              <ng-container *ngIf="day">
                <button type='button'
                        [class]="'days-btn ' + day.cssClass"
                        [class.today]="day.isToday"
                        (click)="onSelected(day)"
                        [class.marked]="day.marked"
                        [class.last-month-day]="day.isLastMonth"
                        [class.next-month-day]="day.isNextMonth"
                        [class.on-selected]="isSelected(day.time)"
                        [disabled]="day.disable"
                        [attr.aria-label]="getDayLabel(day) | date:DAY_DATE_FORMAT">
                  <p>{{ day.title }}</p>
                  <small *ngIf="day.subTitle">{{ day?.subTitle }}</small>
                </button>
              </ng-container>
            </div>
          </ng-template>
        </div>
      </ng-template>

      <ng-template #rangeBox>
        <div class="days-box">
          <ng-template ngFor let-day [ngForOf]="month.days" [ngForTrackBy]="trackByTime">
            <div class="days"
                 [class.startSelection]="isStartSelection(day)"
                 [class.endSelection]="isEndSelection(day)"
                 [class.is-first-wrap]="day?.isFirst"
                 [class.is-last-wrap]="day?.isLast"
                 [class.between]="isBetween(day)">
              <ng-container *ngIf="day">
                <button type='button'
                        [class]="'days-btn ' + day.cssClass"
                        [class.today]="day.isToday"
                        (click)="onSelected(day)"
                        [class.marked]="day.marked"
                        [class.last-month-day]="day.isLastMonth"
                        [class.next-month-day]="day.isNextMonth"
                        [class.is-first]="day.isFirst"
                        [class.is-last]="day.isLast"
                        [class.on-selected]="isSelected(day.time)"
                        [disabled]="day.disable">
                  <p>{{ day.title }}</p>
                  <small *ngIf="day.subTitle">{{ day?.subTitle }}</small>
                </button>
              </ng-container>

            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { month: [{
                type: Input
            }], pickMode: [{
                type: Input
            }], isSaveHistory: [{
                type: Input
            }], id: [{
                type: Input
            }], readonly: [{
                type: Input
            }], color: [{
                type: Input
            }], maxMultiDates: [{
                type: Input
            }], change: [{
                type: Output
            }], select: [{
                type: Output
            }], selectStart: [{
                type: Output
            }], selectEnd: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGguY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnRzL21vbnRoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7QUFFaEQsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQVE7SUFDdkMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztJQUM3QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFpRUYsTUFBTSxPQUFPLGNBQWM7SUFvQ3pCLFlBQW1CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBMUJ6QyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLFVBQUssR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUtyQyxXQUFNLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFekQsV0FBTSxHQUE4QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXZELGdCQUFXLEdBQThCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFNUQsY0FBUyxHQUE4QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTFELFVBQUssR0FBOEIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUlQLG9CQUFlLEdBQUcsZUFBZSxDQUFDO0lBTUMsQ0FBQztJQUo3QyxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlEVDs0RkFFVSxjQUFjO2tCQS9EMUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDakMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7b0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeURUO2lCQUNGO3dHQUdDLEtBQUs7c0JBREosS0FBSztnQkFHTixRQUFRO3NCQURQLEtBQUs7Z0JBR04sYUFBYTtzQkFEWixLQUFLO2dCQUdOLEVBQUU7c0JBREQsS0FBSztnQkFHTixRQUFRO3NCQURQLEtBQUs7Z0JBR04sS0FBSztzQkFESixLQUFLO2dCQUdOLGFBQWE7c0JBRFosS0FBSztnQkFJTixNQUFNO3NCQURMLE1BQU07Z0JBR1AsTUFBTTtzQkFETCxNQUFNO2dCQUdQLFdBQVc7c0JBRFYsTUFBTTtnQkFHUCxTQUFTO3NCQURSLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdG9yUmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENhbGVuZGFyRGF5LCBDYWxlbmRhck1vbnRoLCBDYWxlbmRhck9yaWdpbmFsLCBQaWNrTW9kZSB9IGZyb20gJy4uL2NhbGVuZGFyLm1vZGVsJztcbmltcG9ydCB7IGRlZmF1bHRzLCBwaWNrTW9kZXMgfSBmcm9tICcuLi9jb25maWcnO1xuXG5leHBvcnQgY29uc3QgTU9OVEhfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1vbnRoQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tY2FsZW5kYXItbW9udGgnLFxuICBwcm92aWRlcnM6IFtNT05USF9WQUxVRV9BQ0NFU1NPUl0sXG4gIHN0eWxlVXJsczogWycuL21vbnRoLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiY29sb3JcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhX2lzUmFuZ2VcIiBbbmdJZkVsc2VdPVwicmFuZ2VCb3hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRheXMtYm94XCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1kYXkgW25nRm9yT2ZdPVwibW9udGg/LmRheXNcIiBbbmdGb3JUcmFja0J5XT1cInRyYWNrQnlUaW1lXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF5c1wiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGF5XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPSdidXR0b24nXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiJ2RheXMtYnRuICcgKyBkYXkuY3NzQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLnRvZGF5XT1cImRheS5pc1RvZGF5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvblNlbGVjdGVkKGRheSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLm1hcmtlZF09XCJkYXkubWFya2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5sYXN0LW1vbnRoLWRheV09XCJkYXkuaXNMYXN0TW9udGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLm5leHQtbW9udGgtZGF5XT1cImRheS5pc05leHRNb250aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3Mub24tc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChkYXkudGltZSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRheS5kaXNhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0RGF5TGFiZWwoZGF5KSB8IGRhdGU6REFZX0RBVEVfRk9STUFUXCI+XG4gICAgICAgICAgICAgICAgICA8cD57eyBkYXkudGl0bGUgfX08L3A+XG4gICAgICAgICAgICAgICAgICA8c21hbGwgKm5nSWY9XCJkYXkuc3ViVGl0bGVcIj57eyBkYXk/LnN1YlRpdGxlIH19PC9zbWFsbD5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjcmFuZ2VCb3g+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkYXlzLWJveFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtZGF5IFtuZ0Zvck9mXT1cIm1vbnRoLmRheXNcIiBbbmdGb3JUcmFja0J5XT1cInRyYWNrQnlUaW1lXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF5c1wiXG4gICAgICAgICAgICAgICAgIFtjbGFzcy5zdGFydFNlbGVjdGlvbl09XCJpc1N0YXJ0U2VsZWN0aW9uKGRheSlcIlxuICAgICAgICAgICAgICAgICBbY2xhc3MuZW5kU2VsZWN0aW9uXT1cImlzRW5kU2VsZWN0aW9uKGRheSlcIlxuICAgICAgICAgICAgICAgICBbY2xhc3MuaXMtZmlyc3Qtd3JhcF09XCJkYXk/LmlzRmlyc3RcIlxuICAgICAgICAgICAgICAgICBbY2xhc3MuaXMtbGFzdC13cmFwXT1cImRheT8uaXNMYXN0XCJcbiAgICAgICAgICAgICAgICAgW2NsYXNzLmJldHdlZW5dPVwiaXNCZXR3ZWVuKGRheSlcIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRheVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT0nYnV0dG9uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIidkYXlzLWJ0biAnICsgZGF5LmNzc0NsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy50b2RheV09XCJkYXkuaXNUb2RheVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25TZWxlY3RlZChkYXkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5tYXJrZWRdPVwiZGF5Lm1hcmtlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MubGFzdC1tb250aC1kYXldPVwiZGF5LmlzTGFzdE1vbnRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5uZXh0LW1vbnRoLWRheV09XCJkYXkuaXNOZXh0TW9udGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmlzLWZpcnN0XT1cImRheS5pc0ZpcnN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5pcy1sYXN0XT1cImRheS5pc0xhc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLm9uLXNlbGVjdGVkXT1cImlzU2VsZWN0ZWQoZGF5LnRpbWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkYXkuZGlzYWJsZVwiPlxuICAgICAgICAgICAgICAgICAgPHA+e3sgZGF5LnRpdGxlIH19PC9wPlxuICAgICAgICAgICAgICAgICAgPHNtYWxsICpuZ0lmPVwiZGF5LnN1YlRpdGxlXCI+e3sgZGF5Py5zdWJUaXRsZSB9fTwvc21hbGw+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE1vbnRoQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKVxuICBtb250aDogQ2FsZW5kYXJNb250aCB8IGFueTtcbiAgQElucHV0KClcbiAgcGlja01vZGU6IFBpY2tNb2RlIHwgYW55O1xuICBASW5wdXQoKVxuICBpc1NhdmVIaXN0b3J5OiBib29sZWFuIHwgYW55O1xuICBASW5wdXQoKVxuICBpZDogYW55O1xuICBASW5wdXQoKVxuICByZWFkb25seSA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nIHwgYW55ID0gZGVmYXVsdHMuQ09MT1I7XG4gIEBJbnB1dCgpXG4gIG1heE11bHRpRGF0ZXM6IG51bWJlciB8IGFueTtcblxuICBAT3V0cHV0KClcbiAgY2hhbmdlOiBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJEYXlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxDYWxlbmRhckRheT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBzZWxlY3RTdGFydDogRXZlbnRFbWl0dGVyPENhbGVuZGFyRGF5PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHNlbGVjdEVuZDogRXZlbnRFbWl0dGVyPENhbGVuZGFyRGF5PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfZGF0ZTogQXJyYXk8Q2FsZW5kYXJEYXkgfCBudWxsPiA9IFtudWxsLCBudWxsXTtcbiAgX2lzSW5pdCA9IGZhbHNlO1xuICBfb25DaGFuZ2VkOiBGdW5jdGlvbiB8IGFueTtcbiAgX29uVG91Y2hlZDogRnVuY3Rpb24gfCBhbnk7XG5cbiAgcmVhZG9ubHkgREFZX0RBVEVfRk9STUFUID0gJ01NTU0gZGQsIHl5eXknO1xuXG4gIGdldCBfaXNSYW5nZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5waWNrTW9kZSA9PT0gcGlja01vZGVzLlJBTkdFO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2lzSW5pdCA9IHRydWU7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGU7XG4gIH1cblxuICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgdGhpcy5fZGF0ZSA9IG9iajtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZWQgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHRyYWNrQnlUaW1lKGluZGV4OiBudW1iZXIsIGl0ZW06IENhbGVuZGFyT3JpZ2luYWwpOiBudW1iZXIge1xuICAgIHJldHVybiBpdGVtID8gaXRlbS50aW1lIDogaW5kZXg7XG4gIH1cblxuICBpc0VuZFNlbGVjdGlvbihkYXk6IENhbGVuZGFyRGF5KTogYm9vbGVhbiB7XG4gICAgaWYgKCFkYXkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAodGhpcy5waWNrTW9kZSAhPT0gcGlja01vZGVzLlJBTkdFIHx8ICF0aGlzLl9pc0luaXQgfHwgdGhpcy5fZGF0ZVsxXSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9kYXRlWzFdLnRpbWUgPT09IGRheS50aW1lO1xuICB9XG5cbiAgZ2V0RGF5TGFiZWwoZGF5OiBDYWxlbmRhckRheSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXkudGltZSk7XG4gIH1cblxuICBpc0JldHdlZW4oZGF5OiBDYWxlbmRhckRheSk6IGJvb2xlYW4ge1xuICAgIGlmICghZGF5KSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5waWNrTW9kZSAhPT0gcGlja01vZGVzLlJBTkdFIHx8ICF0aGlzLl9pc0luaXQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGF0ZVswXSA9PT0gbnVsbCB8fCB0aGlzLl9kYXRlWzFdID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLl9kYXRlWzBdLnRpbWU7XG4gICAgY29uc3QgZW5kID0gdGhpcy5fZGF0ZVsxXS50aW1lO1xuXG4gICAgcmV0dXJuIGRheS50aW1lIDwgZW5kICYmIGRheS50aW1lID4gc3RhcnQ7XG4gIH1cblxuICBpc1N0YXJ0U2VsZWN0aW9uKGRheTogQ2FsZW5kYXJEYXkpOiBib29sZWFuIHtcbiAgICBpZiAoIWRheSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0aGlzLnBpY2tNb2RlICE9PSBwaWNrTW9kZXMuUkFOR0UgfHwgIXRoaXMuX2lzSW5pdCB8fCB0aGlzLl9kYXRlWzBdID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2RhdGVbMF0udGltZSA9PT0gZGF5LnRpbWUgJiYgdGhpcy5fZGF0ZVsxXSAhPT0gbnVsbDtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQodGltZTogbnVtYmVyKTogYW55IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9kYXRlKSkge1xuICAgICAgaWYgKHRoaXMucGlja01vZGUgIT09IHBpY2tNb2Rlcy5NVUxUSSkge1xuICAgICAgICBpZiAodGhpcy5fZGF0ZVswXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0aW1lID09PSB0aGlzLl9kYXRlWzBdLnRpbWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZGF0ZVsxXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0aW1lID09PSB0aGlzLl9kYXRlWzFdLnRpbWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlLmZpbmRJbmRleChlID0+IGUgIT09IG51bGwgJiYgZS50aW1lID09PSB0aW1lKSAhPT0gLTE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBvblNlbGVjdGVkKGl0ZW06IENhbGVuZGFyRGF5KTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVhZG9ubHkpIHJldHVybjtcbiAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGl0ZW0pO1xuICAgIGlmICh0aGlzLnBpY2tNb2RlID09PSBwaWNrTW9kZXMuU0lOR0xFKSB7XG4gICAgICB0aGlzLl9kYXRlWzBdID0gaXRlbTtcbiAgICAgIGNvbnN0IGVtaXRWYWx1ZSA9IHRoaXMuX2RhdGUgYXMgYW55O1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdChlbWl0VmFsdWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBpY2tNb2RlID09PSBwaWNrTW9kZXMuUkFOR0UpIHtcbiAgICAgIGlmICh0aGlzLl9kYXRlWzBdID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2RhdGVbMF0gPSBpdGVtO1xuICAgICAgICB0aGlzLnNlbGVjdFN0YXJ0LmVtaXQoaXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGVbMV0gPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGVbMF0udGltZSA8IGl0ZW0udGltZSkge1xuICAgICAgICAgIHRoaXMuX2RhdGVbMV0gPSBpdGVtO1xuICAgICAgICAgIHRoaXMuc2VsZWN0RW5kLmVtaXQoaXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZGF0ZVsxXSA9IHRoaXMuX2RhdGVbMF07XG4gICAgICAgICAgdGhpcy5zZWxlY3RFbmQuZW1pdCh0aGlzLl9kYXRlWzBdKTtcbiAgICAgICAgICB0aGlzLl9kYXRlWzBdID0gaXRlbTtcbiAgICAgICAgICB0aGlzLnNlbGVjdFN0YXJ0LmVtaXQoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIC8vIEVuc3VyZSBpZiB0aGUgdXNlciBoYXMgc2VsZWN0ZWQgYSBkYXRlIHJhbmdlLCB3aGVuIGEgdXNlciBpbnRlcmFjdHMgd2l0aCBhbm90aGVyIGRhdGUgb24gdGhlIGNhbGVuZGFyIHRoZSByYW5nZSB3aWxsIHJlc2V0LlxuICAgICAgLy8gfSBlbHNlIGlmICh0aGlzLl9kYXRlWzBdLnRpbWUgPiBpdGVtLnRpbWUpIHtcbiAgICAgIC8vICAgdGhpcy5fZGF0ZVswXSA9IGl0ZW07XG4gICAgICAvLyAgIHRoaXMuc2VsZWN0U3RhcnQuZW1pdChpdGVtKTtcbiAgICAgIC8vIH0gZWxzZSBpZiAodGhpcy5fZGF0ZVsxXS50aW1lIDwgaXRlbS50aW1lKSB7XG4gICAgICAvLyAgIHRoaXMuX2RhdGVbMV0gPSBpdGVtO1xuICAgICAgLy8gICB0aGlzLnNlbGVjdEVuZC5lbWl0KGl0ZW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZGF0ZVswXSA9IGl0ZW07XG4gICAgICAgIHRoaXMuc2VsZWN0U3RhcnQuZW1pdChpdGVtKTtcbiAgICAgICAgdGhpcy5fZGF0ZVsxXSA9IG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBlbWl0VmFsdWUgPSB0aGlzLl9kYXRlIGFzIGFueVxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdChlbWl0VmFsdWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBpY2tNb2RlID09PSBwaWNrTW9kZXMuTVVMVEkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZGF0ZS5maW5kSW5kZXgoZSA9PiBlICE9PSBudWxsICYmIGUudGltZSA9PT0gaXRlbS50aW1lKTtcblxuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICBpZiAoKHRoaXMubWF4TXVsdGlEYXRlcyAmJiB0aGlzLl9kYXRlLmxlbmd0aCA8IHRoaXMubWF4TXVsdGlEYXRlcykgfHwgIXRoaXMubWF4TXVsdGlEYXRlcykge1xuICAgICAgICAgIHRoaXMuX2RhdGUucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZGF0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgICAgY29uc3QgZW1pdFZhbHVlID0gdGhpcy5fZGF0ZS5maWx0ZXIoZSA9PiBlICE9PSBudWxsKSBhcyBhbnlcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQoZW1pdFZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==