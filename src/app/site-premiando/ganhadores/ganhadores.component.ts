import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ganhadores } from 'app/models/ganhadores';
import { GanhadoresService } from 'app/services/ganhadores.service';
import { ViewGanhadoresComponent } from '../principal/view-ganhadores/view-ganhadores.component';
import { ViewVideoComponent } from '../principal/view-video/view-video.component';

@Component({
  selector: 'app-ganhadores',
  templateUrl: './ganhadores.component.html',
  styleUrls: ['./ganhadores.component.css']
})
export class GanhadoresComponent implements OnInit {

  public listGanhadores: Ganhadores[]
  urlToJson = 'assets/json/data.json';

  constructor(public dialog: MatDialog, private ganhadorService: GanhadoresService) { }

  ngOnInit(): void {
    this.scrollTop();
    this.loadGanhadores();
  }

  loadGanhadores(){
    this.ganhadorService.defaultGanhadores(this.urlToJson).subscribe(
      result => {
          //this.listGanhadores = result.reverse();
          this.ganhadorService.list().toPromise().then(
            ganhadores => {
                if(ganhadores['content']){
                  this.listGanhadores = result.concat(ganhadores['content'].reverse()).reverse();
                } else {
                  this.listGanhadores = result.reverse();
                }
              }
          );
      }
    );
  }

  openDialog(video: any) {
    this.dialog.open(ViewVideoComponent, {
      data: video
    });
  }

  openDialogGanhadores(nome: any, numero: any, cidade: any, data: any, imagem: any) {
    this.dialog.open(ViewGanhadoresComponent, {
      data: { nome, numero, cidade, data, imagem }
    });
  }

  scrollTop(){
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 100); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }

}
