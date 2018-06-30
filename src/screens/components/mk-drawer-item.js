import {html, LitElement} from '@polymer/lit-element';
import '@polymer/paper-item/paper-icon-item.js';
import {MkCommonStyles} from './mk-common-styles';

export default class MkDrawerItem extends LitElement {
  static get properties() {
    return {
      icon: String,
      text: String,
      minimized: Boolean,
      active: Boolean,
    };
  }

  _render({icon, text, minimized, active}) {
    const styles = html`
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          white-space: nowrap;
          overflow: hidden;
          cursor: pointer;
        }
        paper-icon-item {
          --paper-item-icon-width: 40px;
          padding: 0 12px;
        }
        .text {
          flex-grow: 1;
          font-weight: normal;
          font-size: 16px;
          line-height: 1.5em;
          opacity: 1;
          transition: opacity 0.3s ease;
          margin-left: 4px;
        }
        iron-icon {
          margin: 4px;
        }
      </style>`;

    const activeStyle = html`
      <style>
        .text {
          font-weight: bold;
        }
      </style>`;

    return html`
      ${MkCommonStyles}
      ${styles}
      ${ active ? activeStyle : null }
      <paper-icon-item>
        <iron-icon icon="${icon}" slot="item-icon"></iron-icon>
        <div class="text">${text}</div>
      </paper-icon-item>`;
  }
}

customElements.define('mk-drawer-item', MkDrawerItem);
