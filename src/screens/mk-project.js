import {PageViewElement} from './page-view-element.js';
import {html} from '@polymer/lit-element';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-icon-button';
import '@polymer/paper-card';
import {store} from '../store.js';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {Actions} from '../actions';
import './components/mk-dialog-create-phase';

export default class MkProject extends connect(store)(PageViewElement) {
  constructor() {
    super();
    this.user = null;
    this.project = null;
    this.projectId = null;
  }

  static get properties() {
    return {
      user: Object,
      project: Object,
      projectId: String,
    };
  }

  _stateChanged(state) {
    this.user = state.auth.user;
    this.projectId = state.route.data.projectId;
    this.project = state.userData.projects[this.projectId];
  }

  _openCreatePhaseDialog() {
    let createProject = (phase) => store.dispatch(Actions.phase.createPhase(phase, this.projectId));
    store.dispatch(Actions.app.showDialog(html`<mk-dialog-create-phase on-submit="${(e) => createProject(e.detail.phase)}"></mk-dialog-create-phase>`));
  }

  _renderStyles() {
    return html`
      <style>
        app-toolbar {
          background-color: white;
          color: black;
          font-weight: bold;
        }
        
        .content {
            box-sizing: border-box;
            padding: 16px;
        }
        
        .section {
            width: 100%;
            margin: 16px 0;
        }
      </style>
    `;
  }

  _navigateProjectDetailPage(projectName, projectId, phaseId) {
    store.dispatch(Actions.route.navigate(projectName, `/u/${projectId}/${phaseId}`));
  }

  _renderToolbar(project) {
    return html`
      <app-toolbar>
        <div main-title>My app</div>
        <paper-icon-button icon="delete"></paper-icon-button>
        <paper-icon-button icon="search"></paper-icon-button>
        <paper-icon-button icon="close"></paper-icon-button>
        <paper-progress value="10" indeterminate bottom-item></paper-progress>
      </app-toolbar>
    `;
  }

  _renderOverview(project) {
    let activePhaseId = project.currentPhase;
    let activePhase = project.phases[activePhaseId];
    return html`
      <div class="card-header">
        Current phase: ${activePhase.name}
      </div>
      <div class="card-content">
        some overall info
      </div>
      <div class="card-actions">
        <div class="horizontal justified">
          <paper-button on-click="${() => this._navigateProjectDetailPage(project.name, project.id, activePhaseId)}">View detail</paper-button>
        </div>
      </div>
    `;
  }

  _renderPhaseList(projectId, phases) {
    if (phases) {
      return html`
        <ul>
          ${Object.values(phases).map((phase) => html`<li><a href="/u/${projectId}/${phase.id}">${phase.name}</a></li>`)}
        </ul>`;
    } else {
      return html`You don't have any phase yet.<br/> Press button bellow to create new one.`;
    }
  }

  _renderPhases(project) {
    return html`
      <div class="card-header">
        Phases
      </div>
      <div class="card-content">
        ${this._renderPhaseList(project.id, project.phases)}
      </div>
      <div class="card-actions">
        <div class="horizontal justified">
            <paper-button ripple on-click="${() => this._openCreatePhaseDialog(project.id)}">New phase...</paper-button>
        </div>
      </div>
    `;
  }

  _render({project}) {
    let styles = this._renderStyles();
    let toolbar = this._renderToolbar(project);
    let overView = this._renderOverview(project);
    let phases = this._renderPhases(project);
    return html`
      ${styles}
      <app-header-layout>
        <app-header slot="header" fixed condenses effects="waterfall">
            ${toolbar}
        </app-header>
        <div class="content">
          <paper-card class="section overview">
            ${overView}
          </paper-card>
          <paper-card class="section phases">
            ${phases}
          </paper-card>
          <paper-card class="section"></paper-card>
        </div>
      </app-header-layout>
    `;
  }
}

customElements
  .define(
    'mk-project'
    ,
    MkProject
  )
;
