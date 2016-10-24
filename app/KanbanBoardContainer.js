import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import {throttle} from './utils';
import 'whatwg-fetch';

class KanbanBoardContainer extends Component {
	constructor(){
		super(...arguments);
		this.state = {
			cards:[],
		};
		this.toggleTask = this.toggleTask.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
		this.addTask = this.addTask.bind(this);
		
		// Only call updateCardStatus when arguments change
		this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
		// Call updateCardPosition at max every 500ms (or when arguments change)
		this.updateCardPosition = throttle(this.updateCardPosition.bind(this),500);
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
	
	updateCardStatus(cardId, listId){
		// Find the index of the card
		let nextState = this.state.cards.concat([]);
		let cardIndex = nextState.findIndex((card)=>card.id == cardId);
		// Get the current card
		let card = nextState[cardIndex];
		// Only proceed if hovering over a different list
		if(card.status !== listId){
			// set the component state to the mutated object
			nextState[cardIndex].status = listId;
			this.setState({cards:nextState});
		}
	}
	
	updateCardPosition (cardId , afterId) {
		// Only proceed if hovering over a different card
		if(cardId !== afterId) {
			// Find the index of the card
			let nextState = this.state.cards.concat([]);
			let cardIndex = nextState.findIndex((card)=>card.id == cardId);
			// Get the current card
			let card = nextState[cardIndex];
			// Find the index of the card the user is hovering over
			let afterIndex = nextState.findIndex((card)=>card.id == afterId);
			// Use splice to remove the card and reinsert it a the new index
			nextState.splice(cardIndex, 1);
			nextState.splice(afterIndex, 0, card);
			this.setState({cards:nextState});
		}
	}
	
	addCard(card){
		// Keep a reference to the original state prior to the mutations
		// in case we need to revert the optimistic changes in the UI
		let prevState = this.state;
		// Add a temporary ID to the card
		if(card.id===null){
			let card = Object.assign({}, card, {id:Date.now()});
		}
		// Create a new object and push the new card to the array of cards
		let nextState = this.state.cards.concat([]);
		nextState.push(card);
		// set the component state to the mutated object
		this.setState({cards:nextState});

	}
	
	updateCard(card){
		// Keep a reference to the original state prior to the mutations
		// in case we need to revert the optimistic changes in the UI
		let prevState = this.state;
		// Find the index of the card
		let nextState = this.state.cards.concat([]);
		let cardIndex = nextState.findIndex((c)=>c.id == card.id);
		// we will change the whole card
		nextState[cardIndex] = card;
		// set the component state to the mutated object
		this.setState({cards:nextState});
	}
	
	render() {
		let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
			cards: this.state.cards,
			taskCallbacks:{
				toggle: this.toggleTask.bind(this),
				delete: this.deleteTask.bind(this),
				add: this.addTask.bind(this)
			},
			cardCallbacks:{
				addCard: this.addCard.bind(this),
				updateCard: this.updateCard.bind(this),
				updateStatus: this.updateCardStatus.bind(this),
				updatePosition: throttle(this.updateCardPosition.bind(this),500),
			}
			});
		return kanbanBoard;
	}

}

export default KanbanBoardContainer;