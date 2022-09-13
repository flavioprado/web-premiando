import { Component, OnInit } from '@angular/core';
import { Sorteio } from 'app/models/sorteio';
import { WebSiteSlideShow } from 'app/models/website-slideshow';
import { SlideShowService } from 'app/services/slideshow.service';
import { SorteioService } from 'app/services/sorteio.service';
import { NotificationService } from 'app/services/toast.service';
import { UploadService } from 'app/services/upload.service';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  fileName = '';
  arquivo: string;
  sorteioList: Sorteio[];
  webSiteSlideShow: WebSiteSlideShow;
  slideSHow$: WebSiteSlideShow[];

  constructor( private sorteioService: SorteioService, private alertService: NotificationService,
    private slideShowService: SlideShowService, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.webSiteSlideShow = new WebSiteSlideShow();
    this.getSlides();
    this.loadSorteios();
  }

  getSlides(){
    return this.slideShowService.findSlideShowById().subscribe(
       slide => {
         this.slideSHow$ = slide;
       }
     )
   }

  loadSorteios(){
    this.sorteioService.list().subscribe(
      sorteios => {
        this.sorteioList = sorteios['content']
        this.sorteioList = this.sorteioList.filter(sorteio => !sorteio.rifinha)
      }
    );
  }

  setSorteio(sorteio: Sorteio){
    this.webSiteSlideShow.idSorteio = sorteio.id
    this.webSiteSlideShow.nomeSorteio = sorteio.titulo
  }

  async fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.fileName = file.name;
      this.arquivo = event.target.files[0];
    }
  }

  salvar(){
    this.webSiteSlideShow.imagem = this.fileName;
    this.slideShowService.updateSlideShow(this.webSiteSlideShow, 1).toPromise()
    .then(() => {
      this.uploadService.upload(this.arquivo, this.fileName, 'sorteios').toPromise()
      .then(() => {
        this.alertService.showSucess('Slideshow atualizado com sucesso!', 'Sucesso')
        this.getSlides();
      })
    })
    .catch(error => {
      this.alertService.showError('Erro ao atualizar o SlideShow!', 'Error')
    })
  }

  alterarVisualizacaoBanner(slide: WebSiteSlideShow){
    slide.ativo = !slide.ativo
    this.slideShowService.updateSlideShow(slide, 1).toPromise()
    .then(() => {
        this.getSlides();
      }
    )
  }

  getIconVisibility(ativo: boolean){
    if(ativo){
      return 'material-icons text-success';
    }
    return 'material-icons'
  }

}
