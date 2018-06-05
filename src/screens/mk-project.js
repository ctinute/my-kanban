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

  _renderPhases(project) {
    return html`
      <div class="card-content">
        <div class="cafe-header">
          Template
          <div class="cafe-location cafe-light">
            <iron-icon icon="communication:location-on"></iron-icon>
            <span>250ft</span>
          </div>
        </div>
        <div class="cafe-rating">
          <iron-icon class="star" icon="star"></iron-icon>
          <iron-icon class="star" icon="star"></iron-icon>
          <iron-icon class="star" icon="star"></iron-icon>
          <iron-icon class="star" icon="star"></iron-icon>
          <iron-icon class="star" icon="star"></iron-icon>
        </div>
        <p>$・Italian, Cafe</p>
        <p class="cafe-light">Small plates, salads &amp; sandwiches in an intimate setting.</p>
      </div>
      <div class="card-actions">
        <div class="horizontal justified">
          <paper-icon-button icon="icons:event"></paper-icon-button>
          <paper-button>5:30PM</paper-button>
          <paper-button>7:30PM</paper-button>
          <paper-button>9:00PM</paper-button>
          <paper-button class="cafe-reserve">Reserve</paper-button>
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
