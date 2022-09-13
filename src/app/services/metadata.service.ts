
import { Inject, Injectable } from '@angular/core';
import {Meta, MetaDefinition, Title} from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface PageMetadata {
  title: string;
  // image will be added later
  description: string;
  author: string;
  image: string;
  keywords: string[];
  type: string;
}

const defaultMetadata: PageMetadata = {
  title: 'Premiando.com',
  description: 'lojapremiando.com.br',
  author: 'Raphael Cavalcante',
  image: 'imgsorteio.jpeg',
  keywords: ['Angular', 'meta tags', 'Angular Universal'],
  type: 'website',
}

@Injectable()
export class MetadataService {
  constructor(private metaTagService: Meta,
              private titleService: Title,
              private router: Router) {}

  public updateMetadata(metadata: Partial<PageMetadata>, index: boolean = true): void {
    const pageMetadata: PageMetadata = {...defaultMetadata, ...metadata};
    const metatags: MetaDefinition[] = this.generateMetaDefinitions(pageMetadata);

    this.metaTagService.addTags([
        ...metatags,
        { property: 'og:url', content: window.location.protocol + '//' + window.location.hostname},
        { name: 'robots', content: index ? 'index, follow' : 'noindex' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
       ], false);

    this.titleService.setTitle(pageMetadata.title);
  }

  private generateMetaDefinitions(metadata: PageMetadata): MetaDefinition[] {
    const baseUrl = window.location.protocol + '//' + window.location.hostname;
    const imageUrl = baseUrl + '/uploads/'
    return [
      { name: 'title', content: metadata.title },
      { property: 'og:title', content: metadata.title },

      { name: 'description', content: metadata.description },
      { property: 'og:description', content: metadata.description },

      { name: 'author', content: metadata.author },
      { property: 'og:author', content: metadata.author },

      { name: 'keywords', content: metadata.keywords.join(', ') },

      { property: 'og:type', content: metadata.type },

      { property: 'og:image', content: imageUrl + metadata.image}
    ];
  }
}