import { Component, EventEmitter, Input, Output } from '@angular/core';
import { defaults } from '../config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function MonthPickerComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1)(1, "button", 2);
    i0.ɵɵlistener("click", function MonthPickerComponent_div_1_Template_button_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r4); const i_r2 = restoredCtx.index; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3._onSelect(i_r2)); });
    i0.ɵɵpipe(2, "date");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("this-month", i_r2 === ctx_r0._thisMonth.getMonth() && (ctx_r0.month.original == null ? null : ctx_r0.month.original.year) === ctx_r0._thisMonth.getFullYear());
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind2(2, 4, ctx_r0.getDate(i_r2), ctx_r0.MONTH_FORMAT));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1);
} }
export class MonthPickerComponent {
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
MonthPickerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MonthPickerComponent, selectors: [["ion-calendar-month-picker"]], inputs: { month: "month", color: "color", monthFormat: "monthFormat" }, outputs: { select: "select" }, decls: 2, vars: 3, consts: [["class", "month-packer-item", 3, "this-month", 4, "ngFor", "ngForOf"], [1, "month-packer-item"], ["type", "button", 3, "click"]], template: function MonthPickerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, MonthPickerComponent_div_1_Template, 4, 7, "div", 0);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassMap("month-picker " + ctx.color);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx._monthFormat);
    } }, dependencies: [i1.NgForOf, i1.DatePipe], styles: ["[_nghost-%COMP%]   .month-picker[_ngcontent-%COMP%]{margin:20px 0;display:inline-block;width:100%}[_nghost-%COMP%]   .month-packer-item[_ngcontent-%COMP%]{width:25%;box-sizing:border-box;float:left;height:50px;padding:5px}[_nghost-%COMP%]   .month-packer-item[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border-radius:32px;width:100%;height:100%;font-size:.9em;background-color:transparent}[_nghost-%COMP%]   .month-picker.primary[_ngcontent-%COMP%]   .month-packer-item.this-month[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px solid var(--ion-color-primary)}[_nghost-%COMP%]   .month-picker.primary[_ngcontent-%COMP%]   .month-packer-item.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:var(--ion-color-primary);color:#fff}[_nghost-%COMP%]   .month-picker.secondary[_ngcontent-%COMP%]   .month-packer-item.this-month[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px solid var(--ion-color-secondary)}[_nghost-%COMP%]   .month-picker.secondary[_ngcontent-%COMP%]   .month-packer-item.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:var(--ion-color-secondary);color:#fff}[_nghost-%COMP%]   .month-picker.danger[_ngcontent-%COMP%]   .month-packer-item.this-month[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px solid var(--ion-color-danger)}[_nghost-%COMP%]   .month-picker.danger[_ngcontent-%COMP%]   .month-packer-item.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:var(--ion-color-danger);color:#fff}[_nghost-%COMP%]   .month-picker.dark[_ngcontent-%COMP%]   .month-packer-item.this-month[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px solid var(--ion-color-dark)}[_nghost-%COMP%]   .month-picker.dark[_ngcontent-%COMP%]   .month-packer-item.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:var(--ion-color-dark);color:#fff}[_nghost-%COMP%]   .month-picker.light[_ngcontent-%COMP%]   .month-packer-item.this-month[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px solid var(--ion-color-light)}[_nghost-%COMP%]   .month-picker.light[_ngcontent-%COMP%]   .month-packer-item.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:var(--ion-color-light);color:#9e9e9e}[_nghost-%COMP%]   .month-picker.transparent[_ngcontent-%COMP%]{background-color:transparent}[_nghost-%COMP%]   .month-picker.transparent[_ngcontent-%COMP%]   .month-packer-item.this-month[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px solid var(--ion-color-light)}[_nghost-%COMP%]   .month-picker.transparent[_ngcontent-%COMP%]   .month-packer-item.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:var(--ion-color-light);color:#9e9e9e}[_nghost-%COMP%]   .month-picker.cal-color[_ngcontent-%COMP%]   .month-packer-item.this-month[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:1px solid}[_nghost-%COMP%]   .month-picker.cal-color[_ngcontent-%COMP%]   .month-packer-item.active[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{color:#fff}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MonthPickerComponent, [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50cy9tb250aC1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7SUFPL0IsOEJBRXNELGdCQUFBO0lBQzlCLHFOQUFTLGVBQUEsc0JBQVksQ0FBQSxJQUFDOztJQUFvRCxZQUFVO0lBQUEsaUJBQVMsRUFBQTs7Ozs7SUFGaEgsOEtBQXNHO0lBRTVELGVBQWtEO0lBQWxELDZGQUFrRDtJQUFDLGVBQVU7SUFBViw2QkFBVTs7QUFLbEgsTUFBTSxPQUFPLG9CQUFvQjtJQXVCL0I7UUFuQkEsVUFBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFFdkIsV0FBTSxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xELGVBQVUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3hCLGlCQUFZLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUVyQyxpQkFBWSxHQUFHLE1BQU0sQ0FBQztJQWFQLENBQUM7SUFYaEIsSUFDSSxXQUFXLENBQUMsS0FBZTtRQUM3QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFJRCxTQUFTLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQWE7UUFDbkIsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDOzt3RkEvQlUsb0JBQW9CO3VFQUFwQixvQkFBb0I7UUFUN0IsMkJBQXVDO1FBQ3JDLHFFQUlNO1FBQ1IsaUJBQU07O1FBTkQsMENBQWlDO1FBR2QsZUFBaUI7UUFBakIsMENBQWlCOzt1RkFNaEMsb0JBQW9CO2NBYmhDLFNBQVM7MkJBQ0UsMkJBQTJCLFlBRTNCOzs7Ozs7OztHQVFUO3NDQUlELEtBQUs7a0JBREosS0FBSztZQUdOLEtBQUs7a0JBREosS0FBSztZQUdOLE1BQU07a0JBREwsTUFBTTtZQVFILFdBQVc7a0JBRGQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhck1vbnRoIH0gZnJvbSAnLi4vY2FsZW5kYXIubW9kZWwnO1xuaW1wb3J0IHsgZGVmYXVsdHMgfSBmcm9tICcuLi9jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb24tY2FsZW5kYXItbW9udGgtcGlja2VyJyxcbiAgc3R5bGVVcmxzOiBbJy4vbW9udGgtcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbY2xhc3NdPVwiJ21vbnRoLXBpY2tlciAnICsgY29sb3JcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtb250aC1wYWNrZXItaXRlbVwiXG4gICAgICAgICAgIFtjbGFzcy50aGlzLW1vbnRoXT1cIiBpID09PSBfdGhpc01vbnRoLmdldE1vbnRoKCkgJiYgbW9udGgub3JpZ2luYWw/LnllYXIgPT09IF90aGlzTW9udGguZ2V0RnVsbFllYXIoKVwiXG4gICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIF9tb250aEZvcm1hdDsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiX29uU2VsZWN0KGkpXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXREYXRlKGkpIHwgZGF0ZTpNT05USF9GT1JNQVRcIj57eyBpdGVtIH19PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTW9udGhQaWNrZXJDb21wb25lbnQge1xuICBASW5wdXQoKVxuICBtb250aDogQ2FsZW5kYXJNb250aCB8IGFueTtcbiAgQElucHV0KClcbiAgY29sb3IgPSBkZWZhdWx0cy5DT0xPUjtcbiAgQE91dHB1dCgpXG4gIHNlbGVjdDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIF90aGlzTW9udGggPSBuZXcgRGF0ZSgpO1xuICBfbW9udGhGb3JtYXQgPSBkZWZhdWx0cy5NT05USF9GT1JNQVQ7XG5cbiAgTU9OVEhfRk9STUFUID0gJ01NTU0nO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBtb250aEZvcm1hdCh2YWx1ZTogc3RyaW5nW10pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAxMikge1xuICAgICAgdGhpcy5fbW9udGhGb3JtYXQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBnZXQgbW9udGhGb3JtYXQoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9tb250aEZvcm1hdDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBfb25TZWxlY3QobW9udGg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQobW9udGgpO1xuICB9XG5cbiAgZ2V0RGF0ZShtb250aDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMuX3RoaXNNb250aC5nZXRGdWxsWWVhcigpLCBtb250aCwgMSk7XG4gIH1cbn1cbiJdfQ==