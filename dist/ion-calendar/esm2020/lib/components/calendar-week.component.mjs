import { Component, Input } from '@angular/core';
import { defaults } from '../config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@ionic/angular";
function CalendarWeekComponent_li_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const w_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(w_r1);
} }
export class CalendarWeekComponent {
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
CalendarWeekComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CalendarWeekComponent, selectors: [["ion-calendar-week"]], inputs: { color: "color", weekArray: "weekArray", weekStart: "weekStart" }, decls: 3, vars: 5, consts: [["no-border-top", ""], [4, "ngFor", "ngForOf"]], template: function CalendarWeekComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ion-toolbar", 0)(1, "ul");
        i0.ɵɵtemplate(2, CalendarWeekComponent_li_2_Template, 2, 1, "li", 1);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵclassMap("week-toolbar ");
        i0.ɵɵadvance(1);
        i0.ɵɵclassMap("week-title " + ctx.color);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx._displayWeekArray);
    } }, dependencies: [i1.NgForOf, i2.IonToolbar], styles: ["[_nghost-%COMP%]   .toolbar-background-md[_ngcontent-%COMP%], [_nghost-%COMP%]   .toolbar-background-ios[_ngcontent-%COMP%]{background:transparent}[_nghost-%COMP%]   .week-toolbar[_ngcontent-%COMP%]{--padding-start: 0;--padding-end: 0;--padding-bottom: 0;--padding-top: 0}[_nghost-%COMP%]   .week-toolbar.primary[_ngcontent-%COMP%]{--background: var(--ion-color-primary)}[_nghost-%COMP%]   .week-toolbar.secondary[_ngcontent-%COMP%]{--background: var(--ion-color-secondary)}[_nghost-%COMP%]   .week-toolbar.danger[_ngcontent-%COMP%]{--background: var(--ion-color-danger)}[_nghost-%COMP%]   .week-toolbar.dark[_ngcontent-%COMP%]{--background: var(--ion-color-dark)}[_nghost-%COMP%]   .week-toolbar.light[_ngcontent-%COMP%]{--background: var(--ion-color-light)}[_nghost-%COMP%]   .week-toolbar.transparent[_ngcontent-%COMP%]{--background: transparent}[_nghost-%COMP%]   .week-toolbar.toolbar-md[_ngcontent-%COMP%]{min-height:44px}[_nghost-%COMP%]   .week-title[_ngcontent-%COMP%]{margin:0;height:44px;width:100%;padding:15px 0;font-size:.9em}[_nghost-%COMP%]   .week-title.light[_ngcontent-%COMP%], [_nghost-%COMP%]   .week-title.transparent[_ngcontent-%COMP%]{color:#9e9e9e}[_nghost-%COMP%]   .week-title[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style-type:none;display:block;float:left;width:14%;text-align:center;font-weight:700}[_nghost-%COMP%]   .week-title[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-of-type(7n), [_nghost-%COMP%]   .week-title[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-of-type(7n + 1){width:15%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CalendarWeekComponent, [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudHMvY2FsZW5kYXItd2Vlay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7SUFRN0IsMEJBQXdDO0lBQUEsWUFBTztJQUFBLGlCQUFLOzs7SUFBWixlQUFPO0lBQVAsMEJBQU87O0FBS3ZELE1BQU0sT0FBTyxxQkFBcUI7SUFPaEM7UUFOQSxlQUFVLEdBQWEsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUM3QyxzQkFBaUIsR0FBYSxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzlDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFFZixVQUFLLEdBQXVCLFFBQVEsQ0FBQyxLQUFLLENBQUM7SUFFNUIsQ0FBQztJQUVoQixJQUNJLFNBQVMsQ0FBQyxLQUEyQjtRQUN2QyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBRUQsSUFDSSxTQUFTLENBQUMsS0FBeUI7UUFDckMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLE1BQU0sY0FBYyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFRLENBQUM7WUFDbkQsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDO1NBQzlDO2FBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7OzBGQWpDVSxxQkFBcUI7d0VBQXJCLHFCQUFxQjtRQVA5QixzQ0FBcUQsU0FBQTtRQUVqRCxvRUFBb0Q7UUFDdEQsaUJBQUssRUFBQTs7UUFITSw4QkFBeUI7UUFDaEMsZUFBK0I7UUFBL0Isd0NBQStCO1FBQ2YsZUFBb0I7UUFBcEIsK0NBQW9COzt1RkFLakMscUJBQXFCO2NBWGpDLFNBQVM7MkJBQ0UsbUJBQW1CLFlBRW5COzs7Ozs7R0FNVDtzQ0FPRCxLQUFLO2tCQURKLEtBQUs7WUFNRixTQUFTO2tCQURaLEtBQUs7WUFTRixTQUFTO2tCQURaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gJy4uL2NvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbi1jYWxlbmRhci13ZWVrJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItd2Vlay5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpb24tdG9vbGJhciBbY2xhc3NdPVwiJ3dlZWstdG9vbGJhciAnXCIgbm8tYm9yZGVyLXRvcD5cbiAgICAgIDx1bCBbY2xhc3NdPVwiJ3dlZWstdGl0bGUgJyArIGNvbG9yXCI+XG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgdyBvZiBfZGlzcGxheVdlZWtBcnJheVwiPnt7IHcgfX08L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2lvbi10b29sYmFyPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhcldlZWtDb21wb25lbnQge1xuICBfd2Vla0FycmF5OiBzdHJpbmdbXSA9IGRlZmF1bHRzLldFRUtTX0ZPUk1BVDtcbiAgX2Rpc3BsYXlXZWVrQXJyYXk6IHN0cmluZ1tdID0gdGhpcy5fd2Vla0FycmF5O1xuICBfd2Vla1N0YXJ0ID0gMDtcbiAgQElucHV0KClcbiAgY29sb3I6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGRlZmF1bHRzLkNPTE9SO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBASW5wdXQoKVxuICBzZXQgd2Vla0FycmF5KHZhbHVlOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCkge1xuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPT09IDcpIHtcbiAgICAgIHRoaXMuX3dlZWtBcnJheSA9IFsuLi52YWx1ZV07XG4gICAgICB0aGlzLmFkanVzdFNvcnQoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgd2Vla1N0YXJ0KHZhbHVlOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAodmFsdWUgPT09IDAgfHwgdmFsdWUgPT09IDEpIHtcbiAgICAgIHRoaXMuX3dlZWtTdGFydCA9IHZhbHVlO1xuICAgICAgdGhpcy5hZGp1c3RTb3J0KCk7XG4gICAgfVxuICB9XG5cbiAgYWRqdXN0U29ydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2Vla1N0YXJ0ID09PSAxKSB7XG4gICAgICBjb25zdCBjYWNoZVdlZWtBcnJheSA9IFsuLi50aGlzLl93ZWVrQXJyYXldIGFzIGFueTtcbiAgICAgIGNhY2hlV2Vla0FycmF5LnB1c2goY2FjaGVXZWVrQXJyYXkuc2hpZnQoKSk7XG4gICAgICB0aGlzLl9kaXNwbGF5V2Vla0FycmF5ID0gWy4uLmNhY2hlV2Vla0FycmF5XTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3dlZWtTdGFydCA9PT0gMCkge1xuICAgICAgdGhpcy5fZGlzcGxheVdlZWtBcnJheSA9IFsuLi50aGlzLl93ZWVrQXJyYXldO1xuICAgIH1cbiAgfVxufVxuIl19