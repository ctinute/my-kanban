import {html, LitElement} from '@polymer/lit-element';
import '@polymer/iron-icons/iron-icons';

import {Actions} from '../actions';

import './mk-logo.js';
import '../components/mk-drawer-item.js';

class MkDrawer extends LitElement {
  static get properties() {
    return {
      minimized: Boolean,
      drawerItems: Array,
      user: Object,
      store: Object,
    };
  }

  toggleDrawerMinimization() {
    this.dispatchEvent(new CustomEvent('toggle-minimize', {detail: {minimized: this.minimized}}));
  }

  _login() {
    this.dispatchEvent(new CustomEvent('login'));
  }

  _logout() {
    this.dispatchEvent(new CustomEvent('logout'));
  }

  _navigateUserDashboard() {
    this.store.dispatch(Actions.route.navigate('Dashboard', '/u'));
  }

  _render({minimized, narrow, drawerItems, user}) {
    const styles = html`
      <style include="shared-styles">
        :host {
          width: 100%;
          height: 100vh;
          background-color: var(--mk-primary-color);
          
          display: flex;
          flex-flow: column;
          white-space: nowrap;
          overflow: hidden;
        }
          
        .drawer-item {
          height: 48px;
          width: 256px;
        }
        
        .drawer-content {
          flex-grow: 1;
          display: flex;
          flex-flow: column;
          white-space: nowrap;
          overflow: hidden;
        }
        
        .drawer-pinned-top {
          width: 100%;
        }
        
        .drawer-dynamic {
          flex-grow: 1;
          overflow-x: hidden;
          overflow-y: auto;
        }
        
        .drawer-pinned-bottom {
          width: 100%;
        }
      </style>`;

    let userBlock = user ?
      html`
        <mk-drawer-item
          icon="icons:account-circle" 
          text="${user.displayName}"
          minimized="${minimized}"
          class="drawer-item"
          on-click="${() => this._navigateUserDashboard()}">
        </mk-drawer-item>
        <mk-drawer-item
          icon="" 
          text="Sign out"
          minimized="${minimized}"
          class="drawer-item"
          on-click="${() => this._logout()}">
        </mk-drawer-item>` :
      html`
        <mk-drawer-item
          icon="icons:account-circle" 
          text="Sign in"
          minimized="${minimized}"
          class="drawer-item"
          on-click="${() => this._login()}">
        </mk-drawer-item>`;

    let dynamicItemsBlock = drawerItems ?
      drawerItems.map((item) => html`
        <mk-drawer-item
          icon="${item.icon}"
          text="${item.title}"
          minimized="${minimized}"
          on-click="${item.link}">
        </mk-drawer-item>`) :
      html``;

    let bottomBlock = !narrow ?
      html`
        <mk-drawer-item 
          icon="icons:chevron-left"
          text="Minimize"
          class="drawer-item" 
          minimized="${minimized}" 
          on-click="${() => this.toggleDrawerMinimization()}">
        </mk-drawer-item>` :
      null;

    return html`
      ${styles}
      <!-- Logo & App name -->
      <div class="drawer-header">
        <mk-logo minimized="${minimized}"></mk-logo>
      </div>
      <div class="drawer-content">
        <div class="drawer-pinned-top">${userBlock}</div>
        <div class="drawer-dynamic">${dynamicItemsBlock}</div>
        <div class="drawer-pinned-bottom">${bottomBlock}</div>
      </div>
    `;
  }
}

customElements.define('mk-drawer', MkDrawer);
