import {html, LitElement} from '@polymer/lit-element';
import '@polymer/paper-item/paper-icon-item';

export default class MkDrawerItemUser extends LitElement {
  static get properties() {
    return {
      user: Object,
      minimized: {
        type: Boolean,
        reflectToAttribute: true,
      },
    };
  }

  _render({user, minimized}) {
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
        }
        img.icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
        iron-icon {
          margin: 4px;
        }
        .text {
          flex-grow: 1;
          font-weight: normal;
          font-size: 16px;
          line-height: 1.5em;
          opacity: 1;
          transition: opacity 0.3s ease;
          margin-left: 0px;
        }
        .text.minimized {
          margin-left: 8px;
        }
      </style>`;
    let icon = user ?
      html`<img class="icon" slot="item-icon" src="${user.photoURL}" alt="${user.displayName}"/>` :
      html`<iron-icon slot="item-icon" icon="icons:account-circle"></iron-icon>`;
    return html`
      ${styles}
      <paper-icon-item>
        ${icon}
        <div class$="${minimized ? 'text minimized' : 'text'}">${user ? user.displayName : 'Login or Register'}</div>
      </paper-icon-item>`;
  }
}

customElements.define('mk-drawer-item-user', MkDrawerItemUser);
