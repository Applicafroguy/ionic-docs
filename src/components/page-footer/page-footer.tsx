import { Component, Prop, h } from '@stencil/core';

import { Page } from '../../definitions';
import { ForwardArrow } from '../../icons';

@Component({
  tag: 'docs-page-footer',
  styleUrl: 'page-footer.css'
})
export class DocsPageFooter {
  @Prop() page!: Page | null;

  hostData() {
    return {
      role: 'contentinfo'
    };
  }

  render() {
    const { page } = this;

    if (page === null || !page.github) {
      return null;
    }

    const {
      path,
      lastUpdated
    } = page.github;

    // merge and dedupe contributor data
    const contributors = Array.from(
      new Set([...page.github.contributors || [], ...page.contributors || []])
    );

    const editHref = `https://github.com/ionic-jp/ionic-docs/edit/master/${path}`;
    const updatedHref = `https://github.com/ionic-jp/ionic-docs/commits/master/${path}`;
    const updatedText = lastUpdated ? new Date(lastUpdated).toISOString().slice(0, 10) : null;
    const contributorHref = (contributor: any) => `${updatedHref}?author=${contributor}`;

    const pagination = (
      page.previousText && page.previousUrl || page.nextText && page.nextUrl
    ) ? <docs-pagination page={page}/> : '';

    // console.log(pagination);

    return [
      pagination,
      <p class="netlify">Caught a mistake or want to contribute to the documentation? <a href="https://github.com/ionic-jp/ionic-docs">Edit this on GitHub!</a> Deployed on <a href="https://www.netlify.com/">Netlify</a>.</p>,
      <div class="page-footer__row">
        {contributors.length > 0 ? <contributor-list contributors={contributors} link={contributorHref}/> : null}
        <docs-button round href={editHref}>翻訳する <ForwardArrow/></docs-button>
        {updatedText !== null ? <a class="last-updated" href={updatedHref}>Updated {updatedText}</a> : ''}
      </div>
    ];
  }
}
