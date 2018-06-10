import {PageViewElement} from './page-view-element.js';
import {html} from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import {store} from '../store.js';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {Actions} from '../actions';

export default class MkUser extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      _user: Object,
      _projects: Array,
    };
  }

  _stateChanged(state) {
    this._user = state.auth.user;
    this._projects = state.userData.projects;
  }

  _openCreateProjectDialog() {
    store.dispatch(Actions.app.showDialog('mk-dialog-create-project'));
  }

  _renderStyles() {
    return html`
      <style>
        :host {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          padding: 0 16px;
        }

        .page-title {
          margin: 16px 0;
          height: 32px;
          line-height: 32px;
        }

        .section-action paper-button {
          text-decoration: underline;
        }
      </style>`;
  }

  _renderProjectList(projects) {
    if (projects) {
      return html`
        <ul>
          ${Object.values(projects).map((project) => html`<li><a href="/u/${project.id}">${project.name}</a></li>`)}
        </ul>`;
    } else {
      return html`You don't have any project yet.<br/> Press button bellow to create new one.`;
    }
  }

  _render({_projects}) {
    let styles = this._renderStyles();
    let projectList = this._renderProjectList(_projects);
    return html`
      ${styles}
  
      <h2 class="page-title">Dashboard</h2>

      <div class="page-content">

        <div class="section projects">
          <h3 class="section-title">
            Projects
          </h3>
          <div class="section-content">
            ${projectList}
          </div>
          <div class="section-action">
            <paper-button ripple on-click="${() => this._openCreateProjectDialog()}">New project...</paper-button>
          </div>
        </div>

      </div>
    `;
  }
}

customElements.define('mk-user', MkUser);
