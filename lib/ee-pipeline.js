'use babel';

import EePipelineView from './ee-pipeline-view';
import { CompositeDisposable } from 'atom';

export default {

  eePipelineView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.eePipelineView = new EePipelineView(state.eePipelineViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.eePipelineView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ee-pipeline:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.eePipelineView.destroy();
  },

  serialize() {
    return {
      eePipelineViewState: this.eePipelineView.serialize()
    };
  },

  toggle() {
    console.log('EePipeline was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
