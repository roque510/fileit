import React    from "react";
import * as firebase from 'firebase';
import { database } from '../Firebase.js';
import _ from 'lodash';
import swal from 'sweetalert2';
import Adapter from 'enzyme-adapter-react-16';


import "./Home.css";
import MenuBar from "../menuBar/menuBar";
import LeftPanel from "../LeftPanel/LeftPanel";
import RightPanel from "../RightPanel/RightPanel";
import FooterPanel from "../FooterPanel/FooterPanel";
import { connect } from 'react-redux';

import { getPartidos } from '../Actions/torneoActions';
import { Field, reduxForm, reset } from 'redux-form';

const Uppy = require('uppy/lib/core')
const Tus = require('uppy/lib/plugins/Tus')
const XHRUpload = require('uppy/lib/plugins/XHRUpload')
const DragDrop = require('uppy/lib/react/DragDrop')

const uppy = Uppy({
  debug: true,
  autoProceed: false,
  restrictions: {
    maxFileSize: 1000000,
    maxNumberOfFiles: 3,
    minNumberOfFiles: 2,
    allowedFileTypes: ['image/*', 'video/*']
  }
});

uppy.on('complete', (result) => {
	// const url = result.successful[0].uploadURL
	let last = result.successful.length - 1;
	let imageURL = result.successful[last].preview;
	console.log("blob",imageURL);
	let task = "";
	var getFileBlob = function (url, cb) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.responseType = "blob";
		xhr.addEventListener('load', function() {
			cb(xhr.response);
		});
		xhr.send();
	};
	

	let storageRef = firebase.storage().ref('productos/test');
	getFileBlob(imageURL, blob =>{
		task = storageRef.put(blob);
	})



    function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

   

    task.on('state_changed',
      function progress(snapshot) {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // size.innerHTML = formatBytes(snapshot.totalBytes);
        // pbar.value = percentage;
      },
      function error(err){
        alert("oops, something happend!",err);
      },
      function complete(pic){
        database.push({
          nombre: "NAME",
          precio: "PRICE",
          desc: "DESC",
          url: task.snapshot.downloadURL,
          categoria: "CAT",
          subcategoria: "SUBCAT"
        });
        const toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        
        toast({
          type: 'success',
          title: 'Product uploaded!'
        })
        // pCon.style.display = "none";
        // toast.classList.add("on");

      }
    )
})

function mapStateToProps(state) {
  return {
    torneos: state.torneos
  };
}


class Home extends React.Component {
	constructor(){
		super();

		this.increment = this.increment.bind(this);
	}

	_method(){
		return true;
	}

	signOut(e) {
	    e.preventDefault();
	    const user = firebase.auth().signOut().then(function() {
	      // Sign-out successful.
	      swal({title:'Que tengas un excelente dia!',toast: true,position:"top-end",showConfirmButton: false,timer: 2000,});
	    }).catch(function(error) {
	      // An error happened.
	      swal("Yikes somethng HAPPEND","error");
			});
			
			return user;
		}

	componentDidMount(){
		var user = firebase.auth().currentUser;
		if (user != null) {
		  user.providerData.forEach(function (profile) {
		    console.log(user);
		  });
		}
	}

	componentWillMount() {
		this.props.getPartidos();
	}

  render() {	
    return (
  	
    <div className="home DashboardContainer">
    	<MenuBar signOut={this.signOut}></MenuBar>
    	<LeftPanel uppy={uppy}></LeftPanel>
			<RightPanel></RightPanel>
      	{/* { _.map(this.props.torneos, (torneo, key) => {
      		return (
      			<div key={key}>
	      			<h1>{key}</h1>
	      			<div>{torneo.equipo1}</div>
	      			<div>{torneo.equipo2}</div>
      			</div>
      		);

      	} )} */}
      	<FooterPanel></FooterPanel>
    </div>
    
  );
  }
}

let form = reduxForm({
	form: 'NewPost'
})(Home);

form = connect(mapStateToProps,{ getPartidos })(form);



export default connect(mapStateToProps,{ getPartidos })(Home);;
