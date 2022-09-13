import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Ganhadores } from 'app/models/ganhadores';
import { Sorteio } from 'app/models/sorteio';
import { GanhadoresService } from 'app/services/ganhadores.service';
import { SorteioService } from 'app/services/sorteio.service';
import { ViewGanhadoresComponent } from '../principal/view-ganhadores/view-ganhadores.component';
import { ViewVideoComponent } from '../principal/view-video/view-video.component';

@Component({
  selector: 'app-sorteios',
  templateUrl: './sorteios.component.html',
  styleUrls: ['./sorteios.component.css']
})
export class SorteiosComponent implements OnInit {

  listSorteios: Sorteio[];
  public listGanhadores: Ganhadores[]

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute,
    private sorteioService: SorteioService, private ganhadorService: GanhadoresService) { }

  ngOnInit() {
    this.scrollTop();
    this.loadSorteios();

    this.ganhadorService.list().subscribe(
      ganhadores => this.listGanhadores = ganhadores['content']
    );
  }

  private loadSorteios(){
    this.sorteioService.sorteios.subscribe(
      async sorteios => {
        this.listSorteios = sorteios['content'].filter(sorteio => sorteio.rifinha === false && sorteio.ocultar === false)
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

  openSorteioAtivo(sorteio: string, id: number) {
    this.router.navigate(['sorteioAtivo', sorteio, id]);
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
