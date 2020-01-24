import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';

@Directive({
  selector: '[elastic-textarea]'
})
export class ElasticDirective implements AfterViewInit {
  /**
   * @description store element reference of directive
   * @property target
   * @type any
   */
  public target: any;

  @Input('elastic-textarea') private height: number = 44;

  /**
   * @method constructor
   * @param el {ElementRef}
   */
  constructor(private el: ElementRef) {
    this.target = el.nativeElement;
  }

  /**
   * @description on input event, recalcultae height of textarea
   * @method onInput
   * @param nativeElement
   */
  @HostListener('input', ['$event.target'])
  public onInput(nativeElement: any): void {
    nativeElement.style.overflow = 'hidden';
    nativeElement.style.height =
      nativeElement.scrollHeight > this.height
        ? nativeElement.scrollHeight + 'px'
        : this.height + 'px';
  }

  /**
   * @description after view initialises, recalcultae height of textarea
   * @method onInput
   * @param nativeElement
   */
  public ngAfterViewInit(): void {
    this.onInput(this.target);
  }
}
