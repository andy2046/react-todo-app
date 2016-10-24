import React, {Component, PropTypes} from 'react';

class CardForm extends Component {

handleChange(field, e){
this.props.handleChange(field, e.target.value);
}

handleClose(e){
e.preventDefault();
this.props.handleClose();
}

render(){

return (
<div>

<div className="card big">

<form onSubmit={this.props.handleSubmit.bind(this)}>

<div className="input-group">
<span className="input-group-addon" id="title-span">Title</span>
<input type='text' id="title" className="form-control" aria-describedby="title-span"
value={this.props.draftCard.title}
onChange={this.handleChange.bind(this,'title')}
placeholder="Title"
required={true}
autoFocus={true} />
</div>

<br />

<div className="input-group">
<span className="input-group-addon" id="description-span">Description</span>
<textarea rows="1" id="description" value={this.props.draftCard.description} className="form-control" aria-describedby="description-span"
onChange={this.handleChange.bind(this,'description')}
placeholder="Description"
required={true} />
</div>

<br />

<div className="input-group">
<span className="input-group-addon" id="status-span">Status</span>
<select id="status" className="form-control" aria-describedby="status-span"
value={this.props.draftCard.status}
onChange={this.handleChange.bind(this,'status')}>
<option value="todo">To Do</option>
<option value="in-progress">In Progress</option>
<option value="done">Done</option>
</select>
</div>

<br />

<div className="input-group">
<span className="input-group-addon" id="color-span">Color</span>
<input id="color" className="form-control" aria-describedby="color-span"
value={this.props.draftCard.color}
onChange={this.handleChange.bind(this,'color')}
type="color"
defaultValue="#ff0000" />
</div>

<br />

<div className='actions'>
<button type="submit" className="btn btn-success">{this.props.buttonLabel}</button>
</div>

</form>

</div>

<div className="overlay" onClick={this.handleClose.bind(this)}>
</div>

</div>
);
}

}

CardForm.propTypes = {
buttonLabel: PropTypes.string.isRequired,
draftCard: PropTypes.shape({
title: PropTypes.string,
description: PropTypes.string,
status: PropTypes.string,
color: PropTypes.string
}).isRequired,
handleChange: PropTypes.func.isRequired,
handleSubmit: PropTypes.func.isRequired,
handleClose: PropTypes.func.isRequired,
}

export default CardForm;
