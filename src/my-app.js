import {html, LitElement} from '@polymer/lit-element';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';
import {connect, installMediaQueryWatcher, installOfflineWatcher, installRouter} from 'pwa-helpers';
import {store} from './store.js';
import {APP_INITIAL_STATE} from './initial-state';

import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-item/paper-icon-item';

import './screens/mk-404.js';
import './screens/mk-home.js';
import './screens/mk-user.js';
import './screens/mk-project.js';
import './screens/mk-phase.js';
import {hideDialog, setAppDrawerMinimization, setNetworkStatus} from './actions/app';
import {login, logout} from './actions/auth';
import {changeRoute, navigate} from './actions/route';

class MyApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      _ready: Boolean,
      _page: String,
      _path: Array,
      _user: Object,
      _smallScreen: Boolean,

      _drawer: Object,
      _toolbar: Object,

      _offline: Boolean,
      _globalToast: Object,
      _globalDialog: Object,
      shouldRender: Boolean,
    };
  }

  constructor() {
    super();

    this._ready = false;
    this._smallScreen = false;

    this._globalToast = APP_INITIAL_STATE.globalToast;
    this._globalDialog = APP_INITIAL_STATE.globalDialog;
    this._drawer = APP_INITIAL_STATE.drawer;
    this._toolbar = APP_INITIAL_STATE.toollbar;

    setPassiveTouchGestures(true);
    installRouter((location) => store.dispatch(changeRoute(location)));
    installOfflineWatcher((offline) => store.dispatch(setNetworkStatus(offline)));
    installMediaQueryWatcher('(max-width: 767px)', (matches) => this._smallScreen = matches);
  }

  _stateChanged(state) {
    this._ready = state.app.ready;
    this._page = state.route.page;
    this._path = state.route.path;
    this._user = state.auth.user;
    this._smallScreen = state.app.smallScreen;
    this._drawer = state.app.drawer;
    this._toolbar = state.app.toolbar;
    this._offline = state.app.offline;
    this._globalToast = state.app.globalToast;
    this._globalDialog = state.app.globalDialog;
  }

  _renderStyles() {
    return html`
      <!--suppress ALL -->
      <style>
        :host {
          display: block;
          position: relative;
          width: 100vw;
          height: 100vh;
          --app-primary-color: #202020;
          --app-secondary-color: #757575;
          --app-accent-color: #172C50;
          --paper-button-ink-color: var(--app-accent-color);
          --paper-icon-button-ink-color: var(--app-accent-color);
          --paper-spinner-color: var(--app-accent-color);
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          color: var(--app-primary-color);
        }
        
        app-drawer-layout {
          --app-drawer-width: 256px;
        }
        
        app-header-layout {}
        
        #main-content {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
        }
        
        app-header {
          height: 64px;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          
        }
        app-header.hidden {
          height: 0;
        }
        
        main {
          width: 100%;
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
        }
        
        main.has-toolbar {
          padding-top: 64px;
        }
        
        main > * {
          display: none;
        }
  
        main > [active] {
          display: block;
        }
        
        /* small screen */
        @media (max-width: 767px) {
          :host {
            padding-top: 64px;
          }
        }
        
        .screen {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
        app-header {
          max-height: 64px;
          overflow: hidden;
        }
        @keyframes slide-in {
          from {
            position: absolute;
            opacity: 0;
            transform: translateY(-64px);
          }
          to {
          position: relative;
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-out {
          from {
            position: relative;
            opacity: 1;
            transform: translateY(0);
          }
          to {
            position: absolute;
            opacity: 0;
            transform: translateY(64px);
          }
        }
        .toolbar {
          width: 100%;
          box-sizing: border-box;
          animation: slide-in 0.3s ease forwards;
        }
        .toolbar.gone {
          animation: slide-out 0.3s ease forwards;
        }
        .toolbar.hidden {
          display: none;
        }
      </style>
    `;
  }

  _onUserItemClick() {
    if (this._user) {
      store.dispatch(navigate('Dashboard', '/u'));
    } else {
      store.dispatch(login());
    }
  }

  _renderDrawer(show, minimized, user, items = []) {
    let drawerItemClasses = minimized ? 'drawer-item minimized' : 'drawer-item';
    let minimizeBtn = html`
      <paper-icon-item class$="${drawerItemClasses}" on-click="${() => this._toggleDrawerMinimization()}">
        <iron-icon slot="item-icon" icon="${minimized ? 'icons:chevron-right' : 'icons:chevron-left'}"></iron-icon>
        <div class="text">Minimize</div>
      </paper-icon-item>`;

    let userItem = html`
      <paper-icon-item class$="${drawerItemClasses}" on-click="${() => this._onUserItemClick()}">
        ${user ?
      html`<img class="icon" slot="item-icon" src="${user.photoURL}" alt="${user.displayName}"/>` :
      html`<iron-icon slot="item-icon" icon="icons:account-circle"></iron-icon>`}
        <div class$="${minimized ? 'text minimized' : 'text'}">${user ? user.displayName : 'Login or Register'}</div>
      </paper-icon-item>`;
    let logoutItem = user ? html`
      <paper-icon-item class$="${drawerItemClasses}" on-click="${() => store.dispatch(logout())}">
        <iron-icon slot="item-icon" icon="icons:exit-to-app"></iron-icon>
        <div class="text">Logout</div>
      </paper-icon-item>` : null;

    return html`
      <style>
        .drawer-item {
          height: 48px;
          width: 256px;
          --paper-item-icon-width: 40px;
          padding: 0 12px;
          box-sizing: border-box;
        }
        .drawer-item .text {
          flex-grow: 1;
          font-weight: normal;
          font-size: 16px;
          line-height: 1.5em;
          opacity: 1;
          margin-left: 4px;
          transition: opacity 0.3s ease;
        }
        .drawer-item iron-icon {
          margin: 4px;
        }
        .drawer-item img.icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
        .drawer-item.minimized .text {
          opacity: 0;
        }
        
        #drawer-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: column;
          overflow: hidden;
        }
        #drawer-content .section {
          width: 100%;
        }
        #drawer-content .pinned-top {
        }
        #drawer-content .dynamic {
          flex-grow: 1;
        }
        #drawer-content .pinned-bottom {
        }
        #drawer-content .separator {
          background-color: #fefefe;
          border-top: 1px solid #efefef;
          border-bottom: 1px solid #fff;
          width: 100%;
          height: 0;
        }
      </style>
      <div id="drawer-content">
        <div class="section pinned-top">
          ${userItem}
          ${logoutItem}
        </div>
        <div class="separator"></div>
        <div class="section dynamic">
          ${items.map((item) => html`
            <paper-icon-item class$="${drawerItemClasses}" on-click="${item.action}">
              <iron-icon slot="item-icon" icon="${item.icon}"></iron-icon>
              <div class="text">${item.title}</div>
            </paper-icon-item>
          `)}
        </div>
        <div class="separator"></div>
        <div class="section pinned-bottom">
          ${minimizeBtn}
        </div>
      </div>`;
  }

  _render({
            _ready,
            _page,
            _path,
            _user,
            _smallScreen,

            _drawer,
            _toolbar,

            _offline,
            _globalToast,
            _globalDialog,
          }) {
    const styles = this._renderStyles();

    const miniDrawerStyle = _drawer.minimized ? html`
      <style>
        app-drawer-layout {
          --app-drawer-width: 56px;
        }
      </style>` : null;

    let drawer = this._renderDrawer(_drawer.show, _drawer.minimized, _user, _drawer.items);

    return html`
      ${styles}
      ${miniDrawerStyle}
      <app-drawer-layout fullbleed narrow="${_smallScreen}">
  
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="${_smallScreen}" opened="${_drawer.opened}">
          ${drawer}
        </app-drawer>

        <!-- Main content -->
        <app-header-layout fullbleed>
          <div id="main-content">
            <app-header class$="${_toolbar.show ? '' : 'hidden'}" slot="header" fixed condenses>
              <app-toolbar id="default-toolbar" class$="${!_toolbar.show ? 'toolbar hidden' : !_toolbar.showAction ? 'toolbar' : 'toolbar gone'}">
               ${_toolbar.default} 
              </app-toolbar>
              <app-toolbar id="action-toolbar" class$="${!_toolbar.show ? 'toolbar hidden' : _toolbar.showAction ? 'toolbar' : 'toolbar gone'}">
               ${_toolbar.action} 
              </app-toolbar>
            </app-header>
            <main id="pages" class$="${_toolbar.show ? 'has-toolbar' : ''}">
              <mk-home class="screen" active?="${_page === 'home'}"></mk-home>
              <mk-user class="screen" active?="${_page === 'user'}"></mk-user>
              <mk-project class="screen" active?="${_page === 'project'}"></mk-project>
              <mk-phase class="screen" active?="${_page === 'phase'}"></mk-phase>
              <mk-404 class="screen" active?="${_page === '404'}"></mk-404>
            </main>
          </div>
        </app-header-layout>
      </app-drawer-layout>     
      
      <paper-dialog id="dialog" opened="${_globalDialog.show}" modal with-backdrop on-opened-changed="${this._onDialogVisibilityChanged}">
         ${_globalDialog.content}
      </paper-dialog>  
      
      <paper-toast 
        id="globalToast" 
        opened="${_globalToast.show}" 
        text="${_globalToast.message}" 
        duration="0"
        horizontal-align="right">
      </paper-toast>
    `;
  }

  _onDialogVisibilityChanged(e) {
    const opened = e.detail.value;
    if (!opened) {
      store.dispatch(hideDialog());
    }
  }

  _toggleDrawerMinimization() {
    store.dispatch(setAppDrawerMinimization(!this._drawer.minimized));
  }
}

customElements.define('my-app', MyApp);
