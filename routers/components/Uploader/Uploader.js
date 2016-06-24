import React from 'react'
import {
  BASE_PAGE_DIR,
  BASE_STATIC_DIR,
  CREATION,
  UPDATING,
  BROWSE,
  FETCH_UPLOAD_IMG
} from 'macros.js'
import {fetchable, fetchAuth} from 'fetch.js'
import Dropzone from 'react-dropzone'
import {
  getParentByClass
} from 'util.js'
let update = require('react-addons-update')


import './Uploader.less'
class Uploader extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
			files: []
    };
  };
	onDrop = (files) =>  {
		let len = files.length
	  files.forEach((file, index) =>　{
			var reader  = new FileReader();

			reader.addEventListener("load", () => {
				file.base64 = reader.result;

				if (--len == 0) {
					this.setState({
			      files: files
			    });
				}
			 }, false);

			reader.readAsDataURL(file);

		})

  };
  thisHandler = (e) => {
    let target
    if (target = getParentByClass(e.target, 'btn-upload')) {
      let data = {id: 7009}
      data.img = this.state.files[0].base64
      fetchable(FETCH_UPLOAD_IMG, {method: 'post', body: JSON.stringify(data)})
        .then((data) => {
          this.props.uploaderHandler(data);
        })
    }
  };
  componentDidMount = () => {
  };
  componentWillUnmount = () => {
  };
  render() {
    return (
      <div className="uploader-container" onClick={this.thisHandler}>
				<div className="adjust-wraper">
          <div className="iconfont icon-close close-uploader" />
					<Dropzone
						className="dropzone"
						activeClassName="dropzone-active"
						ref="dropzone"
						onDrop={this.onDrop}
					/>
					{
						this.state.files.map((file, index) => {
							return(
								<div className="preview">
									<div className="preview-img">
										<img src={file.base64} />
									</div>
									<div className="btn-upload">上传</div>
								</div>
							)
						})
					}
				</div>
      </div>
    )
  }
}
// Home.childContextTypes = {
//     pageSpin: React.PropTypes.node.isRequired
//   }
// Home.contextTypes = {
//     name: React.PropTypes.string.isRequired,
//     //router: React.PropTypes.func.isRequired
// }
// Home.context = {
//   //pageSpin: pageSpin
// }
module.exports = Uploader
