import { Directive, Inject } from '@angular/core';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { WorkWeekSelectionStrategy } from './WorkWeekSelectionStrategy';

@Directive({
  selector: '[workweek]',
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: WorkWeekSelectionStrategy
    }
  ]
})
export class WorkWeekSelectionStrategyDirective {

  constructor(
    @Inject(MAT_DATE_RANGE_SELECTION_STRATEGY)
    private maxRangeStrategy: WorkWeekSelectionStrategy<any>
  ) {}

}
