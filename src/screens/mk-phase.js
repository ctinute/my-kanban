/* eslint-disable no-console */
import {PageViewElement} from './page-view-element.js';
import {html} from '@polymer/lit-element';
import {store} from '../store.js';
import {connect} from 'pwa-helpers/connect-mixin.js';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-icon-button';
import '@polymer/paper-card';
import './components/mk-stage-list';
import './components/mk-dialog-create-stage';
import {Actions} from '../actions';
import {move} from '../actions/stage';


export default class MkPhase extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      user: Object,
      projectId: String,
      phaseId: String,
      project: Object,
      phase: Object,
      showToolbar: Boolean,
      selectedStageIndex: Number,
    };
  }

  _stateChanged(state) {
    this.user = state.auth.user;
    this.projectId = state.route.data.projectId;
    this.phaseId = state.route.data.phaseId;
    this.project = state.userData.projects[this.projectId];
    this.phase = this.project ? this.project.phases[this.phaseId] : null;
    this.selectedStageIndex = -1;
    this.showToolbar = false;
  }

  _createStage(stage) {
    store.dispatch(Actions.stage.add(stage, this.projectId, this.phaseId));
  }
  _openCreateStageDialog() {
    let dialog = html`
      <mk-dialog-create-stage
        on-submit="${(e) => this._createStage(e.detail.stage)}"
        on-cancel="${() => console.log('cancelled')}"></mk-dialog-create-stage>`;
    store.dispatch(Actions.app.showDialog(dialog, null));
  }

  _renderStyles() {
    return html`
      <style>
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        .content {
            width: 100%;
            height: 100%;
            padding-top: 16px;
        }
        app-header-layout > .content {
          padding: 16px 0;
          height: 100%;
        }
        app-header {
          height: 64px;
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
        .toolbar.hidden {
          animation: slide-out 0.5s ease forwards;
        }
        
        .horizontal-list {
          width: auto;
          white-space: nowrap;
          overflow-y: hidden;
          overflow-x: scroll;
        }
        .horizontal-list > .list-item {
          display: inline-block;
          vertical-align: top;
        }
        
        mk-stage-list {
            height: 100%;
            width: auto;
        }
        
        #new-stage {
          display: inline-block;
          vertical-align: top;
          width: 256px;
          margin: 0 16px;
          padding: 8px;
          font-size: 1.2em;
          line-height: 2.5em;
          height: 2.5em;
          text-align: center;
        }
      </style>
    `;
  }

  _moveStage(src, des) {
    store.dispatch(move(src, des, this.projectId, this.phaseId));
  }

  _onSelectStage(e) {
    this.showToolbar = e.detail.selected;
    this.selectedStage = e.detail.stageId;
  }

  _deselectStage() {
    // TODO: not working
    this.selectedStageIndex = -1;
  }

  _render({project, phase, showToolbar, selectedStageIndex}) {
    let styles = this._renderStyles();
    let stages = this._createDisplayStages(phase);
    return html`
      ${styles}
      <app-header class="app-header" slot="header" fixed condenses effects="waterfall">
        <app-toolbar class$="${showToolbar?'toolbar hidden':'toolbar'}">
          <div main-title>
            <a href="/u/${project.id}">${project.name}</a>
            <span class="title-seperator"> / </span>
            <a href="/u/${project.id}/${phase.id}">${phase.name}</a>
          </div>
        </app-toolbar>
        <app-toolbar class$="${showToolbar?'toolbar':'toolbar hidden'}">
          <div main-title>Select an action</div>
          <paper-icon-button icon="edit"></paper-icon-button>
          <paper-icon-button icon="delete"></paper-icon-button>
          <paper-icon-button icon="close" on-click="${() => this._deselectStage()}"></paper-icon-button>
        </app-toolbar>
      </app-header>
      <div class="content horizontal-list">
        <mk-stage-list 
          id="stageList"
          class="list-item"
          stages="${stages}"
          selectedIndex="${selectedStageIndex}"
          on-stage-selection-changed="${(e) => this._onSelectStage(e)}"
          on-move-stage="${(e) => this._moveStage(e.detail.oldIndex, e.detail.newIndex)}"
          on-move-task="${(e) => console.log(e)}">
        </mk-stage-list>
        <div class="list-item">
          <paper-button id="new-stage" flat on-click="${() => this._openCreateStageDialog()}">New stage</paper-button>
        </div>
      </div>
    `;
  }

  _createDisplayStages(phase) {
    let stages = [];
    // re-order stage details
    for (let i = 0; i < phase.stages.length; i++) {
      let stage = JSON.parse(JSON.stringify(phase.stageDetails[phase.stages[i]]));
      // add cards to stage detail
      if (stage.tasks) {
        for (let j = 0; j < stage.tasks.length; j++) {
          stage.tasks[j] = phase.taskDetails[stage.tasks[j]];
        }
      } else {
        stage.tasks = [];
      }
      stages.push(stage);
    }
    return stages;
  }
}

customElements.define('mk-phase', MkPhase);
