import {PageViewElement} from './page-view-element.js';
import {html} from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import {store} from '../store.js';
import {connect} from 'pwa-helpers/connect-mixin.js';

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
        this.dispatchEvent(new CustomEvent('open-dialog', {
            bubbles: true,
            composed: true,
            detail: {
                dialogContent: html`
                    <div class="modal-header">
                        <h2>New project</h2>
                    </div>
                    <div class="modal-content">
                        <paper-input required auto-validate label="Project name" value="{{newProject.name}}" error-message="This field is required !!!">
                        </paper-input>
                    </div>
                    <div class="modal-actions">
                        <paper-button dialog-dismiss>Cancel</paper-button>
                        <paper-button dialog-confirm on-click="_createNewProject">Create</paper-button>
                    </div>`,
            },
        }));
    }

    _render(props) {
        let styles = html`
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
            </style>
        `;

        let projectBlock = props._projects ?
            html`
                <ul>
                    ${Object.values(props._projects).map((project) => html`<li><a href="/${project.id}">${project.name}</a></li>`)}
                </ul>
             `:
            html`You don't have any project yet.<br/> Press button bellow to create new one.`;

        return html`
            ${styles}
        
            <h2 class="page-title">Dashboard</h2>
    
            <div class="page-content">
    
                <div class="section projects">
                    <h3 class="section-title">
                        Projects
                    </h3>
                    <div class="section-content">
                        ${projectBlock}
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
