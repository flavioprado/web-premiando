import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css']
})
export class ViewVideoComponent implements OnInit {

  dataIphone: any;

  constructor(public dialogRef: MatDialogRef<ViewVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    //   this.dataIphone = String(this.data).replace('embed', 'v')
    //   this.dataIphone = this.sanitizer.bypassSecurityTrustResourceUrl(this.dataIphone)
    //   this.data = this.sanitizer.bypassSecurityTrustResourceUrl(this.data)
  }

  checkIsIphone = function () {
    if (navigator.userAgent.match(/iPhone/i)) {
      return true;
    }
    else {
      return false;
    }
  }
}
