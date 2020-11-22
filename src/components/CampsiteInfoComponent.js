import React, { Component } from 'react';
import { Card, CardImg,CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { /**/
            selectedCampsite: null
        };
    }

    renderCampsite(campsite){
        return(
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name}/>
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        );
    }

   renderComements(comments){
    const comment = this.props.campsite.comments
        return(
            <div className="col-md -5 m-1">
                <h4>Comments</h4>
                {comment.comments.map(comment =>{
                    <div key={comment.id} className="mb-3">
                        {comment.text}<br/>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                </div>

                }
                        
                        )}
            </div>
        );
    }

    render(){
        const campsite=this.props.campsite
        if(campsite){
        return(
        <div class='row'>
            {this.renderCampsite(this.props.campsite)}
            {this.renderComments(this.props.campsite)}
        </div>
        
        );
    }
    return(
        <div/>
    )

    }
}

export default CampsiteInfo;