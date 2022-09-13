import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-ganhadores',
  templateUrl: './view-ganhadores.component.html',
  styleUrls: ['./view-ganhadores.component.css']
})
export class ViewGanhadoresComponent implements OnInit {
  imageUrl = '/uploads/';

  constructor(public dialogRef: MatDialogRef<ViewGanhadoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    const image = this.data.imagem;
    this.imageUrl += image;
  }

}
