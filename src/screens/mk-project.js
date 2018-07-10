import {html} from '@polymer/lit-element';
import '@polymer/paper-icon-button';
import '@polymer/paper-card';
import './components/mk-dialog-create-phase';
import {MkScreen} from './mk-screen';
import {createPhaseAction, deletePhaseAction} from '../actions/phase';
import {showDialog} from '../actions/app';
import {navigate} from "../actions/route";

export default class MkProject extends MkScreen {
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

  _didRender(props, oldProps, changedProps) {
    super._didRender(props, oldProps, changedProps);
    this._requireDefaultToolbar();
    this._setDefaultToolbar(html`
      <div class="page-title">
        <a href="/u/${props.project.id}">${props.project.name}</a>
      </div>
    `);
    this._showToolbar();
    this._requireDrawerShorcuts([
      {
        icon: 'icons:dashboard',
        title: 'Dashboard',
        action: () => this._dispatch(navigate('Dashboard', '/u')),
      },
      {
        icon: 'icons:view-agenda',
        title: 'Phases',
        active: true,
        action: () => this._dispatch(navigate('Dashboard', `/u/${this.project.id}`)),
      },
      {
        icon: 'icons:view-day',
        title: 'Current phase',
        action: () => this._dispatch(navigate('Dashboard', `/u/${this.project.id}/${this.project.currentPhase}`)),
      },
    ]);
  }

  _openCreatePhaseDialog() {
    let createPhase = (phase) => {
      phase.projectId = this.projectId;
      this._dispatch(createPhaseAction(phase));
    };
    let dialog = html`<mk-dialog-create-phase on-submit="${(e) => createPhase(e.detail.phase)}"></mk-dialog-create-phase>`;
    this._dispatch(showDialog(dialog));
  }

  _renderStyles() {
    return html`
      <style>
        :host {
          width: 100%;
          height: 100%;
          display: block;
          overflow-y: scroll;
        }
        .section {
          width: 100%;
          padding: 0 16px;
          box-sizing: border-box;
        }
        .list.phase {}
        .item.phase {
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
        .item.phase > .title, 
        .item.phase > .actions {
          display: inline-block;
        }
        .item.phase > .title {
          font-size: 16px;
          height: 48px;
          line-height: 48px;
          text-decoration: none;
          flex-grow: 1;
        }
        .item.phase > .actions {
          color: black;
          transform: translateX(150%);
          transition: transform 0.3s 0.2s; 
        }
        .item.phase > .actions > iron-icon {
          margin: 0 4px;
          padding: 4px;
          border-radius: 50%;
        }
        .item.phase > .actions > iron-icon:hover {
          background-color: #B0BEC5;
          cursor: pointer;
        }
        .item.phase:hover {
          /*margin: 16px 0;*/
          box-shadow: var(--shadow-elevation-4dp_-_box-shadow);
        }
        .item.phase:hover > .actions {
          transform: translateX(0); 
        }
      </style>
    `;
  }

  _navigateProjectDetailPage(projectName, projectId, phaseId) {
    this._dispatch(Actions.route.navigate(projectName, `/u/${projectId}/${phaseId}`));
  }

  _renderOverview(project) {
    return html`
      <h2 class="sectiom-header">Overview</h2>
      <div class="section-content">
        <span><i>Nothing yet</i></span>
      </div>`;
  }

  _deletePhase(phase) {
    this._dispatch(deletePhaseAction(phase));
  }

  _renderPhaseItem(phase, projectId) {
    return html`
      <paper-card class="item phase" elevation="0">
        <a class="title" href="/u/${projectId}/${phase.id}">${phase.name}</a>
        <div class="actions">
          <iron-icon icon="icons:create"></iron-icon>
          <iron-icon icon="icons:delete" on-click="${() => this._deletePhase(phase)}"></iron-icon>
        </div>
      </paper-card>
    `;
  }

  _renderPhases(project) {
    let phaseList = project.phases ?
      html`
        <div class="list phases">
          ${Object.values(project.phases).map((phase) => this._renderPhaseItem(phase, project.id))}
        </div>` :
      html`You don't have any phase yet.<br/> Press button bellow to create new one.`;
    return html`
      <h2 class="sectiom-header">Phases</h2>
      <div class="section-content">
        ${phaseList}
        <div class="list-actions">
          <paper-button ripple on-click="${() => this._openCreatePhaseDialog(project.id)}">New phase...</paper-button>
        </div>
      </div>`;
  }

  _render({project}) {
    let styles = this._renderStyles();
    let overView = this._renderOverview(project);
    let phases = this._renderPhases(project);
    return html`
      ${styles}
      <div class="section overview">
        ${overView}
      </div>
      <div class="section phases">
        ${phases}
      </div>
      <div class="section"></div>
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
