import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Ganhadores } from 'app/models/ganhadores';
import { Sorteio } from 'app/models/sorteio';
import { WebSiteSlideShow } from 'app/models/website-slideshow';
import { GanhadoresService } from 'app/services/ganhadores.service';
import { SlideShowService } from 'app/services/slideshow.service';
import { SorteioService } from 'app/services/sorteio.service';
import { ViewGanhadoresComponent } from './view-ganhadores/view-ganhadores.component';
import { ViewVideoComponent } from './view-video/view-video.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  listSorteios: Sorteio[];
  slideSHow$: WebSiteSlideShow[];
  slideSHowActive$: WebSiteSlideShow;
  urlToJson = 'assets/json/data.json';
  public listGanhadores: Ganhadores[] = []

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute,
    private sorteioService: SorteioService, private slideShowService: SlideShowService, 
    private ganhadorService: GanhadoresService, private titleService: Title) { }

  ngOnInit() {
    this.scrollTop();
    this.titleService.setTitle('Premiando.com');

    this.loadGanhadores();

    this.getSlides();

    this.loadSorteios();
  }

  getSlides(){
   return this.slideShowService.findSlideShowById().subscribe(
      slide => {
        this.slideSHow$ = slide.filter(slide => slide.ativo);
        this.slideSHowActive$ = this.slideSHow$[0];
        this.slideSHow$.splice(this.slideSHow$.indexOf(this.slideSHowActive$), 1)
      }
    )
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

  private loadSorteios(){
    this.sorteioService.sorteios.subscribe(
      async sorteios => {
        this.listSorteios = sorteios['content'].filter(sorteio => sorteio.rifinha === false && sorteio.ocultar === false)
      } 
    );
  }

  openDialog(video: any){
    if(this.checkIsIphone()){
      window.open(video, "_blank");
    } else {
      this.dialog.open(ViewVideoComponent, {
        data: video
      });
    }
  }

  openDialogGanhadores(nome: any, numero: any, cidade: any, data: any, imagem: any){
    this.dialog.open(ViewGanhadoresComponent, {
      data: {nome, numero, cidade, data, imagem}
    });
  }

  openSorteioAtivo(sorteio: string, id: number){
    this.router.navigate(['sorteioAtivo',sorteio.replaceAll(' ','-'), id]);
  }

  navigateTo(rota: string){
    this.router.navigate([rota]);
  }

  checkIsIphone = function() {
    if (navigator.userAgent.match(/iPhone/i)) {
      return true;
    }
    else {
      return false;
    }
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
