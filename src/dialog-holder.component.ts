import { Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DialogWrapperComponent } from './dialog-wrapper.component';
import { DialogComponent } from './dialog.component';
import { DialogOptions } from './dialog.service';

@Component({
  selector: 'dialog-holder',
  template: '<ng-template #element></ng-template>',
})
export class DialogHolderComponent {

  /**
   * Target element to insert dialogs
   */
  @ViewChild('element', {read: ViewContainerRef}) public element: ViewContainerRef;

  /**
   * Array of dialogs
   * @type {Array<DialogComponent> }
   */
  dialogs: Array<DialogComponent<any, any>> = [];

  /**
   * Constructor
   * @param {ComponentFactoryResolver} resolver
   */
  constructor(private resolver: ComponentFactoryResolver) {}

  /**
   * Adds dialog
   * @param {Type<DialogComponent>} component
   * @param {object?} data
   * @param {DialogOptions?} options
   * @return {Observable<*>}
   */
  addDialog<T, T1>(component:Type<DialogComponent<T, T1>>, data?:T, options?:DialogOptions):Observable<T1> {
    options = options || <DialogOptions>{};
    let factory = this.resolver.resolveComponentFactory(DialogWrapperComponent);
    let componentRef = this.element.createComponent(factory, options.index);
    let dialogWrapper: DialogWrapperComponent = <DialogWrapperComponent> componentRef.instance;
    let _component: DialogComponent<T,T1> =  dialogWrapper.addComponent(component);
    if(typeof(options.index) !== 'undefined') {
      this.dialogs.splice(options.index, 0, _component);
    }
    else {
      this.dialogs.push(_component);
    }
    setTimeout(()=>{
      dialogWrapper.container.nativeElement.classList.add('show');
      dialogWrapper.container.nativeElement.classList.add('in');
    });
    if(options.autoCloseTimeout) {
      setTimeout(()=>{
        this.removeDialog(_component);
      }, options.autoCloseTimeout);
    }
    if(options.closeByClickingOutside) {
      dialogWrapper.closeByClickOutside();
    }
    if(options.backdropColor) {
      dialogWrapper.container.nativeElement.style.backgroundColor = options.backdropColor;
    }
    
    this.updateBodyClass();

    return _component.fillData(data);
  }

  /**
   * Removes dialog
   * @param {DialogComponent} component
   */
  removeDialog(component:DialogComponent<any, any>) {
    let element = component.wrapper.container.nativeElement;

    element.classList.remove('show');
    element.classList.remove('in');
    setTimeout(() => {
        this._removeElement(component);
    }, 300);
  }

  /**
   * Bind a body class 'modal-open' to a condition of dialogs in pool > 0
   */
  
  private updateBodyClass() {
    const bodyClass = 'modal-open';
    const body = document.getElementsByTagName('body')[0];
    if(!this.dialogs.length) {
      body.classList.remove(bodyClass);
    } else {
      body.classList.add(bodyClass);
    }
  }

  private _removeElement(component) {
    let index = this.dialogs.indexOf(component);
    if(index>-1) {
      this.element.remove(index);
      this.dialogs.splice(index, 1);
    }
    this.updateBodyClass();
  }

  clear() {
    this.element.clear();
    this.dialogs = [];
  }
}
