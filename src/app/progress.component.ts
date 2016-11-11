import {Component, ViewContainerRef} from '@angular/core';
import {ProgressService} from "./progress.service";


@Component({
    selector: 'progress-bar',
    templateUrl: './progress.component.html',
})
export class ProgressComponent {
  constructor(private progress:ProgressService, private viewContainerRef:ViewContainerRef) {
  }

  ngAfterViewInit() {
    this.progress.viewContainerRef = this.viewContainerRef;
  }
}
