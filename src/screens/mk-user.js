import {html} from '@polymer/lit-element';
import {MkScreen} from './mk-screen';
import '@polymer/paper-button';
import '@polymer/paper-card';
import '@polymer/iron-icons/iron-icons';
import './components/mk-dialog-create-project';
import {showDialog} from '../actions/app';
import {createProject} from '../actions/project';

export default class MkUser extends MkScreen {
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

  _didRender(props, oldProps, changedProps) {
    super._didRender(props, oldProps, changedProps);
    this._requireDefaultToolbar();
    this._setDefaultToolbar(html`
      <div main-title>
        <h3 class="page-title">Dashboard</h3>
      </div>
    `);
    this._showToolbar();
  }

  _openCreateProjectDialog() {
    let createNweProject = (project) => this._dispatch(createProject(project));
    this._dispatch(showDialog(html`<mk-dialog-create-project on-submit="${(e) => createNweProject(e.detail.project)}"></mk-dialog-create-project>`));
  }

  _renderStyles() {
    return html`
      <style>
        :host {
          width: 100%;
          height: 100%;
          display: block;
        }
        .section {
          padding: 0 16px;
        }

        .section-action paper-button {
          text-decoration: underline;
        }
        .list.project {}
        .item.project {
          display: flex;
          align-items: center;
          flex-direction: row;
          width: 100%;
          margin: 8px 0;
          padding: 0 16px;
          overflow: hidden;
          transition: margin 0.3s 0.2s, box-shadow 0.5s ease;
          will-change: margin, box-shadow;
        }
        .item.project > .title, 
        .item.project > .actions {
          display: inline-block;
        }
        .item.project > .title {
          font-size: 16px;
          height: 48px;
          line-height: 48px;
          text-decoration: none;
          flex-grow: 1;
        }
        .item.project > .actions {
          color: black;
          transform: translateX(150%);
          transition: transform 0.3s 0.2s; 
        }
        .item.project > .actions > iron-icon {
          margin: 0 4px;
          padding: 4px;
          border-radius: 50%;
        }
        .item.project > .actions > iron-icon:hover {
          background-color: #B0BEC5;
          cursor: pointer;
        }
        .item.project:hover {
          /*margin: 16px 0;*/
          box-shadow: var(--shadow-elevation-4dp_-_box-shadow);
        }
        .item.project:hover > .actions {
          transform: translateX(0); 
        }
      </style>`;
  }

  _renderProjectItem(project) {
    return html`
      <paper-card class="item project" elevation="0">
        <a class="title" href="/u/${project.id}">${project.name}</a>
        <div class="actions">
          <iron-icon icon="icons:create"></iron-icon>
          <iron-icon icon="icons:delete"></iron-icon>
        </div>
      </paper-card>
    `;
  }

  _renderProjectList(projects) {
    if (projects) {
      return html`
        <div class="list projects">
          ${Object.values(projects).map((project) => this._renderProjectItem(project))}
        </div>`;
    } else {
      return html`You don't have any project yet.<br/> Press button bellow to create new one.`;
    }
  }

  _render({_projects}) {
    let styles = this._renderStyles();
    let projectList = this._renderProjectList(_projects);
    return html`
      ${styles}
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
    `;
  }
}

customElements.define('mk-user', MkUser);
