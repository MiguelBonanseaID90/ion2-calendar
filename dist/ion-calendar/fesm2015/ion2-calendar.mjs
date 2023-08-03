import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Optional, Inject, Component, Input, forwardRef, EventEmitter, Output, ViewChild, HostBinding, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as i1$1 from '@ionic/angular';
import { IonContent, ModalController, IonicModule } from '@ionic/angular';
import moment from 'moment';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

class CalendarMonth {
}
class CalendarResult {
}
class CalendarComponentMonthChange {
}

const defaults = {
    DATE_FORMAT: 'YYYY-MM-DD',
    COLOR: 'primary',
    WEEKS_FORMAT: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    MONTH_FORMAT: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
};
const pickModes = {
    SINGLE: 'single',
    RANGE: 'range',
    MULTI: 'multi'
};

const DEFAULT_CALENDAR_OPTIONS = new InjectionToken('DEFAULT_CALENDAR_MODAL_OPTIONS');

const isBoolean = (input) => input === true || input === false;
class CalendarService {
    constructor(defaultOpts) {
        this.defaultOpts = defaultOpts;
    }
    get DEFAULT_STEP() {
        return 12;
    }
    safeOpt(calendarOptions = {}) {
        const _disableWeeks = [];
        const _daysConfig = [];
        let { from = new Date(), to = 0, weekStart = 0, step = this.DEFAULT_STEP, id = '', cssClass = '', closeLabel = 'CANCEL', doneLabel = 'DONE', monthFormat = 'MMM YYYY', title = 'CALENDAR', defaultTitle = '', defaultSubtitle = '', autoDone = false, canBackwardsSelected = false, closeIcon = false, doneIcon = false, showYearPicker = false, isSaveHistory = false, pickMode = pickModes.SINGLE, color = defaults.COLOR, weekdays = defaults.WEEKS_FORMAT, daysConfig = _daysConfig, disableWeeks = _disableWeeks, showAdjacentMonthDay = true, defaultEndDateToStartDate = false, clearLabel = null, maxMultiDates = null } = Object.assign(Object.assign({}, this.defaultOpts), calendarOptions);
        return {
            id,
            from,
            to,
            pickMode,
            autoDone,
            color,
            cssClass,
            weekStart,
            closeLabel,
            closeIcon,
            doneLabel,
            doneIcon,
            canBackwardsSelected,
            isSaveHistory,
            disableWeeks,
            monthFormat,
            title,
            weekdays,
            daysConfig,
            step,
            showYearPicker,
            defaultTitle,
            defaultSubtitle,
            defaultScrollTo: calendarOptions.defaultScrollTo || from,
            defaultDate: calendarOptions.defaultDate || null,
            defaultDates: calendarOptions.defaultDates || null,
            defaultDateRange: calendarOptions.defaultDateRange || null,
            showAdjacentMonthDay,
            defaultEndDateToStartDate,
            clearLabel,
            maxMultiDates
        };
    }
    createOriginalCalendar(time) {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstWeek = new Date(year, month, 1).getDay();
        const howManyDays = moment(time).daysInMonth();
        return {
            year,
            month,
            firstWeek,
            howManyDays,
            time: new Date(year, month, 1).getTime(),
            date: new Date(time),
        };
    }
    findDayConfig(day, opt) {
        if (!opt.daysConfig && opt.daysConfig.length <= 0)
            return null;
        return opt.daysConfig.find((n) => day.isSame(n.date, 'day'));
    }
    createCalendarDay(time, opt, month) {
        var _a;
        let _time = moment(time);
        let date = moment(time);
        let isToday = moment().isSame(_time, 'days');
        let dayConfig = this.findDayConfig(_time, opt);
        let _rangeBeg = moment(opt.from).valueOf();
        let _rangeEnd = moment(opt.to).valueOf();
        let isBetween = true;
        let disableWee = ((_a = opt === null || opt === void 0 ? void 0 : opt.disableWeeks) === null || _a === void 0 ? void 0 : _a.indexOf(_time.toDate().getDay())) !== -1;
        if (_rangeBeg > 0 && _rangeEnd > 0) {
            if (!opt.canBackwardsSelected) {
                isBetween = !_time.isBetween(_rangeBeg, _rangeEnd, 'days', '[]');
            }
            else {
                isBetween = moment(_time).isBefore(_rangeBeg) ? false : isBetween;
            }
        }
        else if (_rangeBeg > 0 && _rangeEnd === 0) {
            if (!opt.canBackwardsSelected) {
                let _addTime = _time.add(1, 'day');
                isBetween = !_addTime.isAfter(_rangeBeg);
            }
            else {
                isBetween = false;
            }
        }
        let _disable = false;
        if (dayConfig && isBoolean(dayConfig.disable)) {
            _disable = dayConfig.disable;
        }
        else {
            _disable = disableWee || isBetween;
        }
        let title = new Date(time).getDate().toString();
        if (dayConfig && dayConfig.title) {
            title = dayConfig.title;
        }
        else if (opt.defaultTitle) {
            title = opt.defaultTitle;
        }
        let subTitle = '';
        if (dayConfig && dayConfig.subTitle) {
            subTitle = dayConfig.subTitle;
        }
        else if (opt.defaultSubtitle) {
            subTitle = opt.defaultSubtitle;
        }
        return {
            time,
            isToday,
            title,
            subTitle,
            selected: false,
            isLastMonth: date.month() < (month ? month : 0),
            isNextMonth: date.month() > (month ? month : 0),
            marked: dayConfig ? dayConfig.marked || false : false,
            cssClass: dayConfig ? dayConfig.cssClass || '' : '',
            disable: _disable,
            isFirst: date.date() === 1,
            isLast: date.date() === date.daysInMonth(),
        };
    }
    createCalendarMonth(original, opt) {
        let days = new Array(6).fill(null);
        let len = original.howManyDays;
        for (let i = original.firstWeek; i < len + original.firstWeek; i++) {
            let itemTime = new Date(original.year, original.month, i - original.firstWeek + 1).getTime();
            days[i] = this.createCalendarDay(itemTime, opt);
        }
        let weekStart = opt.weekStart;
        if (weekStart === 1) {
            if (days[0] === null) {
                days.shift();
            }
            else {
                days.unshift(...new Array(6).fill(null));
            }
        }
        if (opt.showAdjacentMonthDay) {
            const _booleanMap = days.map(e => !!e);
            const thisMonth = moment(original.time).month();
            let startOffsetIndex = _booleanMap.indexOf(true) - 1;
            let endOffsetIndex = _booleanMap.lastIndexOf(true) + 1;
            for (startOffsetIndex; startOffsetIndex >= 0; startOffsetIndex--) {
                const dayBefore = moment(days[startOffsetIndex + 1].time)
                    .clone()
                    .subtract(1, 'd');
                days[startOffsetIndex] = this.createCalendarDay(dayBefore.valueOf(), opt, thisMonth);
            }
            if (!(_booleanMap.length % 7 === 0 && _booleanMap[_booleanMap.length - 1])) {
                for (endOffsetIndex; endOffsetIndex < days.length + (endOffsetIndex % 7); endOffsetIndex++) {
                    const dayAfter = moment(days[endOffsetIndex - 1].time)
                        .clone()
                        .add(1, 'd');
                    days[endOffsetIndex] = this.createCalendarDay(dayAfter.valueOf(), opt, thisMonth);
                }
            }
        }
        return {
            days,
            original: original,
        };
    }
    createMonthsByPeriod(startTime, monthsNum, opt) {
        let _array = [];
        let _start = new Date(startTime);
        let _startMonth = new Date(_start.getFullYear(), _start.getMonth(), 1).getTime();
        for (let i = 0; i < monthsNum; i++) {
            let time = moment(_startMonth)
                .add(i, 'M')
                .valueOf();
            let originalCalendar = this.createOriginalCalendar(time);
            _array.push(this.createCalendarMonth(originalCalendar, opt));
        }
        return _array;
    }
    wrapResult(original, pickMode) {
        let result;
        switch (pickMode) {
            case pickModes.SINGLE:
                result = this.multiFormat(original[0].time);
                break;
            case pickModes.RANGE:
                result = {
                    from: this.multiFormat(original[0].time),
                    to: this.multiFormat((original[1] || original[0]).time),
                };
                break;
            case pickModes.MULTI:
                result = original.map(e => this.multiFormat(e.time));
                break;
            default:
                result = original;
        }
        return result;
    }
    multiFormat(time) {
        const _moment = moment(time);
        return {
            time: _moment.valueOf(),
            unix: _moment.unix(),
            dateObj: _moment.toDate(),
            string: _moment.format(defaults.DATE_FORMAT),
            years: _moment.year(),
            months: _moment.month() + 1,
            date: _moment.date(),
        };
    }
}
CalendarService.ɵfac = function CalendarService_Factory(t) { return new (t || CalendarService)(i0.ɵɵinject(DEFAULT_CALENDAR_OPTIONS, 8)); };
CalendarService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CalendarService, factory: CalendarService.ɵfac });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CalendarService, [{
            type: Injectable
        }], function () {
        return [{ type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [DEFAULT_CALENDAR_OPTIONS]
                    }] }];
    }, null);
})();

function CalendarWeekComponent_li_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "li");
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const w_r1 = ctx.$implicit;
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(w_r1);
    }
}
class CalendarWeekComponent {
    constructor() {
        this._weekArray = defaults.WEEKS_FORMAT;
        this._displayWeekArray = this._weekArray;
        this._weekStart = 0;
        this.color = defaults.COLOR;
    }
    set weekArray(value) {
        if (value && value.length === 7) {
            this._weekArray = [...value];
            this.adjustSort();
        }
    }
    set weekStart(value) {
        if (value === 0 || value === 1) {
            this._weekStart = value;
            this.adjustSort();
        }
    }
    adjustSort() {
        if (this._weekStart === 1) {
            const cacheWeekArray = [...this._weekArray];
            cacheWeekArray.push(cacheWeekArray.shift());
            this._displayWeekArray = [...cacheWeekArray];
        }
        else if (this._weekStart === 0) {
            this._displayWeekArray = [...this._weekArray];
        }
    }
}
CalendarWeekComponent.ɵfac = function CalendarWeekComponent_Factory(t) { return new (t || CalendarWeekComponent)(); };
CalendarWeekComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CalendarWeekComponent, selectors: [["ion-calendar-week"]], inputs: { color: "color", weekArray: "weekArray", weekStart: "weekStart" }, decls: 3, vars: 5, consts: [["no-border-top", ""], [4, "ngFor", "ngForOf"]], template: function CalendarWeekComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-toolbar", 0)(1, "ul");
            i0.ɵɵtemplate(2, CalendarWeekComponent_li_2_Template, 2, 1, "li", 1);
            i0.ɵɵelementEnd()();
        }
        if (rf & 2) {
            i0.ɵɵclassMap("week-toolbar ");
            i0.ɵɵadvance(1);
            i0.ɵɵclassMap("week-title " + ctx.color);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx._displayWeekArray);
        }
    }, dependencies: [i1.NgForOf, i1$1.IonToolbar], styles: ["[_nghost-%COMP%]   .toolbar-background-md[_ngcontent-%COMP%], [_nghost-%COMP%]   .toolbar-background-ios[_ngcontent-%COMP%]{background:transparent}[_nghost-%COMP%]   .week-toolbar[_ngcontent-%COMP%]{--padding-start: 0;--padding-end: 0;--padding-bottom: 0;--padding-top: 0}[_nghost-%COMP%]   .week-toolbar.primary[_ngcontent-%COMP%]{--background: var(--ion-color-primary)}[_nghost-%COMP%]   .week-toolbar.secondary[_ngcontent-%COMP%]{--background: var(--ion-color-secondary)}[_nghost-%COMP%]   .week-toolbar.danger[_ngcontent-%COMP%]{--background: var(--ion-color-danger)}[_nghost-%COMP%]   .week-toolbar.dark[_ngcontent-%COMP%]{--background: var(--ion-color-dark)}[_nghost-%COMP%]   .week-toolbar.light[_ngcontent-%COMP%]{--background: var(--ion-color-light)}[_nghost-%COMP%]   .week-toolbar.transparent[_ngcontent-%COMP%]{--background: transparent}[_nghost-%COMP%]   .week-toolbar.toolbar-md[_ngcontent-%COMP%]{min-height:44px}[_nghost-%COMP%]   .week-title[_ngcontent-%COMP%]{margin:0;height:44px;width:100%;padding:15px 0;font-size:.9em}[_nghost-%COMP%]   .week-title.light[_ngcontent-%COMP%], [_nghost-%COMP%]   .week-title.transparent[_ngcontent-%COMP%]{color:#9e9e9e}[_nghost-%COMP%]   .week-title[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style-type:none;display:block;float:left;width:14%;text-align:center;font-weight:700}[_nghost-%COMP%]   .week-title[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-of-type(7n), [_nghost-%COMP%]   .week-title[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-of-type(7n + 1){width:15%}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CalendarWeekComponent, [{
            type: Component,
            args: [{ selector: 'ion-calendar-week', template: `
    <ion-toolbar [class]="'week-toolbar '" no-border-top>
      <ul [class]="'week-title ' + color">
        <li *ngFor="let w of _displayWeekArray">{{ w }}</li>
      </ul>
    </ion-toolbar>
  `, styles: [":host .toolbar-background-md,:host .toolbar-background-ios{background:transparent}:host .week-toolbar{--padding-start: 0;--padding-end: 0;--padding-bottom: 0;--padding-top: 0}:host .week-toolbar.primary{--background: var(--ion-color-primary)}:host .week-toolbar.secondary{--background: var(--ion-color-secondary)}:host .week-toolbar.danger{--background: var(--ion-color-danger)}:host .week-toolbar.dark{--background: var(--ion-color-dark)}:host .week-toolbar.light{--background: var(--ion-color-light)}:host .week-toolbar.transparent{--background: transparent}:host .week-toolbar.toolbar-md{min-height:44px}:host .week-title{margin:0;height:44px;width:100%;padding:15px 0;font-size:.9em}:host .week-title.light,:host .week-title.transparent{color:#9e9e9e}:host .week-title li{list-style-type:none;display:block;float:left;width:14%;text-align:center;font-weight:700}:host .week-title li:nth-of-type(7n),:host .week-title li:nth-of-type(7n + 1){width:15%}\n"] }]
        }], function () { return []; }, { color: [{
                type: Input
            }], weekArray: [{
                type: Input
            }], weekStart: [{
                type: Input
            }] });
})();

function MonthComponent_ng_template_1_ng_template_1_ng_container_1_small_5_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "small");
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const day_r4 = i0.ɵɵnextContext(2).$implicit;
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(day_r4 == null ? null : day_r4.subTitle);
    }
}
function MonthComponent_ng_template_1_ng_template_1_ng_container_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r10 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementContainerStart(0);
        i0.ɵɵelementStart(1, "button", 6);
        i0.ɵɵlistener("click", function MonthComponent_ng_template_1_ng_template_1_ng_container_1_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r10); const day_r4 = i0.ɵɵnextContext().$implicit; const ctx_r8 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r8.onSelected(day_r4)); });
        i0.ɵɵpipe(2, "date");
        i0.ɵɵelementStart(3, "p");
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(5, MonthComponent_ng_template_1_ng_template_1_ng_container_1_small_5_Template, 2, 1, "small", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementContainerEnd();
    }
    if (rf & 2) {
        const day_r4 = i0.ɵɵnextContext().$implicit;
        const ctx_r5 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵclassMap("days-btn " + day_r4.cssClass);
        i0.ɵɵclassProp("today", day_r4.isToday)("marked", day_r4.marked)("last-month-day", day_r4.isLastMonth)("next-month-day", day_r4.isNextMonth)("on-selected", ctx_r5.isSelected(day_r4.time));
        i0.ɵɵproperty("disabled", day_r4.disable);
        i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(2, 16, ctx_r5.getDayLabel(day_r4), ctx_r5.DAY_DATE_FORMAT));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(day_r4.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", day_r4.subTitle);
    }
}
function MonthComponent_ng_template_1_ng_template_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 4);
        i0.ɵɵtemplate(1, MonthComponent_ng_template_1_ng_template_1_ng_container_1_Template, 6, 19, "ng-container", 5);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const day_r4 = ctx.$implicit;
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", day_r4);
    }
}
function MonthComponent_ng_template_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 2);
        i0.ɵɵtemplate(1, MonthComponent_ng_template_1_ng_template_1_Template, 2, 1, "ng-template", 3);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx_r0.month == null ? null : ctx_r0.month.days)("ngForTrackBy", ctx_r0.trackByTime);
    }
}
function MonthComponent_ng_template_2_ng_template_1_ng_container_1_small_4_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "small");
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const day_r13 = i0.ɵɵnextContext(2).$implicit;
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(day_r13 == null ? null : day_r13.subTitle);
    }
}
function MonthComponent_ng_template_2_ng_template_1_ng_container_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r19 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementContainerStart(0);
        i0.ɵɵelementStart(1, "button", 6);
        i0.ɵɵlistener("click", function MonthComponent_ng_template_2_ng_template_1_ng_container_1_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r19); const day_r13 = i0.ɵɵnextContext().$implicit; const ctx_r17 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r17.onSelected(day_r13)); });
        i0.ɵɵelementStart(2, "p");
        i0.ɵɵtext(3);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, MonthComponent_ng_template_2_ng_template_1_ng_container_1_small_4_Template, 2, 1, "small", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementContainerEnd();
    }
    if (rf & 2) {
        const day_r13 = i0.ɵɵnextContext().$implicit;
        const ctx_r14 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵclassMap("days-btn " + day_r13.cssClass);
        i0.ɵɵclassProp("today", day_r13.isToday)("marked", day_r13.marked)("last-month-day", day_r13.isLastMonth)("next-month-day", day_r13.isNextMonth)("is-first", day_r13.isFirst)("is-last", day_r13.isLast)("on-selected", ctx_r14.isSelected(day_r13.time));
        i0.ɵɵproperty("disabled", day_r13.disable);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(day_r13.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", day_r13.subTitle);
    }
}
function MonthComponent_ng_template_2_ng_template_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 4);
        i0.ɵɵtemplate(1, MonthComponent_ng_template_2_ng_template_1_ng_container_1_Template, 5, 19, "ng-container", 5);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const day_r13 = ctx.$implicit;
        const ctx_r12 = i0.ɵɵnextContext(2);
        i0.ɵɵclassProp("startSelection", ctx_r12.isStartSelection(day_r13))("endSelection", ctx_r12.isEndSelection(day_r13))("is-first-wrap", day_r13 == null ? null : day_r13.isFirst)("is-last-wrap", day_r13 == null ? null : day_r13.isLast)("between", ctx_r12.isBetween(day_r13));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", day_r13);
    }
}
function MonthComponent_ng_template_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 2);
        i0.ɵɵtemplate(1, MonthComponent_ng_template_2_ng_template_1_Template, 2, 11, "ng-template", 3);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx_r2.month.days)("ngForTrackBy", ctx_r2.trackByTime);
    }
}
const MONTH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MonthComponent),
    multi: true,
};
class MonthComponent {
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
MonthComponent.ɵfac = function MonthComponent_Factory(t) { return new (t || MonthComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
MonthComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MonthComponent, selectors: [["ion-calendar-month"]], inputs: { month: "month", pickMode: "pickMode", isSaveHistory: "isSaveHistory", id: "id", readonly: "readonly", color: "color", maxMultiDates: "maxMultiDates" }, outputs: { change: "change", select: "select", selectStart: "selectStart", selectEnd: "selectEnd" }, features: [i0.ɵɵProvidersFeature([MONTH_VALUE_ACCESSOR])], decls: 4, vars: 4, consts: [[3, "ngIf", "ngIfElse"], ["rangeBox", ""], [1, "days-box"], ["ngFor", "", 3, "ngForOf", "ngForTrackBy"], [1, "days"], [4, "ngIf"], ["type", "button", 3, "disabled", "click"]], template: function MonthComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵtemplate(1, MonthComponent_ng_template_1_Template, 2, 2, "ng-template", 0);
            i0.ɵɵtemplate(2, MonthComponent_ng_template_2_Template, 2, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            const _r1 = i0.ɵɵreference(3);
            i0.ɵɵclassMap(ctx.color);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx._isRange)("ngIfElse", _r1);
        }
    }, dependencies: [i1.NgForOf, i1.NgIf, i1.DatePipe], styles: ["[_nghost-%COMP%]{display:inline-block;width:100%}[_nghost-%COMP%]   .days-box[_ngcontent-%COMP%]{padding:.5rem}[_nghost-%COMP%]   .days[_ngcontent-%COMP%]:nth-of-type(7n), [_nghost-%COMP%]   .days[_ngcontent-%COMP%]:nth-of-type(7n + 1){width:15%}[_nghost-%COMP%]   .days[_ngcontent-%COMP%]{width:14%;float:left;text-align:center;height:36px;margin-bottom:5px}[_nghost-%COMP%]   .days[_ngcontent-%COMP%]   .marked[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:500}[_nghost-%COMP%]   .days[_ngcontent-%COMP%]   .on-selected[_ngcontent-%COMP%]{border:none}[_nghost-%COMP%]   .days[_ngcontent-%COMP%]   .on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.3em}[_nghost-%COMP%]   button.days-btn[_ngcontent-%COMP%]{border-radius:36px;width:36px;display:block;margin:0 auto;padding:0;height:36px;background-color:transparent;position:relative;z-index:2;outline:0}[_nghost-%COMP%]   button.days-btn[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:1.2em;color:#333;text-align:center}[_nghost-%COMP%]   button.days-btn[disabled][_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#00000040}[_nghost-%COMP%]   button.days-btn.on-selected[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{transition:bottom .3s;bottom:-14px}[_nghost-%COMP%]   button.days-btn[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{overflow:hidden;display:block;left:0;right:0;bottom:-5px;position:absolute;z-index:1;text-align:center;font-weight:200}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .marked[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--ion-color-primary)}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:700}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today.on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .marked.on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{background-color:var(--ion-color-primary);color:#fff}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]{position:relative}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:before{background-color:var(--ion-color-primary)}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:after{background-color:#fff;opacity:.25}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]{position:relative}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:before{background-color:var(--ion-color-primary)}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:after{background-color:#fff;opacity:.25}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .startSelection.endSelection[_ngcontent-%COMP%]:after{background-color:transparent}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{background-color:var(--ion-color-primary);width:100%;border-radius:0;position:relative}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .days.startSelection[_ngcontent-%COMP%]:nth-child(7n):before, [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n)   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%]{border-radius:0 36px 36px 0}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .days.startSelection[_ngcontent-%COMP%]:nth-child(7n):before.on-selected, [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n)   button.days-btn.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   button.days-btn.is-last.on-selected[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .days.endSelection[_ngcontent-%COMP%]:nth-child(7n+1):before, [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n+1)   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .days.between.is-first-wrap[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%]{border-radius:36px 0 0 36px}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   button.days-btn.is-first.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   button.days-btn.is-last.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .startSelection.is-last-wrap[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .startSelection.is-last-wrap[_ngcontent-%COMP%]:after{border-radius:0 36px 36px 0}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .endSelection.is-first-wrap[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .endSelection.is-first-wrap[_ngcontent-%COMP%]:after{border-radius:36px 0 0 36px}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}[_nghost-%COMP%]   .primary[_ngcontent-%COMP%]   .startSelection.endSelection[_ngcontent-%COMP%]:before{--ion-color-primary: transparent}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .marked[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--ion-color-secondary)}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:700}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today.on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .marked.on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{background-color:var(--ion-color-secondary);color:#fff}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]{position:relative}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:before{background-color:var(--ion-color-secondary)}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:after{background-color:#fff;opacity:.25}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]{position:relative}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:before{background-color:var(--ion-color-secondary)}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:after{background-color:#fff;opacity:.25}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .startSelection.endSelection[_ngcontent-%COMP%]:after{background-color:transparent}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{background-color:var(--ion-color-secondary);width:100%;border-radius:0;position:relative}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .days.startSelection[_ngcontent-%COMP%]:nth-child(7n):before, [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n)   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%]{border-radius:0 36px 36px 0}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .days.startSelection[_ngcontent-%COMP%]:nth-child(7n):before.on-selected, [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n)   button.days-btn.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   button.days-btn.is-last.on-selected[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .days.endSelection[_ngcontent-%COMP%]:nth-child(7n+1):before, [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n+1)   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .days.between.is-first-wrap[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%]{border-radius:36px 0 0 36px}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   button.days-btn.is-first.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   button.days-btn.is-last.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .startSelection.is-last-wrap[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .startSelection.is-last-wrap[_ngcontent-%COMP%]:after{border-radius:0 36px 36px 0}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .endSelection.is-first-wrap[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .endSelection.is-first-wrap[_ngcontent-%COMP%]:after{border-radius:36px 0 0 36px}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}[_nghost-%COMP%]   .secondary[_ngcontent-%COMP%]   .startSelection.endSelection[_ngcontent-%COMP%]:before{--ion-color-primary: transparent}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .marked[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--ion-color-danger)}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:700}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today.on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .marked.on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{background-color:var(--ion-color-danger);color:#fff}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]{position:relative}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:before{background-color:var(--ion-color-danger)}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:after{background-color:#fff;opacity:.25}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]{position:relative}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:before{background-color:var(--ion-color-danger)}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:after{background-color:#fff;opacity:.25}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .startSelection.endSelection[_ngcontent-%COMP%]:after{background-color:transparent}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{background-color:var(--ion-color-danger);width:100%;border-radius:0;position:relative}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .days.startSelection[_ngcontent-%COMP%]:nth-child(7n):before, [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n)   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%]{border-radius:0 36px 36px 0}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .days.startSelection[_ngcontent-%COMP%]:nth-child(7n):before.on-selected, [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n)   button.days-btn.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   button.days-btn.is-last.on-selected[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .days.endSelection[_ngcontent-%COMP%]:nth-child(7n+1):before, [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n+1)   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .days.between.is-first-wrap[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%]{border-radius:36px 0 0 36px}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   button.days-btn.is-first.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   button.days-btn.is-last.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .startSelection.is-last-wrap[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .startSelection.is-last-wrap[_ngcontent-%COMP%]:after{border-radius:0 36px 36px 0}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .endSelection.is-first-wrap[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .endSelection.is-first-wrap[_ngcontent-%COMP%]:after{border-radius:36px 0 0 36px}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}[_nghost-%COMP%]   .danger[_ngcontent-%COMP%]   .startSelection.endSelection[_ngcontent-%COMP%]:before{--ion-color-primary: transparent}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .marked[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--ion-color-dark)}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:700}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today.on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .marked.on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{background-color:var(--ion-color-dark);color:#fff}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]{position:relative}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:before{background-color:var(--ion-color-dark)}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:after{background-color:#fff;opacity:.25}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]{position:relative}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:before{background-color:var(--ion-color-dark)}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:after{background-color:#fff;opacity:.25}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .startSelection.endSelection[_ngcontent-%COMP%]:after{background-color:transparent}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{background-color:var(--ion-color-dark);width:100%;border-radius:0;position:relative}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .days.startSelection[_ngcontent-%COMP%]:nth-child(7n):before, [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n)   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%]{border-radius:0 36px 36px 0}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .days.startSelection[_ngcontent-%COMP%]:nth-child(7n):before.on-selected, [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n)   button.days-btn.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   button.days-btn.is-last.on-selected[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .days.endSelection[_ngcontent-%COMP%]:nth-child(7n+1):before, [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n+1)   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .days.between.is-first-wrap[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%]{border-radius:36px 0 0 36px}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   button.days-btn.is-first.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   button.days-btn.is-last.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .startSelection.is-last-wrap[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .startSelection.is-last-wrap[_ngcontent-%COMP%]:after{border-radius:0 36px 36px 0}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .endSelection.is-first-wrap[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .endSelection.is-first-wrap[_ngcontent-%COMP%]:after{border-radius:36px 0 0 36px}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}[_nghost-%COMP%]   .dark[_ngcontent-%COMP%]   .startSelection.endSelection[_ngcontent-%COMP%]:before{--ion-color-primary: transparent}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .marked[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--ion-color-light)}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:700}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today.on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .marked.on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#a0a0a0}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{background-color:var(--ion-color-light);color:#a0a0a0}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]{position:relative}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:before{background-color:var(--ion-color-light)}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:after{background-color:#fff;opacity:.25}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]{position:relative}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:before{background-color:var(--ion-color-light)}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:after{background-color:#fff;opacity:.25}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .startSelection.endSelection[_ngcontent-%COMP%]:after{background-color:transparent}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{background-color:var(--ion-color-light);width:100%;border-radius:0;position:relative}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#a0a0a0}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#a0a0a0}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days.startSelection[_ngcontent-%COMP%]:nth-child(7n):before, [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n)   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%]{border-radius:0 36px 36px 0}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days.startSelection[_ngcontent-%COMP%]:nth-child(7n):before.on-selected, [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n)   button.days-btn.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   button.days-btn.is-last.on-selected[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days.endSelection[_ngcontent-%COMP%]:nth-child(7n+1):before, [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n+1)   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days.between.is-first-wrap[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%]{border-radius:36px 0 0 36px}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   button.days-btn.is-first.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   button.days-btn.is-last.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .startSelection.is-last-wrap[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .startSelection.is-last-wrap[_ngcontent-%COMP%]:after{border-radius:0 36px 36px 0}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .endSelection.is-first-wrap[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .endSelection.is-first-wrap[_ngcontent-%COMP%]:after{border-radius:36px 0 0 36px}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#a0a0a0}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .startSelection.endSelection[_ngcontent-%COMP%]:before{--ion-color-primary: transparent}[_nghost-%COMP%]   .light[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#565656}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:700}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .today.on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .marked.on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]{position:relative}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]:after{background-color:#fff;opacity:.25}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]{position:relative}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]:after{background-color:#fff;opacity:.25}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .startSelection.endSelection[_ngcontent-%COMP%]:after{background-color:transparent}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{width:100%;border-radius:0;position:relative}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .days.startSelection[_ngcontent-%COMP%]:nth-child(7n):before, [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n)   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%]{border-radius:0 36px 36px 0}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .days.startSelection[_ngcontent-%COMP%]:nth-child(7n):before.on-selected, [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n)   button.days-btn.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   button.days-btn.is-last.on-selected[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .days.endSelection[_ngcontent-%COMP%]:nth-child(7n+1):before, [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .days.between[_ngcontent-%COMP%]:nth-child(7n+1)   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .days.between.is-first-wrap[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%]{border-radius:36px 0 0 36px}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn.is-first[_ngcontent-%COMP%], [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   button.days-btn.is-first.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   button.days-btn.is-last.on-selected[_ngcontent-%COMP%], [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%], [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn.is-last[_ngcontent-%COMP%]{border-radius:50%}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .startSelection.is-last-wrap[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .startSelection.is-last-wrap[_ngcontent-%COMP%]:after{border-radius:0 36px 36px 0}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .endSelection.is-first-wrap[_ngcontent-%COMP%]:before, [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .endSelection.is-first-wrap[_ngcontent-%COMP%]:after{border-radius:36px 0 0 36px}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .days[_ngcontent-%COMP%]   .on-selected[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .startSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .endSelection[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%], [_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .between[_ngcontent-%COMP%]   button.days-btn[_ngcontent-%COMP%]{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}[_nghost-%COMP%]   .cal-color[_ngcontent-%COMP%]   .startSelection.endSelection[_ngcontent-%COMP%]:before{--ion-color-primary: transparent}body[data-dark-mode=true]   [_nghost-%COMP%]   button.days-btn[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}body[data-dark-mode=true]   [_nghost-%COMP%]   button.days-btn[disabled][_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#ffffff80}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MonthComponent, [{
            type: Component,
            args: [{ selector: 'ion-calendar-month', providers: [MONTH_VALUE_ACCESSOR], template: `
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
  `, styles: [":host{display:inline-block;width:100%}:host .days-box{padding:.5rem}:host .days:nth-of-type(7n),:host .days:nth-of-type(7n + 1){width:15%}:host .days{width:14%;float:left;text-align:center;height:36px;margin-bottom:5px}:host .days .marked p{font-weight:500}:host .days .on-selected{border:none}:host .days .on-selected p{font-size:1.3em}:host button.days-btn{border-radius:36px;width:36px;display:block;margin:0 auto;padding:0;height:36px;background-color:transparent;position:relative;z-index:2;outline:0}:host button.days-btn p{margin:0;font-size:1.2em;color:#333;text-align:center}:host button.days-btn[disabled] p{color:#00000040}:host button.days-btn.on-selected small{transition:bottom .3s;bottom:-14px}:host button.days-btn small{overflow:hidden;display:block;left:0;right:0;bottom:-5px;position:absolute;z-index:1;text-align:center;font-weight:200}:host .primary button.days-btn small,:host .primary .days .marked p,:host .primary .days .today p{color:var(--ion-color-primary)}:host .primary .days .today p{font-weight:700}:host .primary .days .today.on-selected p,:host .primary .days .marked.on-selected p{color:#fff}:host .primary .days .on-selected,:host .primary .startSelection button.days-btn,:host .primary .endSelection button.days-btn{background-color:var(--ion-color-primary);color:#fff}:host .primary .startSelection{position:relative}:host .primary .startSelection:before,:host .primary .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .primary .startSelection:before{background-color:var(--ion-color-primary)}:host .primary .startSelection:after{background-color:#fff;opacity:.25}:host .primary .endSelection{position:relative}:host .primary .endSelection:before,:host .primary .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .primary .endSelection:before{background-color:var(--ion-color-primary)}:host .primary .endSelection:after{background-color:#fff;opacity:.25}:host .primary .startSelection.endSelection:after{background-color:transparent}:host .primary .startSelection button.days-btn{border-radius:50%}:host .primary .between button.days-btn{background-color:var(--ion-color-primary);width:100%;border-radius:0;position:relative}:host .primary .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .primary .between button.days-btn p{color:#fff}:host .primary .endSelection button.days-btn{border-radius:50%}:host .primary .endSelection button.days-btn p{color:#fff}:host .primary .days.startSelection:nth-child(7n):before,:host .primary .days.between:nth-child(7n) button.days-btn,:host .primary button.days-btn.is-last{border-radius:0 36px 36px 0}:host .primary .days.startSelection:nth-child(7n):before.on-selected,:host .primary .days.between:nth-child(7n) button.days-btn.on-selected,:host .primary button.days-btn.is-last.on-selected{border-radius:50%}:host .primary .days.endSelection:nth-child(7n+1):before,:host .primary .days.between:nth-child(7n+1) button.days-btn,:host .primary .days.between.is-first-wrap button.days-btn.is-first,:host .primary button.days-btn.is-first{border-radius:36px 0 0 36px}:host .primary .startSelection button.days-btn.is-first,:host .primary .endSelection button.days-btn.is-first,:host .primary button.days-btn.is-first.on-selected,:host .primary button.days-btn.is-last.on-selected,:host .primary .startSelection button.days-btn.is-last,:host .primary .endSelection button.days-btn.is-last{border-radius:50%}:host .primary .startSelection.is-last-wrap:before,:host .primary .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .primary .endSelection.is-first-wrap:before,:host .primary .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .primary .days .on-selected p{color:#fff}:host .primary .startSelection button.days-btn,:host .primary .endSelection button.days-btn,:host .primary .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .primary .startSelection.endSelection:before{--ion-color-primary: transparent}:host .secondary button.days-btn small,:host .secondary .days .marked p,:host .secondary .days .today p{color:var(--ion-color-secondary)}:host .secondary .days .today p{font-weight:700}:host .secondary .days .today.on-selected p,:host .secondary .days .marked.on-selected p{color:#fff}:host .secondary .days .on-selected,:host .secondary .startSelection button.days-btn,:host .secondary .endSelection button.days-btn{background-color:var(--ion-color-secondary);color:#fff}:host .secondary .startSelection{position:relative}:host .secondary .startSelection:before,:host .secondary .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .secondary .startSelection:before{background-color:var(--ion-color-secondary)}:host .secondary .startSelection:after{background-color:#fff;opacity:.25}:host .secondary .endSelection{position:relative}:host .secondary .endSelection:before,:host .secondary .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .secondary .endSelection:before{background-color:var(--ion-color-secondary)}:host .secondary .endSelection:after{background-color:#fff;opacity:.25}:host .secondary .startSelection.endSelection:after{background-color:transparent}:host .secondary .startSelection button.days-btn{border-radius:50%}:host .secondary .between button.days-btn{background-color:var(--ion-color-secondary);width:100%;border-radius:0;position:relative}:host .secondary .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .secondary .between button.days-btn p{color:#fff}:host .secondary .endSelection button.days-btn{border-radius:50%}:host .secondary .endSelection button.days-btn p{color:#fff}:host .secondary .days.startSelection:nth-child(7n):before,:host .secondary .days.between:nth-child(7n) button.days-btn,:host .secondary button.days-btn.is-last{border-radius:0 36px 36px 0}:host .secondary .days.startSelection:nth-child(7n):before.on-selected,:host .secondary .days.between:nth-child(7n) button.days-btn.on-selected,:host .secondary button.days-btn.is-last.on-selected{border-radius:50%}:host .secondary .days.endSelection:nth-child(7n+1):before,:host .secondary .days.between:nth-child(7n+1) button.days-btn,:host .secondary .days.between.is-first-wrap button.days-btn.is-first,:host .secondary button.days-btn.is-first{border-radius:36px 0 0 36px}:host .secondary .startSelection button.days-btn.is-first,:host .secondary .endSelection button.days-btn.is-first,:host .secondary button.days-btn.is-first.on-selected,:host .secondary button.days-btn.is-last.on-selected,:host .secondary .startSelection button.days-btn.is-last,:host .secondary .endSelection button.days-btn.is-last{border-radius:50%}:host .secondary .startSelection.is-last-wrap:before,:host .secondary .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .secondary .endSelection.is-first-wrap:before,:host .secondary .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .secondary .days .on-selected p{color:#fff}:host .secondary .startSelection button.days-btn,:host .secondary .endSelection button.days-btn,:host .secondary .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .secondary .startSelection.endSelection:before{--ion-color-primary: transparent}:host .danger button.days-btn small,:host .danger .days .marked p,:host .danger .days .today p{color:var(--ion-color-danger)}:host .danger .days .today p{font-weight:700}:host .danger .days .today.on-selected p,:host .danger .days .marked.on-selected p{color:#fff}:host .danger .days .on-selected,:host .danger .startSelection button.days-btn,:host .danger .endSelection button.days-btn{background-color:var(--ion-color-danger);color:#fff}:host .danger .startSelection{position:relative}:host .danger .startSelection:before,:host .danger .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .danger .startSelection:before{background-color:var(--ion-color-danger)}:host .danger .startSelection:after{background-color:#fff;opacity:.25}:host .danger .endSelection{position:relative}:host .danger .endSelection:before,:host .danger .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .danger .endSelection:before{background-color:var(--ion-color-danger)}:host .danger .endSelection:after{background-color:#fff;opacity:.25}:host .danger .startSelection.endSelection:after{background-color:transparent}:host .danger .startSelection button.days-btn{border-radius:50%}:host .danger .between button.days-btn{background-color:var(--ion-color-danger);width:100%;border-radius:0;position:relative}:host .danger .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .danger .between button.days-btn p{color:#fff}:host .danger .endSelection button.days-btn{border-radius:50%}:host .danger .endSelection button.days-btn p{color:#fff}:host .danger .days.startSelection:nth-child(7n):before,:host .danger .days.between:nth-child(7n) button.days-btn,:host .danger button.days-btn.is-last{border-radius:0 36px 36px 0}:host .danger .days.startSelection:nth-child(7n):before.on-selected,:host .danger .days.between:nth-child(7n) button.days-btn.on-selected,:host .danger button.days-btn.is-last.on-selected{border-radius:50%}:host .danger .days.endSelection:nth-child(7n+1):before,:host .danger .days.between:nth-child(7n+1) button.days-btn,:host .danger .days.between.is-first-wrap button.days-btn.is-first,:host .danger button.days-btn.is-first{border-radius:36px 0 0 36px}:host .danger .startSelection button.days-btn.is-first,:host .danger .endSelection button.days-btn.is-first,:host .danger button.days-btn.is-first.on-selected,:host .danger button.days-btn.is-last.on-selected,:host .danger .startSelection button.days-btn.is-last,:host .danger .endSelection button.days-btn.is-last{border-radius:50%}:host .danger .startSelection.is-last-wrap:before,:host .danger .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .danger .endSelection.is-first-wrap:before,:host .danger .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .danger .days .on-selected p{color:#fff}:host .danger .startSelection button.days-btn,:host .danger .endSelection button.days-btn,:host .danger .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .danger .startSelection.endSelection:before{--ion-color-primary: transparent}:host .dark button.days-btn small,:host .dark .days .marked p,:host .dark .days .today p{color:var(--ion-color-dark)}:host .dark .days .today p{font-weight:700}:host .dark .days .today.on-selected p,:host .dark .days .marked.on-selected p{color:#fff}:host .dark .days .on-selected,:host .dark .startSelection button.days-btn,:host .dark .endSelection button.days-btn{background-color:var(--ion-color-dark);color:#fff}:host .dark .startSelection{position:relative}:host .dark .startSelection:before,:host .dark .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .dark .startSelection:before{background-color:var(--ion-color-dark)}:host .dark .startSelection:after{background-color:#fff;opacity:.25}:host .dark .endSelection{position:relative}:host .dark .endSelection:before,:host .dark .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .dark .endSelection:before{background-color:var(--ion-color-dark)}:host .dark .endSelection:after{background-color:#fff;opacity:.25}:host .dark .startSelection.endSelection:after{background-color:transparent}:host .dark .startSelection button.days-btn{border-radius:50%}:host .dark .between button.days-btn{background-color:var(--ion-color-dark);width:100%;border-radius:0;position:relative}:host .dark .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .dark .between button.days-btn p{color:#fff}:host .dark .endSelection button.days-btn{border-radius:50%}:host .dark .endSelection button.days-btn p{color:#fff}:host .dark .days.startSelection:nth-child(7n):before,:host .dark .days.between:nth-child(7n) button.days-btn,:host .dark button.days-btn.is-last{border-radius:0 36px 36px 0}:host .dark .days.startSelection:nth-child(7n):before.on-selected,:host .dark .days.between:nth-child(7n) button.days-btn.on-selected,:host .dark button.days-btn.is-last.on-selected{border-radius:50%}:host .dark .days.endSelection:nth-child(7n+1):before,:host .dark .days.between:nth-child(7n+1) button.days-btn,:host .dark .days.between.is-first-wrap button.days-btn.is-first,:host .dark button.days-btn.is-first{border-radius:36px 0 0 36px}:host .dark .startSelection button.days-btn.is-first,:host .dark .endSelection button.days-btn.is-first,:host .dark button.days-btn.is-first.on-selected,:host .dark button.days-btn.is-last.on-selected,:host .dark .startSelection button.days-btn.is-last,:host .dark .endSelection button.days-btn.is-last{border-radius:50%}:host .dark .startSelection.is-last-wrap:before,:host .dark .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .dark .endSelection.is-first-wrap:before,:host .dark .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .dark .days .on-selected p{color:#fff}:host .dark .startSelection button.days-btn,:host .dark .endSelection button.days-btn,:host .dark .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .dark .startSelection.endSelection:before{--ion-color-primary: transparent}:host .light button.days-btn small,:host .light .days .marked p,:host .light .days .today p{color:var(--ion-color-light)}:host .light .days .today p{font-weight:700}:host .light .days .today.on-selected p,:host .light .days .marked.on-selected p{color:#a0a0a0}:host .light .days .on-selected,:host .light .startSelection button.days-btn,:host .light .endSelection button.days-btn{background-color:var(--ion-color-light);color:#a0a0a0}:host .light .startSelection{position:relative}:host .light .startSelection:before,:host .light .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .light .startSelection:before{background-color:var(--ion-color-light)}:host .light .startSelection:after{background-color:#fff;opacity:.25}:host .light .endSelection{position:relative}:host .light .endSelection:before,:host .light .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .light .endSelection:before{background-color:var(--ion-color-light)}:host .light .endSelection:after{background-color:#fff;opacity:.25}:host .light .startSelection.endSelection:after{background-color:transparent}:host .light .startSelection button.days-btn{border-radius:50%}:host .light .between button.days-btn{background-color:var(--ion-color-light);width:100%;border-radius:0;position:relative}:host .light .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .light .between button.days-btn p{color:#a0a0a0}:host .light .endSelection button.days-btn{border-radius:50%}:host .light .endSelection button.days-btn p{color:#a0a0a0}:host .light .days.startSelection:nth-child(7n):before,:host .light .days.between:nth-child(7n) button.days-btn,:host .light button.days-btn.is-last{border-radius:0 36px 36px 0}:host .light .days.startSelection:nth-child(7n):before.on-selected,:host .light .days.between:nth-child(7n) button.days-btn.on-selected,:host .light button.days-btn.is-last.on-selected{border-radius:50%}:host .light .days.endSelection:nth-child(7n+1):before,:host .light .days.between:nth-child(7n+1) button.days-btn,:host .light .days.between.is-first-wrap button.days-btn.is-first,:host .light button.days-btn.is-first{border-radius:36px 0 0 36px}:host .light .startSelection button.days-btn.is-first,:host .light .endSelection button.days-btn.is-first,:host .light button.days-btn.is-first.on-selected,:host .light button.days-btn.is-last.on-selected,:host .light .startSelection button.days-btn.is-last,:host .light .endSelection button.days-btn.is-last{border-radius:50%}:host .light .startSelection.is-last-wrap:before,:host .light .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .light .endSelection.is-first-wrap:before,:host .light .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .light .days .on-selected p{color:#a0a0a0}:host .light .startSelection button.days-btn,:host .light .endSelection button.days-btn,:host .light .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .light .startSelection.endSelection:before{--ion-color-primary: transparent}:host .light .days .today p{color:#565656}:host .cal-color .days .today p{font-weight:700}:host .cal-color .days .today.on-selected p,:host .cal-color .days .marked.on-selected p{color:#fff}:host .cal-color .days .on-selected,:host .cal-color .startSelection button.days-btn,:host .cal-color .endSelection button.days-btn{color:#fff}:host .cal-color .startSelection{position:relative}:host .cal-color .startSelection:before,:host .cal-color .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .cal-color .startSelection:after{background-color:#fff;opacity:.25}:host .cal-color .endSelection{position:relative}:host .cal-color .endSelection:before,:host .cal-color .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .cal-color .endSelection:after{background-color:#fff;opacity:.25}:host .cal-color .startSelection.endSelection:after{background-color:transparent}:host .cal-color .startSelection button.days-btn{border-radius:50%}:host .cal-color .between button.days-btn{width:100%;border-radius:0;position:relative}:host .cal-color .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .cal-color .between button.days-btn p{color:#fff}:host .cal-color .endSelection button.days-btn{border-radius:50%}:host .cal-color .endSelection button.days-btn p{color:#fff}:host .cal-color .days.startSelection:nth-child(7n):before,:host .cal-color .days.between:nth-child(7n) button.days-btn,:host .cal-color button.days-btn.is-last{border-radius:0 36px 36px 0}:host .cal-color .days.startSelection:nth-child(7n):before.on-selected,:host .cal-color .days.between:nth-child(7n) button.days-btn.on-selected,:host .cal-color button.days-btn.is-last.on-selected{border-radius:50%}:host .cal-color .days.endSelection:nth-child(7n+1):before,:host .cal-color .days.between:nth-child(7n+1) button.days-btn,:host .cal-color .days.between.is-first-wrap button.days-btn.is-first,:host .cal-color button.days-btn.is-first{border-radius:36px 0 0 36px}:host .cal-color .startSelection button.days-btn.is-first,:host .cal-color .endSelection button.days-btn.is-first,:host .cal-color button.days-btn.is-first.on-selected,:host .cal-color button.days-btn.is-last.on-selected,:host .cal-color .startSelection button.days-btn.is-last,:host .cal-color .endSelection button.days-btn.is-last{border-radius:50%}:host .cal-color .startSelection.is-last-wrap:before,:host .cal-color .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .cal-color .endSelection.is-first-wrap:before,:host .cal-color .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .cal-color .days .on-selected p{color:#fff}:host .cal-color .startSelection button.days-btn,:host .cal-color .endSelection button.days-btn,:host .cal-color .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .cal-color .startSelection.endSelection:before{--ion-color-primary: transparent}body[data-dark-mode=true] :host button.days-btn p{color:#fff}body[data-dark-mode=true] :host button.days-btn[disabled] p{color:#ffffff80}\n"] }]
        }], function () { return [{ type: i0.ChangeDetectorRef }]; }, { month: [{
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
            }] });
})();

const _c0$1 = ["months"];
function CalendarModal_span_4_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span");
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r0._d.closeLabel);
    }
}
function CalendarModal_ion_icon_5_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "ion-icon", 11);
    }
}
function CalendarModal_ion_row_9_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "ion-row", 12)(1, "ion-col", 13);
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "ion-col", 14);
        i0.ɵɵelement(4, "ion-icon", 15);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "ion-col", 16);
        i0.ɵɵtext(6);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵclassMap("dates-toolbar");
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", ctx_r2._getDayFormatted(ctx_r2.datesTemp[0]) || "Start Date", " ");
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", ctx_r2._getDayFormatted(ctx_r2.datesTemp[1]) || "End Date", " ");
    }
}
function CalendarModal_ng_template_14_Template(rf, ctx) {
    if (rf & 1) {
        const _r9 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 17)(1, "h4", 18);
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "ion-calendar-month", 19);
        i0.ɵɵlistener("change", function CalendarModal_ng_template_14_Template_ion_calendar_month_change_3_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r8.onChange($event)); })("ngModelChange", function CalendarModal_ng_template_14_Template_ion_calendar_month_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r10 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r10.datesTemp = $event); });
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const month_r6 = ctx.$implicit;
        const i_r7 = ctx.index;
        const ctx_r4 = i0.ɵɵnextContext();
        i0.ɵɵattribute("id", "month-" + i_r7);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx_r4._monthFormat(month_r6.original == null ? null : month_r6.original.date));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("month", month_r6)("pickMode", ctx_r4._d.pickMode)("isSaveHistory", ctx_r4._d.isSaveHistory)("id", ctx_r4._d.id)("color", ctx_r4._d.color)("maxMultiDates", ctx_r4._d.maxMultiDates)("ngModel", ctx_r4.datesTemp);
    }
}
function CalendarModal_ion_button_18_span_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "span");
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r11 = i0.ɵɵnextContext(2);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r11._d.doneLabel);
    }
}
function CalendarModal_ion_button_18_ion_icon_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "ion-icon", 22);
    }
}
function CalendarModal_ion_button_18_Template(rf, ctx) {
    if (rf & 1) {
        const _r14 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "ion-button", 20);
        i0.ɵɵlistener("click", function CalendarModal_ion_button_18_Template_ion_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r13.done()); });
        i0.ɵɵtemplate(1, CalendarModal_ion_button_18_span_1_Template, 2, 1, "span", 2);
        i0.ɵɵtemplate(2, CalendarModal_ion_button_18_ion_icon_2_Template, 1, 0, "ion-icon", 21);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r5 = i0.ɵɵnextContext();
        i0.ɵɵproperty("disabled", !ctx_r5.canDone());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r5._d.doneLabel !== "" && !ctx_r5._d.doneIcon);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx_r5._d.doneIcon);
    }
}
const _c1 = [[["", "sub-header", ""]]];
const _c2 = function (a0) { return { "multi-selection": a0 }; };
const _c3 = ["[sub-header]"];
const NUM_OF_MONTHS_TO_CREATE = 3;
class CalendarModal {
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
CalendarModal.ɵfac = function CalendarModal_Factory(t) { return new (t || CalendarModal)(i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1$1.ModalController), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(CalendarService)); };
CalendarModal.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CalendarModal, selectors: [["ion-calendar-modal"]], viewQuery: function CalendarModal_Query(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵviewQuery(IonContent, 7);
            i0.ɵɵviewQuery(_c0$1, 7);
        }
        if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.content = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.monthsEle = _t.first);
        }
    }, hostVars: 2, hostBindings: function CalendarModal_HostBindings(rf, ctx) {
        if (rf & 2) {
            i0.ɵɵclassProp("ion-page", ctx.ionPage);
        }
    }, inputs: { options: "options" }, ngContentSelectors: _c3, decls: 19, vars: 14, consts: [["slot", "secondary"], ["type", "button", "slot", "icon-only", "fill", "clear", 1, "primary", 3, "click"], [4, "ngIf"], ["name", "close", 4, "ngIf"], ["lines", "none", "no-border", "", 3, "class", 4, "ngIf"], [3, "color", "weekArray", "weekStart"], [1, "calendar-page", 3, "scrollEvents", "ngClass", "ionScroll"], ["months", ""], ["ngFor", "", 3, "ngForOf", "ngForTrackBy"], ["threshold", "25%", 3, "ionInfinite"], ["expand", "full", 3, "disabled", "click", 4, "ngIf"], ["name", "close"], ["lines", "none", "no-border", ""], ["size", "4", 1, "start-date", "ion-text-nowrap"], ["size", "4", 1, "ion-text-center"], ["name", "arrow-forward-outline"], ["size", "4", 1, "end-date", "ion-text-right", "ion-text-nowrap"], [1, "month-box"], [1, "month-title"], [3, "month", "pickMode", "isSaveHistory", "id", "color", "maxMultiDates", "ngModel", "change", "ngModelChange"], ["expand", "full", 3, "disabled", "click"], ["name", "checkmark", 4, "ngIf"], ["name", "checkmark"]], template: function CalendarModal_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵprojectionDef(_c1);
            i0.ɵɵelementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-buttons", 0)(3, "ion-button", 1);
            i0.ɵɵlistener("click", function CalendarModal_Template_ion_button_click_3_listener() { return ctx.onCancel(); });
            i0.ɵɵtemplate(4, CalendarModal_span_4_Template, 2, 1, "span", 2);
            i0.ɵɵtemplate(5, CalendarModal_ion_icon_5_Template, 1, 0, "ion-icon", 3);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "ion-title");
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd()();
            i0.ɵɵprojection(8);
            i0.ɵɵtemplate(9, CalendarModal_ion_row_9_Template, 7, 4, "ion-row", 4);
            i0.ɵɵelement(10, "ion-calendar-week", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "ion-content", 6);
            i0.ɵɵlistener("ionScroll", function CalendarModal_Template_ion_content_ionScroll_11_listener($event) { return ctx.onScroll($event); });
            i0.ɵɵelementStart(12, "div", null, 7);
            i0.ɵɵtemplate(14, CalendarModal_ng_template_14_Template, 4, 9, "ng-template", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "ion-infinite-scroll", 9);
            i0.ɵɵlistener("ionInfinite", function CalendarModal_Template_ion_infinite_scroll_ionInfinite_15_listener($event) { return ctx.nextMonth($event); });
            i0.ɵɵelement(16, "ion-infinite-scroll-content");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "ion-footer");
            i0.ɵɵtemplate(18, CalendarModal_ion_button_18_Template, 3, 3, "ion-button", 10);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx._d.closeLabel !== "" && !ctx._d.closeIcon);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx._d.closeIcon);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx._d.title);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx._d.pickMode === "range");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("color", ctx._d.color)("weekArray", ctx._d.weekdays)("weekStart", ctx._d.weekStart);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("scrollEvents", true)("ngClass", i0.ɵɵpureFunction1(12, _c2, ctx._d.pickMode === "multi"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.calendarMonths)("ngForTrackBy", ctx.trackByIndex);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", !ctx._d.autoDone);
        }
    }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf, i1$1.IonButton, i1$1.IonButtons, i1$1.IonCol, i1$1.IonContent, i1$1.IonFooter, i1$1.IonHeader, i1$1.IonIcon, i1$1.IonInfiniteScroll, i1$1.IonInfiniteScrollContent, i1$1.IonRow, i1$1.IonTitle, i1$1.IonToolbar, i4.NgControlStatus, i4.NgModel, CalendarWeekComponent, MonthComponent], styles: ["[_nghost-%COMP%]   ion-select[_ngcontent-%COMP%]{max-width:unset}[_nghost-%COMP%]   ion-select[_ngcontent-%COMP%]   .select-icon[_ngcontent-%COMP%] > .select-icon-inner[_ngcontent-%COMP%], [_nghost-%COMP%]   ion-select[_ngcontent-%COMP%]   .select-text[_ngcontent-%COMP%]{color:#fff!important}[_nghost-%COMP%]   ion-select.select-ios[_ngcontent-%COMP%]{max-width:unset}[_nghost-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-button.md[_ngcontent-%COMP%]{color:var(--ion-color-primary)}[_nghost-%COMP%]   .dates-toolbar[_ngcontent-%COMP%]{--background: transparent;padding:0 1rem}[_nghost-%COMP%]   .dates-toolbar.primary[_ngcontent-%COMP%]{--background: var(--ion-color-primary)}[_nghost-%COMP%]   .dates-toolbar.secondary[_ngcontent-%COMP%]{--background: var(--ion-color-secondary)}[_nghost-%COMP%]   .dates-toolbar.danger[_ngcontent-%COMP%]{--background: var(--ion-color-danger)}[_nghost-%COMP%]   .dates-toolbar.dark[_ngcontent-%COMP%]{--background: var(--ion-color-dark)}[_nghost-%COMP%]   .dates-toolbar.light[_ngcontent-%COMP%]{--background: var(--ion-color-light)}[_nghost-%COMP%]   .dates-toolbar.transparent[_ngcontent-%COMP%]{--background: transparent}[_nghost-%COMP%]   .dates-toolbar.toolbar-md[_ngcontent-%COMP%]{min-height:44px}[_nghost-%COMP%]   .ios.dates-toolbar[_ngcontent-%COMP%]{padding-top:1rem}[_nghost-%COMP%]   .start-date[_ngcontent-%COMP%]{padding-left:.5rem}[_nghost-%COMP%]   .end-date[_ngcontent-%COMP%]{margin-right:-.5rem}[_nghost-%COMP%]   .calendar-page[_ngcontent-%COMP%]{background-color:#fbfbfb}[_nghost-%COMP%]   .month-box[_ngcontent-%COMP%]{display:inline-block;width:100%;padding-bottom:1em}[_nghost-%COMP%]   #month-0[_ngcontent-%COMP%]{padding-top:1rem}[_nghost-%COMP%]   .month-title[_ngcontent-%COMP%]{padding-left:1rem;text-align:left;color:#363749}[_nghost-%COMP%]   h4[_ngcontent-%COMP%]{font-weight:400;font-size:1.1rem;display:block;text-align:center;margin:1rem 0 0;color:#929292}body[data-dark-mode=true]   [_nghost-%COMP%]   .month-title[_ngcontent-%COMP%]{color:#fff}body[data-dark-mode=true]   [_nghost-%COMP%]   .dates-toolbar[_ngcontent-%COMP%]{color:#fff}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CalendarModal, [{
            type: Component,
            args: [{ selector: 'ion-calendar-modal', template: `
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
  `, styles: [":host ion-select{max-width:unset}:host ion-select .select-icon>.select-icon-inner,:host ion-select .select-text{color:#fff!important}:host ion-select.select-ios{max-width:unset}:host ion-toolbar ion-button.md{color:var(--ion-color-primary)}:host .dates-toolbar{--background: transparent;padding:0 1rem}:host .dates-toolbar.primary{--background: var(--ion-color-primary)}:host .dates-toolbar.secondary{--background: var(--ion-color-secondary)}:host .dates-toolbar.danger{--background: var(--ion-color-danger)}:host .dates-toolbar.dark{--background: var(--ion-color-dark)}:host .dates-toolbar.light{--background: var(--ion-color-light)}:host .dates-toolbar.transparent{--background: transparent}:host .dates-toolbar.toolbar-md{min-height:44px}:host .ios.dates-toolbar{padding-top:1rem}:host .start-date{padding-left:.5rem}:host .end-date{margin-right:-.5rem}:host .calendar-page{background-color:#fbfbfb}:host .month-box{display:inline-block;width:100%;padding-bottom:1em}:host #month-0{padding-top:1rem}:host .month-title{padding-left:1rem;text-align:left;color:#363749}:host h4{font-weight:400;font-size:1.1rem;display:block;text-align:center;margin:1rem 0 0;color:#929292}body[data-dark-mode=true] :host .month-title{color:#fff}body[data-dark-mode=true] :host .dates-toolbar{color:#fff}\n"] }]
        }], function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1$1.ModalController }, { type: i0.ChangeDetectorRef }, { type: CalendarService }]; }, { content: [{
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
            }] });
})();

function MonthPickerComponent_div_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r4 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 1)(1, "button", 2);
        i0.ɵɵlistener("click", function MonthPickerComponent_div_1_Template_button_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r4); const i_r2 = restoredCtx.index; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3._onSelect(i_r2)); });
        i0.ɵɵpipe(2, "date");
        i0.ɵɵtext(3);
        i0.ɵɵelementEnd()();
    }
    if (rf & 2) {
        const item_r1 = ctx.$implicit;
        const i_r2 = ctx.index;
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵclassProp("this-month", i_r2 === ctx_r0._thisMonth.getMonth() && (ctx_r0.month.original == null ? null : ctx_r0.month.original.year) === ctx_r0._thisMonth.getFullYear());
        i0.ɵɵadvance(1);
        i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(2, 4, ctx_r0.getDate(i_r2), ctx_r0.MONTH_FORMAT));
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(item_r1);
    }
}
class MonthPickerComponent {
    constructor() {
        this.color = defaults.COLOR;
        this.select = new EventEmitter();
        this._thisMonth = new Date();
        this._monthFormat = defaults.MONTH_FORMAT;
        this.MONTH_FORMAT = 'MMMM';
    }
    set monthFormat(value) {
        if (Array.isArray(value) && value.length === 12) {
            this._monthFormat = value;
        }
    }
    get monthFormat() {
        return this._monthFormat;
    }
    _onSelect(month) {
        this.select.emit(month);
    }
    getDate(month) {
        return new Date(this._thisMonth.getFullYear(), month, 1);
    }
}
MonthPickerComponent.ɵfac = function MonthPickerComponent_Factory(t) { return new (t || MonthPickerComponent)(); };
MonthPickerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MonthPickerComponent, selectors: [["ion-calendar-month-picker"]], inputs: { month: "month", color: "color", monthFormat: "monthFormat" }, outputs: { select: "select" }, decls: 2, vars: 3, consts: [["class", "month-packer-item", 3, "this-month", 4, "ngFor", "ngForOf"], [1, "month-packer-item"], ["type", "button", 3, "click"]], template: function MonthPickerComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵtemplate(1, MonthPickerComponent_div_1_Template, 4, 7, "div", 0);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵclassMap("month-picker " + ctx.color);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx._monthFormat);
        }
    }, dependencies: [i1.NgForOf, i1.DatePipe], styles: ["[_nghost-%COMP%]   .month-picker[_ngcontent-%COMP%]{margin:20px 0;display:inline-block;width:100%}[_nghost-%COMP%]   .month-packer-item[_ngcontent-%COMP%]{width:25%;box-sizing:border-box;float:left;height:50px;padding:5px}[_nghost-%COMP%]   .month-packer-item[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border-radius:32px;width:100%;height:100%;font-size:.9em;background-color:transparent}[_nghost-%COMP%]   .month-picker.primary[_ngcontent-%COMP%]   .month-packer-item.this-month[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px solid var(--ion-color-primary)}[_nghost-%COMP%]   .month-picker.primary[_ngcontent-%COMP%]   .month-packer-item.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:var(--ion-color-primary);color:#fff}[_nghost-%COMP%]   .month-picker.secondary[_ngcontent-%COMP%]   .month-packer-item.this-month[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px solid var(--ion-color-secondary)}[_nghost-%COMP%]   .month-picker.secondary[_ngcontent-%COMP%]   .month-packer-item.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:var(--ion-color-secondary);color:#fff}[_nghost-%COMP%]   .month-picker.danger[_ngcontent-%COMP%]   .month-packer-item.this-month[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px solid var(--ion-color-danger)}[_nghost-%COMP%]   .month-picker.danger[_ngcontent-%COMP%]   .month-packer-item.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:var(--ion-color-danger);color:#fff}[_nghost-%COMP%]   .month-picker.dark[_ngcontent-%COMP%]   .month-packer-item.this-month[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px solid var(--ion-color-dark)}[_nghost-%COMP%]   .month-picker.dark[_ngcontent-%COMP%]   .month-packer-item.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:var(--ion-color-dark);color:#fff}[_nghost-%COMP%]   .month-picker.light[_ngcontent-%COMP%]   .month-packer-item.this-month[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px solid var(--ion-color-light)}[_nghost-%COMP%]   .month-picker.light[_ngcontent-%COMP%]   .month-packer-item.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:var(--ion-color-light);color:#9e9e9e}[_nghost-%COMP%]   .month-picker.transparent[_ngcontent-%COMP%]{background-color:transparent}[_nghost-%COMP%]   .month-picker.transparent[_ngcontent-%COMP%]   .month-packer-item.this-month[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px solid var(--ion-color-light)}[_nghost-%COMP%]   .month-picker.transparent[_ngcontent-%COMP%]   .month-packer-item.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:var(--ion-color-light);color:#9e9e9e}[_nghost-%COMP%]   .month-picker.cal-color[_ngcontent-%COMP%]   .month-packer-item.this-month[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px solid}[_nghost-%COMP%]   .month-picker.cal-color[_ngcontent-%COMP%]   .month-packer-item.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{color:#fff}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MonthPickerComponent, [{
            type: Component,
            args: [{ selector: 'ion-calendar-month-picker', template: `
    <div [class]="'month-picker ' + color">
      <div class="month-packer-item"
           [class.this-month]=" i === _thisMonth.getMonth() && month.original?.year === _thisMonth.getFullYear()"
           *ngFor="let item of _monthFormat; let i = index">
        <button type="button" (click)="_onSelect(i)" [attr.aria-label]="getDate(i) | date:MONTH_FORMAT">{{ item }}</button>
      </div>
    </div>
  `, styles: [":host .month-picker{margin:20px 0;display:inline-block;width:100%}:host .month-packer-item{width:25%;box-sizing:border-box;float:left;height:50px;padding:5px}:host .month-packer-item button{border-radius:32px;width:100%;height:100%;font-size:.9em;background-color:transparent}:host .month-picker.primary .month-packer-item.this-month button{border:1px solid var(--ion-color-primary)}:host .month-picker.primary .month-packer-item.active button{background-color:var(--ion-color-primary);color:#fff}:host .month-picker.secondary .month-packer-item.this-month button{border:1px solid var(--ion-color-secondary)}:host .month-picker.secondary .month-packer-item.active button{background-color:var(--ion-color-secondary);color:#fff}:host .month-picker.danger .month-packer-item.this-month button{border:1px solid var(--ion-color-danger)}:host .month-picker.danger .month-packer-item.active button{background-color:var(--ion-color-danger);color:#fff}:host .month-picker.dark .month-packer-item.this-month button{border:1px solid var(--ion-color-dark)}:host .month-picker.dark .month-packer-item.active button{background-color:var(--ion-color-dark);color:#fff}:host .month-picker.light .month-packer-item.this-month button{border:1px solid var(--ion-color-light)}:host .month-picker.light .month-packer-item.active button{background-color:var(--ion-color-light);color:#9e9e9e}:host .month-picker.transparent{background-color:transparent}:host .month-picker.transparent .month-packer-item.this-month button{border:1px solid var(--ion-color-light)}:host .month-picker.transparent .month-packer-item.active button{background-color:var(--ion-color-light);color:#9e9e9e}:host .month-picker.cal-color .month-packer-item.this-month button{border:1px solid}:host .month-picker.cal-color .month-packer-item.active button{color:#fff}\n"] }]
        }], function () { return []; }, { month: [{
                type: Input
            }], color: [{
                type: Input
            }], select: [{
                type: Output
            }], monthFormat: [{
                type: Input
            }] });
})();

function CalendarComponent_ng_template_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r8 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "ion-button", 5);
        i0.ɵɵlistener("click", function CalendarComponent_ng_template_1_Template_ion_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.switchView()); });
        i0.ɵɵpipe(1, "date");
        i0.ɵɵtext(2);
        i0.ɵɵelement(3, "ion-icon", 6);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(1, 3, ctx_r0.getDate(ctx_r0.monthOpt == null ? null : ctx_r0.monthOpt.original == null ? null : ctx_r0.monthOpt.original.time), ctx_r0.MONTH_DATE_FORMAT));
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", ctx_r0._monthFormat(ctx_r0.monthOpt.original.time), " ");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("name", ctx_r0._view === "days" ? "md-arrow-dropdown" : "md-arrow-dropup");
    }
}
function CalendarComponent_ng_template_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 7);
        i0.ɵɵpipe(1, "date");
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(1, 2, ctx_r2.getDate(ctx_r2.monthOpt.original.time), ctx_r2.MONTH_DATE_FORMAT));
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", ctx_r2._monthFormat(ctx_r2.monthOpt.original.time), " ");
    }
}
function CalendarComponent_ng_template_4_Template(rf, ctx) {
    if (rf & 1) {
        const _r10 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "ion-button", 8);
        i0.ɵɵlistener("click", function CalendarComponent_ng_template_4_Template_ion_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.prev()); });
        i0.ɵɵelement(1, "ion-icon", 9);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "ion-button", 10);
        i0.ɵɵlistener("click", function CalendarComponent_ng_template_4_Template_ion_button_click_2_listener() { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.next()); });
        i0.ɵɵelement(3, "ion-icon", 11);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r3 = i0.ɵɵnextContext();
        i0.ɵɵproperty("disabled", !ctx_r3.canBack());
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", !ctx_r3.canNext());
    }
}
function CalendarComponent_ng_template_5_Template(rf, ctx) {
    if (rf & 1) {
        const _r13 = i0.ɵɵgetCurrentView();
        i0.ɵɵelement(0, "ion-calendar-week", 12);
        i0.ɵɵelementStart(1, "ion-calendar-month", 13);
        i0.ɵɵlistener("ngModelChange", function CalendarComponent_ng_template_5_Template_ion_calendar_month_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r12._calendarMonthValue = $event); })("change", function CalendarComponent_ng_template_5_Template_ion_calendar_month_change_1_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r14 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r14.onChanged($event)); })("swipe", function CalendarComponent_ng_template_5_Template_ion_calendar_month_swipe_1_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r15 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r15.swipeEvent($event)); })("select", function CalendarComponent_ng_template_5_Template_ion_calendar_month_select_1_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r16 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r16.select.emit($event)); })("selectStart", function CalendarComponent_ng_template_5_Template_ion_calendar_month_selectStart_1_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r17 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r17.selectStart.emit($event)); })("selectEnd", function CalendarComponent_ng_template_5_Template_ion_calendar_month_selectEnd_1_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r18 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r18.selectEnd.emit($event)); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r4 = i0.ɵɵnextContext();
        i0.ɵɵproperty("weekArray", ctx_r4._d.weekdays)("weekStart", ctx_r4._d.weekStart);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx_r4._calendarMonthValue)("month", ctx_r4.monthOpt)("readonly", ctx_r4.readonly)("pickMode", ctx_r4._d.pickMode)("color", ctx_r4._d.color);
    }
}
const _c0 = function () { return []; };
function CalendarComponent_ng_template_6_Template(rf, ctx) {
    if (rf & 1) {
        const _r20 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "ion-calendar-month-picker", 14);
        i0.ɵɵlistener("select", function CalendarComponent_ng_template_6_Template_ion_calendar_month_picker_select_0_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r19 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r19.monthOnSelect($event)); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r6 = i0.ɵɵnextContext();
        i0.ɵɵproperty("color", ctx_r6._d.color ? ctx_r6._d.color : "")("monthFormat", ctx_r6._options["monthPickerFormat"] && ctx_r6._options["monthPickerFormat"].length > 0 ? ctx_r6._options["monthPickerFormat"] : i0.ɵɵpureFunction0(3, _c0))("month", ctx_r6.monthOpt);
    }
}
const ION_CAL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CalendarComponent),
    multi: true,
};
class CalendarComponent {
    constructor(calSvc) {
        this.calSvc = calSvc;
        this._view = 'days';
        this._calendarMonthValue = [null, null];
        this._showToggleButtons = true;
        this._showMonthPicker = true;
        this.format = defaults.DATE_FORMAT;
        this.type = 'string';
        this.readonly = false;
        this.change = new EventEmitter();
        this.monthChange = new EventEmitter();
        this.select = new EventEmitter();
        this.selectStart = new EventEmitter();
        this.selectEnd = new EventEmitter();
        this.MONTH_DATE_FORMAT = 'MMMM yyyy';
        this._onChanged = () => { };
        this._onTouched = () => { };
    }
    get showToggleButtons() {
        return this._showToggleButtons;
    }
    set showToggleButtons(value) {
        this._showToggleButtons = value;
    }
    get showMonthPicker() {
        return this._showMonthPicker;
    }
    set showMonthPicker(value) {
        this._showMonthPicker = value;
    }
    set options(value) {
        this._options = value;
        this.initOpt();
        if (this.monthOpt && this.monthOpt.original) {
            this.monthOpt = this.createMonth(this.monthOpt.original.time);
        }
    }
    get options() {
        return this._options;
    }
    ngOnInit() {
        this.initOpt();
        this.monthOpt = this.createMonth(new Date().getTime());
    }
    getViewDate() {
        return this._handleType(this.monthOpt.original.time);
    }
    getDate(date) {
        return new Date(date);
    }
    setViewDate(value) {
        this.monthOpt = this.createMonth(this._payloadToTimeNumber(value));
    }
    switchView() {
        this._view = this._view === 'days' ? 'month' : 'days';
    }
    prev() {
        if (this._view === 'days') {
            this.backMonth();
        }
        else {
            this.prevYear();
        }
    }
    next() {
        if (this._view === 'days') {
            this.nextMonth();
        }
        else {
            this.nextYear();
        }
    }
    prevYear() {
        if (moment(this.monthOpt.original.time).year() === 1970)
            return;
        const backTime = moment(this.monthOpt.original.time)
            .subtract(1, 'year')
            .valueOf();
        this.monthOpt = this.createMonth(backTime);
    }
    nextYear() {
        const nextTime = moment(this.monthOpt.original.time)
            .add(1, 'year')
            .valueOf();
        this.monthOpt = this.createMonth(nextTime);
    }
    nextMonth() {
        const nextTime = moment(this.monthOpt.original.time)
            .add(1, 'months')
            .valueOf();
        this.monthChange.emit({
            oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
            newMonth: this.calSvc.multiFormat(nextTime),
        });
        this.monthOpt = this.createMonth(nextTime);
    }
    canNext() {
        if (!this._d.to || this._view !== 'days')
            return true;
        return this.monthOpt.original.time < moment(this._d.to).valueOf();
    }
    backMonth() {
        const backTime = moment(this.monthOpt.original.time)
            .subtract(1, 'months')
            .valueOf();
        this.monthChange.emit({
            oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
            newMonth: this.calSvc.multiFormat(backTime),
        });
        this.monthOpt = this.createMonth(backTime);
    }
    canBack() {
        if (!this._d.from || this._view !== 'days')
            return true;
        return this.monthOpt.original.time > moment(this._d.from).valueOf();
    }
    monthOnSelect(month) {
        this._view = 'days';
        const newMonth = moment(this.monthOpt.original.time)
            .month(month)
            .valueOf();
        this.monthChange.emit({
            oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
            newMonth: this.calSvc.multiFormat(newMonth),
        });
        this.monthOpt = this.createMonth(newMonth);
    }
    onChanged($event) {
        switch (this._d.pickMode) {
            case pickModes.SINGLE:
                const date = this._handleType($event[0].time);
                this._onChanged(date);
                this.change.emit(date);
                break;
            case pickModes.RANGE:
                if ($event[0] && $event[1]) {
                    const rangeDate = {
                        from: this._handleType($event[0].time),
                        to: this._handleType($event[1].time),
                    };
                    this._onChanged(rangeDate);
                    this.change.emit(rangeDate);
                }
                break;
            case pickModes.MULTI:
                const dates = [];
                for (let i = 0; i < $event.length; i++) {
                    if ($event[i] && $event[i].time) {
                        const pushData = this._handleType($event[i].time);
                        dates.push(pushData);
                    }
                }
                this._onChanged(dates);
                this.change.emit(dates);
                break;
            default:
        }
    }
    swipeEvent($event) {
        const isNext = $event.deltaX < 0;
        if (isNext && this.canNext()) {
            this.nextMonth();
        }
        else if (!isNext && this.canBack()) {
            this.backMonth();
        }
    }
    _payloadToTimeNumber(value) {
        let date;
        if (this.type === 'string') {
            date = moment(value, this.format);
        }
        else {
            date = moment(value);
        }
        return date.valueOf();
    }
    _monthFormat(date) {
        return moment(date).format(this._d.monthFormat.replace(/y/g, 'Y'));
    }
    initOpt() {
        if (this._options && typeof this._options.showToggleButtons === 'boolean') {
            this.showToggleButtons = this._options.showToggleButtons;
        }
        if (this._options && typeof this._options.showMonthPicker === 'boolean') {
            this.showMonthPicker = this._options.showMonthPicker;
            if (this._view !== 'days' && !this.showMonthPicker) {
                this._view = 'days';
            }
        }
        this._d = this.calSvc.safeOpt(this._options || {});
    }
    createMonth(date) {
        return this.calSvc.createMonthsByPeriod(date, 1, this._d)[0];
    }
    _createCalendarDay(value) {
        return this.calSvc.createCalendarDay(this._payloadToTimeNumber(value), this._d);
    }
    _handleType(value) {
        const date = moment(value);
        switch (this.type) {
            case 'string':
                return date.format(this.format);
            case 'js-date':
                return date.toDate();
            case 'moment':
                return date;
            case 'time':
                return date.valueOf();
            case 'object':
                return date.toObject();
            default:
                return date;
        }
    }
    writeValue(obj) {
        this._writeValue(obj);
        if (obj) {
            if (this._calendarMonthValue[0]) {
                this.monthOpt = this.createMonth(this._calendarMonthValue[0].time);
            }
            else {
                this.monthOpt = this.createMonth(new Date().getTime());
            }
        }
    }
    registerOnChange(fn) {
        this._onChanged = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    _writeValue(value) {
        if (!value) {
            this._calendarMonthValue = [null, null];
            return;
        }
        switch (this._d.pickMode) {
            case 'single':
                this._calendarMonthValue[0] = this._createCalendarDay(value);
                break;
            case 'range':
                if (value.from) {
                    this._calendarMonthValue[0] = value.from ? this._createCalendarDay(value.from) : null;
                }
                if (value.to) {
                    this._calendarMonthValue[1] = value.to ? this._createCalendarDay(value.to) : null;
                }
                break;
            case 'multi':
                if (Array.isArray(value)) {
                    this._calendarMonthValue = value.map(e => {
                        return this._createCalendarDay(e);
                    });
                }
                else {
                    this._calendarMonthValue = [null, null];
                }
                break;
            default:
        }
    }
}
CalendarComponent.ɵfac = function CalendarComponent_Factory(t) { return new (t || CalendarComponent)(i0.ɵɵdirectiveInject(CalendarService)); };
CalendarComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CalendarComponent, selectors: [["ion-calendar"]], inputs: { format: "format", type: "type", readonly: "readonly", options: "options" }, outputs: { change: "change", monthChange: "monthChange", select: "select", selectStart: "selectStart", selectEnd: "selectEnd" }, features: [i0.ɵɵProvidersFeature([ION_CAL_VALUE_ACCESSOR])], decls: 8, vars: 5, consts: [[1, "title"], [3, "ngIf", "ngIfElse"], ["title", ""], [3, "ngIf"], ["monthPicker", ""], ["type", "button", "fill", "clear", 1, "switch-btn", 3, "click"], [1, "arrow-dropdown", 3, "name"], [1, "switch-btn"], ["type", "button", "fill", "clear", 1, "back", 3, "disabled", "click"], ["slot", "icon-only", "size", "small", "name", "ios-arrow-back"], ["type", "button", "fill", "clear", 1, "forward", 3, "disabled", "click"], ["slot", "icon-only", "size", "small", "name", "ios-arrow-forward"], ["color", "transparent", 3, "weekArray", "weekStart"], [1, "component-mode", 3, "ngModel", "month", "readonly", "pickMode", "color", "ngModelChange", "change", "swipe", "select", "selectStart", "selectEnd"], [3, "color", "monthFormat", "month", "select"]], template: function CalendarComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, CalendarComponent_ng_template_1_Template, 4, 6, "ng-template", 1);
            i0.ɵɵtemplate(2, CalendarComponent_ng_template_2_Template, 3, 5, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(4, CalendarComponent_ng_template_4_Template, 4, 2, "ng-template", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, CalendarComponent_ng_template_5_Template, 2, 7, "ng-template", 1);
            i0.ɵɵtemplate(6, CalendarComponent_ng_template_6_Template, 1, 4, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
            const _r1 = i0.ɵɵreference(3);
            const _r5 = i0.ɵɵreference(7);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx._showMonthPicker)("ngIfElse", _r1);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx._showToggleButtons);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx._view === "days")("ngIfElse", _r5);
        }
    }, dependencies: [i1.NgIf, i1$1.IonButton, i1$1.IonIcon, i4.NgControlStatus, i4.NgModel, CalendarWeekComponent, MonthComponent, MonthPickerComponent, i1.DatePipe], styles: ["[_nghost-%COMP%]{padding:10px 20px;box-sizing:border-box;display:inline-block;background-color:#fff;width:100%}[_nghost-%COMP%]   .title[_ngcontent-%COMP%]{padding:0 40px;overflow:hidden}[_nghost-%COMP%]   .title[_ngcontent-%COMP%]   .back[_ngcontent-%COMP%], [_nghost-%COMP%]   .title[_ngcontent-%COMP%]   .forward[_ngcontent-%COMP%], [_nghost-%COMP%]   .title[_ngcontent-%COMP%]   .switch-btn[_ngcontent-%COMP%]{display:block;position:relative;float:left;min-height:32px;margin:0;padding:0;--padding-start: 0;--padding-end: 0;font-size:15px}[_nghost-%COMP%]   .title[_ngcontent-%COMP%]   .back[_ngcontent-%COMP%], [_nghost-%COMP%]   .title[_ngcontent-%COMP%]   .forward[_ngcontent-%COMP%]{color:#757575}[_nghost-%COMP%]   .title[_ngcontent-%COMP%]   .back[_ngcontent-%COMP%]{margin-left:-100%;left:-40px;width:40px}[_nghost-%COMP%]   .title[_ngcontent-%COMP%]   .forward[_ngcontent-%COMP%]{margin-left:-40px;right:-40px;width:40px}[_nghost-%COMP%]   .title[_ngcontent-%COMP%]   .switch-btn[_ngcontent-%COMP%]{--margin-top: 0;--margin-bottom: 0;--margin-start: auto;--margin-end: auto;width:100%;text-align:center;line-height:32px;color:#757575}[_nghost-%COMP%]   .title[_ngcontent-%COMP%]   .switch-btn[_ngcontent-%COMP%]   .arrow-dropdown[_ngcontent-%COMP%]{margin-left:5px}[_nghost-%COMP%]   .days.between[_ngcontent-%COMP%]   .days-btn.is-last[_ngcontent-%COMP%], [_nghost-%COMP%]   .days.between[_ngcontent-%COMP%]   .days-btn.is-first[_ngcontent-%COMP%]{border-radius:0}[_nghost-%COMP%]   .component-mode[_ngcontent-%COMP%]   .days.startSelection.is-last-wrap[_ngcontent-%COMP%]:after{border-radius:0}[_nghost-%COMP%]   .component-mode[_ngcontent-%COMP%]   .days.endSelection.is-first-wrap[_ngcontent-%COMP%]:after{border-radius:0}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CalendarComponent, [{
            type: Component,
            args: [{ selector: 'ion-calendar', providers: [ION_CAL_VALUE_ACCESSOR], template: `
    <div class="title">
      <ng-template [ngIf]="_showMonthPicker" [ngIfElse]="title">
        <ion-button type="button"
                    fill="clear"
                    class="switch-btn"
                    [attr.aria-label]="getDate(monthOpt?.original?.time) | date:MONTH_DATE_FORMAT"
                    (click)="switchView()">
          {{ _monthFormat(monthOpt.original.time) }}
          <ion-icon class="arrow-dropdown"
                    [name]="_view === 'days' ? 'md-arrow-dropdown' : 'md-arrow-dropup'"></ion-icon>
        </ion-button>
      </ng-template>
      <ng-template #title>
        <div class="switch-btn"
             [attr.aria-label]="getDate(monthOpt.original.time) | date:MONTH_DATE_FORMAT">
          {{ _monthFormat(monthOpt.original.time) }}
        </div>
      </ng-template>
      <ng-template [ngIf]="_showToggleButtons">
        <ion-button type="button" fill="clear" class="back" [disabled]="!canBack()" (click)="prev()">
          <ion-icon slot="icon-only" size="small" name="ios-arrow-back"></ion-icon>
        </ion-button>
        <ion-button type="button" fill="clear" class="forward" [disabled]="!canNext()" (click)="next()">
          <ion-icon slot="icon-only" size="small" name="ios-arrow-forward"></ion-icon>
        </ion-button>
      </ng-template>
    </div>
    <ng-template [ngIf]="_view === 'days'" [ngIfElse]="monthPicker">
      <ion-calendar-week color="transparent"
                         [weekArray]="_d.weekdays"
                         [weekStart]="_d.weekStart">
      </ion-calendar-week>

      <ion-calendar-month class="component-mode"
                          [(ngModel)]="_calendarMonthValue"
                          [month]="monthOpt"
                          [readonly]="readonly"
                          (change)="onChanged($event)"
                          (swipe)="swipeEvent($event)"
                          (select)="select.emit($event)"
                          (selectStart)="selectStart.emit($event)"
                          (selectEnd)="selectEnd.emit($event)"
                          [pickMode]="_d.pickMode"
                          [color]="_d.color">
      </ion-calendar-month>
    </ng-template>

    <ng-template #monthPicker>
      <ion-calendar-month-picker [color]="_d.color ? _d.color : ''"
                                 [monthFormat]="_options['monthPickerFormat'] && _options['monthPickerFormat'].length > 0 ? _options['monthPickerFormat'] : []  "
                                 (select)="monthOnSelect($event)"
                                 [month]="monthOpt">
      </ion-calendar-month-picker>
    </ng-template>
  `, styles: [":host{padding:10px 20px;box-sizing:border-box;display:inline-block;background-color:#fff;width:100%}:host .title{padding:0 40px;overflow:hidden}:host .title .back,:host .title .forward,:host .title .switch-btn{display:block;position:relative;float:left;min-height:32px;margin:0;padding:0;--padding-start: 0;--padding-end: 0;font-size:15px}:host .title .back,:host .title .forward{color:#757575}:host .title .back{margin-left:-100%;left:-40px;width:40px}:host .title .forward{margin-left:-40px;right:-40px;width:40px}:host .title .switch-btn{--margin-top: 0;--margin-bottom: 0;--margin-start: auto;--margin-end: auto;width:100%;text-align:center;line-height:32px;color:#757575}:host .title .switch-btn .arrow-dropdown{margin-left:5px}:host .days.between .days-btn.is-last,:host .days.between .days-btn.is-first{border-radius:0}:host .component-mode .days.startSelection.is-last-wrap:after{border-radius:0}:host .component-mode .days.endSelection.is-first-wrap:after{border-radius:0}\n"] }]
        }], function () { return [{ type: CalendarService }]; }, { format: [{
                type: Input
            }], type: [{
                type: Input
            }], readonly: [{
                type: Input
            }], change: [{
                type: Output
            }], monthChange: [{
                type: Output
            }], select: [{
                type: Output
            }], selectStart: [{
                type: Output
            }], selectEnd: [{
                type: Output
            }], options: [{
                type: Input
            }] });
})();

class CalendarController {
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
            .create(Object.assign({ component: CalendarModal, componentProps: {
                options,
            } }, modalOptions))
            .then((calendarModal) => {
            calendarModal.present();
            return calendarModal.onDidDismiss().then((event) => {
                return event.data ? Promise.resolve(event.data) : Promise.reject('cancelled');
            });
        });
    }
}
CalendarController.ɵfac = function CalendarController_Factory(t) { return new (t || CalendarController)(i0.ɵɵinject(i1$1.ModalController), i0.ɵɵinject(CalendarService)); };
CalendarController.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CalendarController, factory: CalendarController.ɵfac });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CalendarController, [{
            type: Injectable
        }], function () { return [{ type: i1$1.ModalController }, { type: CalendarService }]; }, null);
})();

const CALENDAR_COMPONENTS = [
    CalendarModal,
    CalendarWeekComponent,
    MonthComponent,
    CalendarComponent,
    MonthPickerComponent
];

function calendarController(modalCtrl, calSvc) {
    return new CalendarController(modalCtrl, calSvc);
}
class CalendarModule {
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
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CalendarModule, [{
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
        }], null, null);
})();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CalendarModule, { declarations: [CalendarModal, CalendarWeekComponent, MonthComponent, CalendarComponent, MonthPickerComponent], imports: [CommonModule, IonicModule, FormsModule], exports: [CalendarModal, CalendarWeekComponent, MonthComponent, CalendarComponent, MonthPickerComponent] }); })();

/*
 * Public API Surface of ion-calendar
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CalendarComponent, CalendarComponentMonthChange, CalendarController, CalendarModal, CalendarModule, CalendarMonth, CalendarResult, CalendarWeekComponent, DEFAULT_CALENDAR_OPTIONS, MonthComponent, MonthPickerComponent };
//# sourceMappingURL=ion2-calendar.mjs.map
