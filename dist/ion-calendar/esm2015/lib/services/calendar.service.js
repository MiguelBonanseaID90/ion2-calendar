import { Inject, Injectable, Optional } from '@angular/core';
import moment from 'moment';
import { defaults, pickModes } from '../config';
import { DEFAULT_CALENDAR_OPTIONS } from './calendar-options.provider';
import * as i0 from "@angular/core";
const isBoolean = (input) => input === true || input === false;
export class CalendarService {
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
CalendarService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: CalendarService, deps: [{ token: DEFAULT_CALENDAR_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
CalendarService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: CalendarService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: CalendarService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DEFAULT_CALENDAR_OPTIONS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2VydmljZXMvY2FsZW5kYXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBVTVCLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2hELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQUV2RSxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDO0FBR3BFLE1BQU0sT0FBTyxlQUFlO0lBRzFCLFlBQTBELFdBQWlDO1FBQ3pGLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDZCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxPQUFPLENBQUMsa0JBQXVCLEVBQUU7UUFDL0IsTUFBTSxhQUFhLEdBQWEsRUFBRSxDQUFDO1FBQ25DLE1BQU0sV0FBVyxHQUFnQixFQUFFLENBQUM7UUFDcEMsSUFBSSxFQUNGLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxFQUNqQixFQUFFLEdBQUcsQ0FBQyxFQUNOLFNBQVMsR0FBRyxDQUFDLEVBQ2IsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQ3hCLEVBQUUsR0FBRyxFQUFFLEVBQ1AsUUFBUSxHQUFHLEVBQUUsRUFDYixVQUFVLEdBQUcsUUFBUSxFQUNyQixTQUFTLEdBQUcsTUFBTSxFQUNsQixXQUFXLEdBQUcsVUFBVSxFQUN4QixLQUFLLEdBQUcsVUFBVSxFQUNsQixZQUFZLEdBQUcsRUFBRSxF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QUFDLE9BQU8sRUFBRTtZQUN2QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNwQixPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN6QixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQzVDLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ3JCLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztZQUMzQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRTtTQUNyQixDQUFDO0lBQ0osQ0FBQzs7NkdBaFFVLGVBQWUsa0JBR00sd0JBQXdCO2lIQUg3QyxlQUFlOzRGQUFmLGVBQWU7a0JBRDNCLFVBQVU7OzBCQUlJLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQge1xuICBDYWxlbmRhck9yaWdpbmFsLFxuICBDYWxlbmRhckRheSxcbiAgQ2FsZW5kYXJNb250aCxcbiAgQ2FsZW5kYXJNb2RhbE9wdGlvbnMsXG4gIENhbGVuZGFyUmVzdWx0LFxuICBEYXlDb25maWcsXG59IGZyb20gJy4uL2NhbGVuZGFyLm1vZGVsJztcbmltcG9ydCB7IGRlZmF1bHRzLCBwaWNrTW9kZXMgfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHsgREVGQVVMVF9DQUxFTkRBUl9PUFRJT05TIH0gZnJvbSAnLi9jYWxlbmRhci1vcHRpb25zLnByb3ZpZGVyJztcblxuY29uc3QgaXNCb29sZWFuID0gKGlucHV0OiBhbnkpID0+IGlucHV0ID09PSB0cnVlIHx8IGlucHV0ID09PSBmYWxzZTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyU2VydmljZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVmYXVsdE9wdHM6IENhbGVuZGFyTW9kYWxPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoREVGQVVMVF9DQUxFTkRBUl9PUFRJT05TKSBkZWZhdWx0T3B0czogQ2FsZW5kYXJNb2RhbE9wdGlvbnMpIHtcbiAgICB0aGlzLmRlZmF1bHRPcHRzID0gZGVmYXVsdE9wdHM7XG4gIH1cblxuICBnZXQgREVGQVVMVF9TVEVQKCkge1xuICAgIHJldHVybiAxMjtcbiAgfVxuXG4gIHNhZmVPcHQoY2FsZW5kYXJPcHRpb25zOiBhbnkgPSB7fSk6IENhbGVuZGFyTW9kYWxPcHRpb25zIHtcbiAgICBjb25zdCBfZGlzYWJsZVdlZWtzOiBudW1iZXJbXSA9IFtdO1xuICAgIGNvbnN0IF9kYXlzQ29uZmlnOiBEYXlDb25maWdbXSA9IFtdO1xuICAgIGxldCB7XG4gICAgICBmcm9tID0gbmV3IERhdGUoKSxcbiAgICAgIHRvID0gMCxcbiAgICAgIHdlZWtTdGFydCA9IDAsXG4gICAgICBzdGVwID0gdGhpcy5ERUZBVUxUX1NURVAsXG4gICAgICBpZCA9ICcnLFxuICAgICAgY3NzQ2xhc3MgPSAnJyxcbiAgICAgIGNsb3NlTGFiZWwgPSAnQ0FOQ0VMJyxcbiAgICAgIGRvbmVMYWJlbCA9ICdET05FJyxcbiAgICAgIG1vbnRoRm9ybWF0ID0gJ01NTSBZWVlZJyxcbiAgICAgIHRpdGxlID0gJ0NBTEVOREFSJyxcbiAgICAgIGRlZmF1bHRUaXRsZSA9ICcnLFxuICAgICAgZGVmYXVsdFN1YnRpdGxlID0gJycsXG4gICAgICBhdXRvRG9uZSA9IGZhbHNlLFxuICAgICAgY2FuQmFja3dhcmRzU2VsZWN0ZWQgPSBmYWxzZSxcbiAgICAgIGNsb3NlSWNvbiA9IGZhbHNlLFxuICAgICAgZG9uZUljb24gPSBmYWxzZSxcbiAgICAgIHNob3dZZWFyUGlja2VyID0gZmFsc2UsXG4gICAgICBpc1NhdmVIaXN0b3J5ID0gZmFsc2UsXG4gICAgICBwaWNrTW9kZSA9IHBpY2tNb2Rlcy5TSU5HTEUsXG4gICAgICBjb2xvciA9IGRlZmF1bHRzLkNPTE9SLFxuICAgICAgd2Vla2RheXMgPSBkZWZhdWx0cy5XRUVLU19GT1JNQVQsXG4gICAgICBkYXlzQ29uZmlnID0gX2RheXNDb25maWcsXG4gICAgICBkaXNhYmxlV2Vla3MgPSBfZGlzYWJsZVdlZWtzLFxuICAgICAgc2hvd0FkamFjZW50TW9udGhEYXkgPSB0cnVlLFxuICAgICAgZGVmYXVsdEVuZERhdGVUb1N0YXJ0RGF0ZSA9IGZhbHNlLFxuICAgICAgY2xlYXJMYWJlbCA9IG51bGwsXG4gICAgICBtYXhNdWx0aURhdGVzID0gbnVsbFxuICAgIH0gPSB7IC4uLnRoaXMuZGVmYXVsdE9wdHMsIC4uLmNhbGVuZGFyT3B0aW9ucyB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkLFxuICAgICAgZnJvbSxcbiAgICAgIHRvLFxuICAgICAgcGlja01vZGUsXG4gICAgICBhdXRvRG9uZSxcbiAgICAgIGNvbG9yLFxuICAgICAgY3NzQ2xhc3MsXG4gICAgICB3ZWVrU3RhcnQsXG4gICAgICBjbG9zZUxhYmVsLFxuICAgICAgY2xvc2VJY29uLFxuICAgICAgZG9uZUxhYmVsLFxuICAgICAgZG9uZUljb24sXG4gICAgICBjYW5CYWNrd2FyZHNTZWxlY3RlZCxcbiAgICAgIGlzU2F2ZUhpc3RvcnksXG4gICAgICBkaXNhYmxlV2Vla3MsXG4gICAgICBtb250aEZvcm1hdCxcbiAgICAgIHRpdGxlLFxuICAgICAgd2Vla2RheXMsXG4gICAgICBkYXlzQ29uZmlnLFxuICAgICAgc3RlcCxcbiAgICAgIHNob3dZZWFyUGlja2VyLFxuICAgICAgZGVmYXVsdFRpdGxlLFxuICAgICAgZGVmYXVsdFN1YnRpdGxlLFxuICAgICAgZGVmYXVsdFNjcm9sbFRvOiBjYWxlbmRhck9wdGlvbnMuZGVmYXVsdFNjcm9sbFRvIHx8IGZyb20sXG4gICAgICBkZWZhdWx0RGF0ZTogY2FsZW5kYXJPcHRpb25zLmRlZmF1bHREYXRlIHx8IG51bGwsXG4gICAgICBkZWZhdWx0RGF0ZXM6IGNhbGVuZGFyT3B0aW9ucy5kZWZhdWx0RGF0ZXMgfHwgbnVsbCxcbiAgICAgIGRlZmF1bHREYXRlUmFuZ2U6IGNhbGVuZGFyT3B0aW9ucy5kZWZhdWx0RGF0ZVJhbmdlIHx8IG51bGwsXG4gICAgICBzaG93QWRqYWNlbnRNb250aERheSxcbiAgICAgIGRlZmF1bHRFbmREYXRlVG9TdGFydERhdGUsXG4gICAgICBjbGVhckxhYmVsLFxuICAgICAgbWF4TXVsdGlEYXRlc1xuICAgIH07XG4gIH1cblxuICBjcmVhdGVPcmlnaW5hbENhbGVuZGFyKHRpbWU6IG51bWJlcik6IENhbGVuZGFyT3JpZ2luYWwge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lKTtcbiAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgIGNvbnN0IGZpcnN0V2VlayA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxKS5nZXREYXkoKTtcbiAgICBjb25zdCBob3dNYW55RGF5cyA9IG1vbWVudCh0aW1lKS5kYXlzSW5Nb250aCgpO1xuICAgIHJldHVybiB7XG4gICAgICB5ZWFyLFxuICAgICAgbW9udGgsXG4gICAgICBmaXJzdFdlZWssXG4gICAgICBob3dNYW55RGF5cyxcbiAgICAgIHRpbWU6IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAxKS5nZXRUaW1lKCksXG4gICAgICBkYXRlOiBuZXcgRGF0ZSh0aW1lKSxcbiAgICB9O1xuICB9XG5cbiAgZmluZERheUNvbmZpZyhkYXk6IGFueSwgb3B0OiBhbnkpOiBhbnkge1xuICAgIGlmICghb3B0LmRheXNDb25maWcgJiYgIG9wdC5kYXlzQ29uZmlnLmxlbmd0aCA8PSAwKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gb3B0LmRheXNDb25maWcuZmluZCgobjogeyBkYXRlOiBhbnk7IH0pID0+IGRheS5pc1NhbWUobi5kYXRlLCAnZGF5JykpO1xuICB9XG5cbiAgY3JlYXRlQ2FsZW5kYXJEYXkodGltZTogbnVtYmVyLCBvcHQ6IENhbGVuZGFyTW9kYWxPcHRpb25zLCBtb250aD86IG51bWJlcik6IENhbGVuZGFyRGF5IHtcbiAgICBsZXQgX3RpbWUgPSBtb21lbnQodGltZSk7XG4gICAgbGV0IGRhdGUgPSBtb21lbnQodGltZSk7XG4gICAgbGV0IGlzVG9kYXkgPSBtb21lbnQoKS5pc1NhbWUoX3RpbWUsICdkYXlzJyk7XG4gICAgbGV0IGRheUNvbmZpZyA9IHRoaXMuZmluZERheUNvbmZpZyhfdGltZSwgb3B0KTtcbiAgICBsZXQgX3JhbmdlQmVnID0gbW9tZW50KG9wdC5mcm9tKS52YWx1ZU9mKCk7XG4gICAgbGV0IF9yYW5nZUVuZCA9IG1vbWVudChvcHQudG8pLnZhbHVlT2YoKTtcbiAgICBsZXQgaXNCZXR3ZWVuID0gdHJ1ZTtcbiAgICBsZXQgZGlzYWJsZVdlZSA9IG9wdD8uZGlzYWJsZVdlZWtzPy5pbmRleE9mKF90aW1lLnRvRGF0ZSgpLmdldERheSgpKSAhPT0gLTE7XG4gICAgaWYgKF9yYW5nZUJlZyA+IDAgJiYgX3JhbmdlRW5kID4gMCkge1xuICAgICAgaWYgKCFvcHQuY2FuQmFja3dhcmRzU2VsZWN0ZWQpIHtcbiAgICAgICAgaXNCZXR3ZWVuID0gIV90aW1lLmlzQmV0d2VlbihfcmFuZ2VCZWcsIF9yYW5nZUVuZCwgJ2RheXMnLCAnW10nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzQmV0d2VlbiA9IG1vbWVudChfdGltZSkuaXNCZWZvcmUoX3JhbmdlQmVnKSA/IGZhbHNlIDogaXNCZXR3ZWVuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoX3JhbmdlQmVnID4gMCAmJiBfcmFuZ2VFbmQgPT09IDApIHtcbiAgICAgIGlmICghb3B0LmNhbkJhY2t3YXJkc1NlbGVjdGVkKSB7XG4gICAgICAgIGxldCBfYWRkVGltZSA9IF90aW1lLmFkZCgxLCAnZGF5Jyk7XG4gICAgICAgIGlzQmV0d2VlbiA9ICFfYWRkVGltZS5pc0FmdGVyKF9yYW5nZUJlZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc0JldHdlZW4gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgX2Rpc2FibGUgPSBmYWxzZTtcblxuICAgIGlmIChkYXlDb25maWcgJiYgaXNCb29sZWFuKGRheUNvbmZpZy5kaXNhYmxlKSkge1xuICAgICAgX2Rpc2FibGUgPSBkYXlDb25maWcuZGlzYWJsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgX2Rpc2FibGUgPSBkaXNhYmxlV2VlIHx8IGlzQmV0d2VlbjtcbiAgICB9XG5cbiAgICBsZXQgdGl0bGUgPSBuZXcgRGF0ZSh0aW1lKS5nZXREYXRlKCkudG9TdHJpbmcoKTtcbiAgICBpZiAoZGF5Q29uZmlnICYmIGRheUNvbmZpZy50aXRsZSkge1xuICAgICAgdGl0bGUgPSBkYXlDb25maWcudGl0bGU7XG4gICAgfSBlbHNlIGlmIChvcHQuZGVmYXVsdFRpdGxlKSB7XG4gICAgICB0aXRsZSA9IG9wdC5kZWZhdWx0VGl0bGU7XG4gICAgfVxuICAgIGxldCBzdWJUaXRsZSA9ICcnO1xuICAgIGlmIChkYXlDb25maWcgJiYgZGF5Q29uZmlnLnN1YlRpdGxlKSB7XG4gICAgICBzdWJUaXRsZSA9IGRheUNvbmZpZy5zdWJUaXRsZTtcbiAgICB9IGVsc2UgaWYgKG9wdC5kZWZhdWx0U3VidGl0bGUpIHtcbiAgICAgIHN1YlRpdGxlID0gb3B0LmRlZmF1bHRTdWJ0aXRsZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGltZSxcbiAgICAgIGlzVG9kYXksXG4gICAgICB0aXRsZSxcbiAgICAgIHN1YlRpdGxlLFxuICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgaXNMYXN0TW9udGg6IGRhdGUubW9udGgoKSA8IChtb250aCA/IG1vbnRoIDogMCksXG4gICAgICBpc05leHRNb250aDogZGF0ZS5tb250aCgpID4gKG1vbnRoID8gbW9udGggOiAwKSxcbiAgICAgIG1hcmtlZDogZGF5Q29uZmlnID8gZGF5Q29uZmlnLm1hcmtlZCB8fCBmYWxzZSA6IGZhbHNlLFxuICAgICAgY3NzQ2xhc3M6IGRheUNvbmZpZyA/IGRheUNvbmZpZy5jc3NDbGFzcyB8fCAnJyA6ICcnLFxuICAgICAgZGlzYWJsZTogX2Rpc2FibGUsXG4gICAgICBpc0ZpcnN0OiBkYXRlLmRhdGUoKSA9PT0gMSxcbiAgICAgIGlzTGFzdDogZGF0ZS5kYXRlKCkgPT09IGRhdGUuZGF5c0luTW9udGgoKSxcbiAgICB9O1xuICB9XG5cbiAgY3JlYXRlQ2FsZW5kYXJNb250aChvcmlnaW5hbDogQ2FsZW5kYXJPcmlnaW5hbCwgb3B0OiBDYWxlbmRhck1vZGFsT3B0aW9ucyk6IENhbGVuZGFyTW9udGgge1xuICAgIGxldCBkYXlzOiBBcnJheTxDYWxlbmRhckRheT4gPSBuZXcgQXJyYXkoNikuZmlsbChudWxsKTtcbiAgICBsZXQgbGVuID0gb3JpZ2luYWwuaG93TWFueURheXM7XG4gICAgZm9yIChsZXQgaSA9IG9yaWdpbmFsLmZpcnN0V2VlazsgaSA8IGxlbiArIG9yaWdpbmFsLmZpcnN0V2VlazsgaSsrKSB7XG4gICAgICBsZXQgaXRlbVRpbWUgPSBuZXcgRGF0ZShvcmlnaW5hbC55ZWFyLCBvcmlnaW5hbC5tb250aCwgaSAtIG9yaWdpbmFsLmZpcnN0V2VlayArIDEpLmdldFRpbWUoKTtcbiAgICAgIGRheXNbaV0gPSB0aGlzLmNyZWF0ZUNhbGVuZGFyRGF5KGl0ZW1UaW1lLCBvcHQpO1xuICAgIH1cblxuICAgIGxldCB3ZWVrU3RhcnQgPSBvcHQud2Vla1N0YXJ0O1xuXG4gICAgaWYgKHdlZWtTdGFydCA9PT0gMSkge1xuICAgICAgaWYgKGRheXNbMF0gPT09IG51bGwpIHtcbiAgICAgICAgZGF5cy5zaGlmdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF5cy51bnNoaWZ0KC4uLm5ldyBBcnJheSg2KS5maWxsKG51bGwpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3B0LnNob3dBZGphY2VudE1vbnRoRGF5KSB7XG4gICAgICBjb25zdCBfYm9vbGVhbk1hcCA9IGRheXMubWFwKGUgPT4gISFlKTtcbiAgICAgIGNvbnN0IHRoaXNNb250aCA9IG1vbWVudChvcmlnaW5hbC50aW1lKS5tb250aCgpO1xuICAgICAgbGV0IHN0YXJ0T2Zmc2V0SW5kZXggPSBfYm9vbGVhbk1hcC5pbmRleE9mKHRydWUpIC0gMTtcbiAgICAgIGxldCBlbmRPZmZzZXRJbmRleCA9IF9ib29sZWFuTWFwLmxhc3RJbmRleE9mKHRydWUpICsgMTtcbiAgICAgIGZvciAoc3RhcnRPZmZzZXRJbmRleDsgc3RhcnRPZmZzZXRJbmRleCA+PSAwOyBzdGFydE9mZnNldEluZGV4LS0pIHtcbiAgICAgICAgY29uc3QgZGF5QmVmb3JlID0gbW9tZW50KGRheXNbc3RhcnRPZmZzZXRJbmRleCArIDFdLnRpbWUpXG4gICAgICAgICAgLmNsb25lKClcbiAgICAgICAgICAuc3VidHJhY3QoMSwgJ2QnKTtcbiAgICAgICAgZGF5c1tzdGFydE9mZnNldEluZGV4XSA9IHRoaXMuY3JlYXRlQ2FsZW5kYXJEYXkoZGF5QmVmb3JlLnZhbHVlT2YoKSwgb3B0LCB0aGlzTW9udGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIShfYm9vbGVhbk1hcC5sZW5ndGggJSA3ID09PSAwICYmIF9ib29sZWFuTWFwW19ib29sZWFuTWFwLmxlbmd0aCAtIDFdKSkge1xuICAgICAgICBmb3IgKGVuZE9mZnNldEluZGV4OyBlbmRPZmZzZXRJbmRleCA8IGRheXMubGVuZ3RoICsgKGVuZE9mZnNldEluZGV4ICUgNyk7IGVuZE9mZnNldEluZGV4KyspIHtcbiAgICAgICAgICBjb25zdCBkYXlBZnRlciA9IG1vbWVudChkYXlzW2VuZE9mZnNldEluZGV4IC0gMV0udGltZSlcbiAgICAgICAgICAgIC5jbG9uZSgpXG4gICAgICAgICAgICAuYWRkKDEsICdkJyk7XG4gICAgICAgICAgZGF5c1tlbmRPZmZzZXRJbmRleF0gPSB0aGlzLmNyZWF0ZUNhbGVuZGFyRGF5KGRheUFmdGVyLnZhbHVlT2YoKSwgb3B0LCB0aGlzTW9udGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRheXMsXG4gICAgICBvcmlnaW5hbDogb3JpZ2luYWwsXG4gICAgfTtcbiAgfVxuXG4gIGNyZWF0ZU1vbnRoc0J5UGVyaW9kKHN0YXJ0VGltZTogbnVtYmVyLCBtb250aHNOdW06IG51bWJlciwgb3B0OiBDYWxlbmRhck1vZGFsT3B0aW9ucyk6IEFycmF5PENhbGVuZGFyTW9udGg+IHtcbiAgICBsZXQgX2FycmF5OiBBcnJheTxDYWxlbmRhck1vbnRoPiA9IFtdO1xuXG4gICAgbGV0IF9zdGFydCA9IG5ldyBEYXRlKHN0YXJ0VGltZSk7XG4gICAgbGV0IF9zdGFydE1vbnRoID0gbmV3IERhdGUoX3N0YXJ0LmdldEZ1bGxZZWFyKCksIF9zdGFydC5nZXRNb250aCgpLCAxKS5nZXRUaW1lKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vbnRoc051bTsgaSsrKSB7XG4gICAgICBsZXQgdGltZSA9IG1vbWVudChfc3RhcnRNb250aClcbiAgICAgICAgLmFkZChpLCAnTScpXG4gICAgICAgIC52YWx1ZU9mKCk7XG4gICAgICBsZXQgb3JpZ2luYWxDYWxlbmRhciA9IHRoaXMuY3JlYXRlT3JpZ2luYWxDYWxlbmRhcih0aW1lKTtcbiAgICAgIF9hcnJheS5wdXNoKHRoaXMuY3JlYXRlQ2FsZW5kYXJNb250aChvcmlnaW5hbENhbGVuZGFyLCBvcHQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2FycmF5O1xuICB9XG5cbiAgd3JhcFJlc3VsdChvcmlnaW5hbDogQ2FsZW5kYXJEYXlbXSwgcGlja01vZGU6IHN0cmluZykge1xuICAgIGxldCByZXN1bHQ6IGFueTtcbiAgICBzd2l0Y2ggKHBpY2tNb2RlKSB7XG4gICAgICBjYXNlIHBpY2tNb2Rlcy5TSU5HTEU6XG4gICAgICAgIHJlc3VsdCA9IHRoaXMubXVsdGlGb3JtYXQob3JpZ2luYWxbMF0udGltZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBwaWNrTW9kZXMuUkFOR0U6XG4gICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICBmcm9tOiB0aGlzLm11bHRpRm9ybWF0KG9yaWdpbmFsWzBdLnRpbWUpLFxuICAgICAgICAgIHRvOiB0aGlzLm11bHRpRm9ybWF0KChvcmlnaW5hbFsxXSB8fCBvcmlnaW5hbFswXSkudGltZSksXG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBwaWNrTW9kZXMuTVVMVEk6XG4gICAgICAgIHJlc3VsdCA9IG9yaWdpbmFsLm1hcChlID0+IHRoaXMubXVsdGlGb3JtYXQoZS50aW1lKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzdWx0ID0gb3JpZ2luYWw7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBtdWx0aUZvcm1hdCh0aW1lOiBudW1iZXIpOiBDYWxlbmRhclJlc3VsdCB7XG4gICAgY29uc3QgX21vbWVudCA9IG1vbWVudCh0aW1lKTtcbiAgICByZXR1cm4ge1xuICAgICAgdGltZTogX21vbWVudC52YWx1ZU9mKCksXG4gICAgICB1bml4OiBfbW9tZW50LnVuaXgoKSxcbiAgICAgIGRhdGVPYmo6IF9tb21lbnQudG9EYXRlKCksXG4gICAgICBzdHJpbmc6IF9tb21lbnQuZm9ybWF0KGRlZmF1bHRzLkRBVEVfRk9STUFUKSxcbiAgICAgIHllYXJzOiBfbW9tZW50LnllYXIoKSxcbiAgICAgIG1vbnRoczogX21vbWVudC5tb250aCgpICsgMSxcbiAgICAgIGRhdGU6IF9tb21lbnQuZGF0ZSgpLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==