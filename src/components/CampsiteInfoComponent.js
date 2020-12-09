import React , {Component} from 'react';
import {Card, CardImg, CardText, CardBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import Breadcrumb from 'reactstrap/lib/Breadcrumb';
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem';
import {Button, Modal, ModalHeader, ModalBody,Label} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength=len=>val=>val&&(val.length>=len);

    function RenderCampsite({campsite}) {
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name}/>
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
    function RenderComments({comments, addComment, campsiteId}){
        console.log(comments);
        if(comments){
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    <div> {comments.map(comment=> <div key={comment.id}> {comment.text} <br /> -- {comment.author}, {new Intl.DateTimeFormat('en-US', 
                    { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>)}  </div>
                    <CommentForm campsiteId={campsiteId} addComment={addComment} />
                </div>
            );
        }
        return <div/>;
    }
    function CampsiteInfo(props) {

        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }

        if(props.campsite){
            return(
                <div className ="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/directory'>Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite ={props.campsite} />
                        <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                    </div>
                </div>
            );
        }
        return <div />;
    }
    class CommentForm extends Component{
        constructor(props){
            super(props);
        
            this.state={
                isModalOpen:false,
                author:'',
                rating:'',
                text:'',
                touched:{
                    author: false,
                    rating: false,
                    text: false
                }
            };
            this.toggleModal=this.toggleModal.bind(this);
        }
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
        handleSubmit(values){
            this.toggleModal();
            this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        }
        render(){
            return(
                <React.Fragment>
                    <Button outline color ="secondary" className="fa fa-lg fa-pencil"  onClick={this.toggleModal}>
                        Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={values=>this.handleSubmit(values)}>
                                    <div className="form-group">
                                        <Label htmlFor="Rating" style={{textAlign: 'left'}}>Rating</Label>
                                            <Control.select  className="form-control" model=".rating" name="rating">
                                                <option value="null">Choose One...</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </Control.select>
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="Author" style={{textAlign:'left'}}>Your Name</Label>
                                            <Control.text model=".author" name="author"
                                                placeholder="Your Name"
                                                className="form-control"
                                                validators={{
                                                    required,
                                                    minLength: minLength(2),
                                                    maxLength: maxLength(15)
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".author"
                                                show="touched"
                                                component="div"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be at least 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="Comment" style={{textAlign: 'left'}}>Comment</Label>
                                            <Control.textarea model=".text" id="text" rows="6" className="form-control"/>
                                    </div>
                                    <Button type="submit" color="primary"> Submit</Button>
                                </LocalForm>
                            </ModalBody>
                        </Modal>
                </React.Fragment>
            );
        }
    }
export default CampsiteInfo;