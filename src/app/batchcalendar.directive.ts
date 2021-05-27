import { Directive } from '@angular/core';
import {Component, Injectable} from '@angular/core';
import { DateAdapter} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MatDatepickerModule,
  MatDateRangePicker,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';

@Directive({
  selector: '[appBatchcalendar]'
})
export class BatchcalendarDirective<D> implements MatDateRangeSelectionStrategy<D>{

  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createWorkWeekRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createWorkWeekRange(activeDate);
  }

  private _createWorkWeekRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, 1-this._dateAdapter.getDayOfWeek(date));
      const end = this._dateAdapter.addCalendarDays(date, 5-this._dateAdapter.getDayOfWeek(date));
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}
