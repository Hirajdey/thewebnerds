import React, {Component} from 'react';
import {Link} from "@reach/router";
import renderHTML from 'react-render-html';
import Moment from 'react-moment';
import Navbar from './Navbar';
import axios from 'axios'; 
import Loader from '../loding.gif';

class Home extends Component {
	
	constructor(props){
		super(props);

		this.state = {
			loading:false,
			posts: [],
			error: ''
		}
	}
	
	componentDidMount(){
		const wordPressSiteUrl = 'https://www.futuremedicineindia.com/';
		this.setState({loading:true}, () =>{
			axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/posts?categories=40&_embed`)
				.then(res =>{
					// console.log(res.data);
					this.setState({
						loading: false,
						posts: res.data 
					});
				})
				.catch( error => this.setState({loading:false,error:error.response.data.message}))
		})
	}
	
	render(){
		// console.log('state', this.state);
		const {posts, loading, error} = this.state;
		// const posts = this.state.posts;

		return(
			<div className="">
				<Navbar/>
				{error && <div className="error-allert mt-3">{error}</div>}
				
				{posts.length ? (
					<div className="mt-5 post-container container">
						<div className="row">
						{posts.map(post =>(
							<div key={post.id} className="col col-12 col-md-6 col-lg-4">
								<div className="card border-dark mb-3">
									<div className="card-header">
										<Link to={`/post/${post.id}`}>
											{post.title.rendered}
										</Link>
									</div>
									<div className="card-body">
										<div className="imgbox pb-3">
											<img className="w-100" src={post._embedded['wp:featuredmedia']['0'].source_url}/>
										</div>
										<div className="card-text post-content">
											{renderHTML(post.excerpt.rendered)}
										</div>
										<div className="card-footer">
											<Moment fromNow>{post.date}</Moment>
											<Link to={`/post/${post.id}`} className="btn btn-secondary float-right">Read More..</Link>	
										</div>
									</div>
								</div>
							</div>
						))}
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


export default Home;



