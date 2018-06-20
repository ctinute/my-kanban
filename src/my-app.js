import {html, LitElement} from '@polymer/lit-element';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';

import {connect} from 'pwa-helpers/connect-mixin.js';
import {installRouter} from 'pwa-helpers/router.js';
import {installOfflineWatcher} from 'pwa-helpers/network.js';
import {installMediaQueryWatcher} from 'pwa-helpers/media-query.js';

import {store} from './store.js';
import {APP_INITIAL_STATE} from './initial-state';

import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-dialog/paper-dialog.js';

import './screens/components/mk-drawer';

import './screens/mk-404.js';
import './screens/mk-home.js';
import './screens/mk-user.js';
import './screens/mk-project.js';
import './screens/mk-phase.js';
import {hideDialog, setAppDrawerMinimization, setNetworkStatus} from './actions/app';
import {login, logout} from './actions/auth';
import {changeRoute} from './actions/route';

class MyApp extends connect(store)(LitElement) {
  constructor() {
    super();
    setPassiveTouchGestures(true);

    this._ready = false;
    this._smallScreen = false;

    this._globalToast = APP_INITIAL_STATE.globalToast;
    this._globalDialog = APP_INITIAL_STATE.globalDialog;
    this._drawer = APP_INITIAL_STATE.drawer;
    this._toolbar = APP_INITIAL_STATE.toollbar;

    this._drawerItems = [{
      title: 'Dashboard',
      icon: 'icons:dashboard',
      link: 'dashboard',
    }];
  }

  static get properties() {
    return {
      _ready: Boolean,
      _page: String,
      _path: Array,
      _user: Object,
      _smallScreen: Boolean,

      _drawer: Object,
      _drawerItems: Array,
      _toolbar: Object,

      _offline: Boolean,
      _globalToast: Object,
      _globalDialog: Object,
      shouldRender: Boolean,
    };
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

  _firstRendered() {
    installRouter((location) => store.dispatch(changeRoute(location)));
    installOfflineWatcher((offline) => store.dispatch(setNetworkStatus(offline)));
    installMediaQueryWatcher('(max-width: 767px)', (matches) => this._smallScreen = matches);
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
        
        app-header {
          height: 64px;
        }
        app-header.hidden {
          height: 0;
        }
        
        main {
          width: 100%;
          height: 100%;
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
          padding: 16px;
          box-sizing: border-box;
        }
        app-header {
          max-height: 64px;
          overflow: hidden;
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-64px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-out {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(64px);
          }
        }
        .toolbar {
          width: 100%;
          position: absolute;
          box-sizing: border-box;
          animation: slide-in 0.5s ease forwards;
        }
        .toolbar.gone {
          animation: slide-out 0.5s ease forwards;
        }
        .toolbar.hidden {
          display: none;
        }
      </style>
    `;
  }

  _render({
            _ready,
            _page,
            _path,
            _user,
            _smallScreen,

            _drawer,
            _drawerItems,
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
    return html`
      ${styles}
      ${miniDrawerStyle}
      <app-drawer-layout fullbleed narrow="${_smallScreen}">
  
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="${_smallScreen}" opened="${_drawer.opened}">
          <mk-drawer 
            user="${_user}"
            minimized="${_drawer.minimized}" 
            drawer-items="${_drawerItems}"
            on-login="${() => store.dispatch(login())}"
            on-logout="${() => store.dispatch(logout())}"
            on-toggle-minimize="${(e) => store.dispatch(setAppDrawerMinimization(!e.detail.minimized))}"
            store="${store}">
          </mk-drawer>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout fullbleed>
          <app-header class$="${_toolbar.show? '' : 'hidden'}" slot="header" fixed condenses>
            <app-toolbar id="default-toolbar" class$="${!_toolbar.show ? 'toolbar hidden' : !_toolbar.showAction ? 'toolbar' : 'toolbar gone'}">
             ${_toolbar.default} 
            </app-toolbar>
            <app-toolbar id="action-toolbar" class$="${!_toolbar.show ? 'toolbar hidden' : _toolbar.showAction ? 'toolbar' : 'toolbar gone'}">
             ${_toolbar.action} 
            </app-toolbar>
          </app-header>
          <main id="pages" class$="${_toolbar.show? 'has-toolbar' : ''}">
            <mk-home class="screen" active?="${_page === 'home'}"></mk-home>
            <mk-user class="screen" active?="${_page === 'user'}"></mk-user>
            <mk-project class="screen" active?="${_page === 'project'}"></mk-project>
            <mk-phase class="screen" active?="${_page === 'phase'}"></mk-phase>
            <mk-404 class="screen" active?="${_page === '404'}"></mk-404>
          </main>

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
}

customElements.define('my-app', MyApp);
