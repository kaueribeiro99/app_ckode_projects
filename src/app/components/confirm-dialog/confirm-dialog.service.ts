import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "./confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
      private dialog: MatDialog
  ) { }

  // Dialogo de confirmação genérico
  openConfirmDialog(title: string, message: string, button1: string, button2: string){
    return this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: title,
        message: message,
        button1: button1,
        button2: button2
      }
    });
  }
}
