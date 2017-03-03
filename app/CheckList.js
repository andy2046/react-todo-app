import React, { Component, PropTypes } from 'react';

class CheckList extends Component {
	constructor() {
		super(...arguments);
		this.checkInputKeyPress = this.checkInputKeyPress.bind(this);
	}

	checkInputKeyPress(evt){
		if(evt.key === 'Enter'){
			this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
			evt.target.value = '';
		}
	}
	
render() {
	let tasks = this.props.tasks.map((task,taskIndex) => ( <li key={task.id} className="checklist__task">
		<input type="checkbox" checked={task.done} onChange={ 
			this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)}  />
		{!task.done && ' '+task.name} {task.done && <s>{task.name}</s>} {' '}
		<a href="#" className="checklist__task--remove" onClick={ () => this.props.taskCallbacks.delete(this.props.cardId, task.id, taskIndex) } />
		</li> ) );

	return (
		<div className="checklist">
		<ul>{tasks}</ul>
		<input type="text"
		className="checklist--add-task"
		placeholder="Type then hit Enter to add a task" onKeyPress={this.checkInputKeyPress} />
		</div>
	);

}
};

CheckList.propTypes = {
cardId: PropTypes.number,
taskCallbacks: PropTypes.object,
tasks: PropTypes.arrayOf(PropTypes.object)
};

export default CheckList;