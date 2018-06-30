import {html, LitElement} from '@polymer/lit-element';
import {navigate} from '../../actions/route';
import './mk-drawer-item';
import './mk-drawer-item-user';

class MkDrawer extends LitElement {
  static get properties() {
    return {
      minimized: Boolean,
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
    this.store.dispatch(navigate('Dashboard', '/u'));
  }

  _render({minimized, narrow, drawerItems, user}) {
    const styles = html`
      <style>
        :host {
          width: 100%;
          height: 100vh;
          
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
        .section {
          background-color: #fefefe;
          border-top: 1px solid white;
          border-bottom: 1px solid #efefef;
        }
      </style>`;
    let userBlock = html`
      <mk-drawer-item-user 
        user="${user}" 
        minimized="${minimized}" 
        on-click="${() => {
      user ? this._navigateUserDashboard() : this._login();
    }}">
      </mk-drawer-item-user>
      ${user ? html`
        <mk-drawer-item
          icon="icons:exit-to-app" 
          text="Sign out"
          minimized="${minimized}"
          class="drawer-item"
          on-click="${() => this._logout()}">
        </mk-drawer-item>` : null}
    `;

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
          icon="${minimized ? 'icons:chevron-right' : 'icons:chevron-left'}"
          text="Minimize"
          class="drawer-item" 
          minimized="${minimized}" 
          on-click="${() => this.toggleDrawerMinimization()}">
        </mk-drawer-item>` :
      null;

    return html`
      ${styles}
      <div class="drawer-content">
        <div class="section drawer-pinned-top">${userBlock}</div>
        <div class="section drawer-dynamic">${dynamicItemsBlock}</div>
        <div class="section drawer-pinned-bottom">${bottomBlock}</div>
      </div>
    `;
  }
}

customElements.define('mk-drawer', MkDrawer);
