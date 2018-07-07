import "./LeftPanel.css";
import React from "react";
import DashboardModal from 'uppy/lib/react/DashboardModal';

function template() {
  return (
    <div className="left-panel">
      <h1>LeftPanel</h1>
      <button onClick={this.handleOpen} className="UppyModalOpenerBtn">Upload some music</button>
      <DashboardModal
          className={".DashboardContainer"}
          uppy={this.props.uppy}
          closeModalOnClickOutside
          open={this.state.modalOpen}
          onRequestClose={this.handleClose}
          replaceTargetContent={true}
          plugins={['Webcam','Dashboard']}
        />
    </div>
  );
};

export default template;
