import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';

class KanbanBoardContainer extends Component {
	constructor(){
		super(...arguments);
		this.state = {
			cards:[],
		};
		this.toggleTask = this.toggleTask.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
		this.addTask = this.addTask.bind(this);
		
	}
	
	componentDidMount(){
		fetch('./cards.json')
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({cards: responseData});
		})
		.catch((error) => {
			console.log('Error fetching and parsing data', error);
		});
	}
	
	addTask(cardId, taskName){
		// Keep a reference to the original state prior to the mutations
		// in case you need to revert the optimistic changes in the UI
		let prevState = this.state;

		// Find the index of the card
		let nextState = this.state.cards.concat([]);
		let cardIndex = nextState.findIndex((card)=>card.id == cardId);
		
		// Create a new task with the given name and a temporary ID
		let newTask = {id:Date.now(), name:taskName, done:false};
		nextState[cardIndex].tasks.push(newTask);
		
		// set the component state to the mutated object
		//console.log(nextState);
		this.setState({cards:nextState});
	}
	
	deleteTask(cardId, taskId, taskIndex){
		// Keep a reference to the original state prior to the mutations
		// in case you need to revert the optimistic changes in the UI
		let prevState = this.state;
		
		// Find the index of the card
		let nextState = this.state.cards.concat([]);
		let cardIndex = nextState.findIndex((card)=>card.id == cardId);
		
		nextState[cardIndex].tasks.splice(taskIndex,1);
		// set the component state to the mutated object
		//console.log(nextState);
		this.setState({cards:nextState});
	}
	
	toggleTask(cardId, taskId, taskIndex, evt){
		// Keep a reference to the original state prior to the mutations
		// in case you need to revert the optimistic changes in the UI
		let prevState = this.state;
		
		// Find the index of the card
		//evt.preventDefault();
		//console.log(evt.target.checked);
		let nextState = this.state.cards.concat([]);
		let cardIndex = nextState.findIndex((card)=>card.id == cardId);

		// you will change the done value to its opposite
		let newDoneValue = !nextState[cardIndex].tasks[taskIndex].done;
		nextState[cardIndex].tasks[taskIndex].done = newDoneValue;
		
		// set the component state to the mutated object
		this.setState({cards:nextState});
		//console.log(nextState);
		//console.log(this.state.cards);
	}
	
	render() {
		return <KanbanBoard cards={this.state.cards} 
		taskCallbacks={ {
			toggle: this.toggleTask,
			delete: this.deleteTask,
			add: this.addTask } } />
	}

}

export default KanbanBoardContainer;