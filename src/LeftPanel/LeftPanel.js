import React    from "react";
import template from "./LeftPanel.jsx";
const GoogleDrive = require('uppy/lib/plugins/GoogleDrive');
const Dropbox = require('uppy/lib/plugins/Dropbox');
const Instagram = require('uppy/lib/plugins/Instagram');
const Webcam = require('uppy/lib/plugins/Webcam');
const Dashboard = require('uppy/lib/plugins/Dashboard');



class LeftPanel extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      modalOpen: false
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen () {
    this.setState({
      modalOpen: true
    })
  }

  handleClose () {
    this.setState({
      modalOpen: false
    })
  }

  componentDidMount(){
    this.props.uppy.use(Dashboard, {
      inline: true,
      target: '.DashboardContainer',
      replaceTargetContent: false,
      showProgressDetails: true,
      note: 'Images and video only, 2–3 files, up to 1 MB',
      height: 470,
      metaFields: [
        { id: 'name', name: 'Name', placeholder: 'file name' },
        { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
      ],
      browserBackButtonClose: true
    });
    
    this.props.uppy.use(Webcam, { target: Dashboard,facingMode: 'environment', })

    
  }
  
  render() {

    return template.call(this);
  }
}

export default LeftPanel;
