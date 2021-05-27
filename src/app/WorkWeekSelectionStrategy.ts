import { Inject, Injectable } from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import { DateRange, MatDateRangeSelectionStrategy } from "@angular/material/datepicker";

@Injectable()
export class WorkWeekSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
    start: any;

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