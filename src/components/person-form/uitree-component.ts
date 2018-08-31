import { Component, Input } from '@angular/core';

@Component({
    selector: "ui-tree",
    template: `
    <form novalidate (ngSubmit)="onSubmit(form.value)">
      <ul *ngIf="items.length">
        <div *ngFor="let item of items">
        <label [attr.for]="item">{{item.name}}</label>
        <ui-tree *ngIf="item[key].length" [key]="key" [data]="item[key]"></ui-tree>
        </div>
      </ul>
    </form>
    `
  })
  export class UiTree {
    @Input('data') items: Array<Object>;
    @Input('key') key: string;
  }