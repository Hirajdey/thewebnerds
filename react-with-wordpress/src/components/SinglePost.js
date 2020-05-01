import React, {Component} from 'react';
import renderHTML from 'react-render-html';
import Moment from 'react-moment';
import Navbar from './Navbar';
import axios from 'axios'; 
import Loader from '../loding.gif';

class SinglePost extends Component{
	
	constructor(props){
		super(props);

		this.state = {
			loading:false,
			post: {},
			error: ''
		}
	}

	componentDidMount(){
		console.log(this.props.id);
		const wordPressSiteUrl = 'https://www.futuremedicineindia.com/';
		this.setState({loading:true}, () =>{
			axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/posts/${this.props.id}?_embed`)
				.then(res =>{
					// console.log(res.data);
					this.setState({
						loading: false,
						post: res.data 
					});
				})
				.catch( error => this.setState({loading:false,error:error.response.data.message}))
		})
	}
	

	render(){

		const {post, error, loading} = this.state;

		return(
			<div>
				<Navbar/>
				{error && <div className="error-allert mt-3">{error}</div>}
				
				{Object.keys(post).length ? (
					<div className="mt-5 post-container container">
						<div className="row">
							<div key={post.id} className="col col-12 col-md12 col-lg-12">
								<div className="card border-dark mb-3">
									<div className="card-header">
											{post.title.rendered}
									</div>
									<div className="card-body">
										<div className="imgbox pb-3">
											<img className="w-100" src={post._embedded['wp:featuredmedia']['0'].source_url} alt={post.title.rendered}/>
										</div>
										<div className="card-text post-content">
											{renderHTML(post.content.rendered)}
										</div>
										<div className="card-footer">
											<Moment fromNow>{post.date}</Moment>
										</div>
									</div>
								</div>
							</div>
		
						</div>
					</div>	
				) : '' }

				<div className="container">
					{loading && <img className="loader" src={Loader}/>}
				</div>
			</div>
		)
	}

}

export default SinglePost;


