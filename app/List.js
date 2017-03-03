import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import Card from './Card';
import constants from './constants';

const listTargetSpec = {
hover(props, monitor) {
const draggedId = monitor.getItem().id;
props.cardCallbacks.updateStatus(draggedId, props.id)
}
};

function collect(connect, monitor) {
return {
connectDropTarget: connect.dropTarget()
};
}

class List extends Component {
render() {
const { connectDropTarget } = this.props;
var cards = this.props.cards.map((card) => {
return <Card key={card.id} taskCallbacks={this.props.taskCallbacks} cardCallbacks={this.props.cardCallbacks} 
id={card.id}
title={card.title}
description={card.description}
color={card.color}
tasks={card.tasks} />
});
return connectDropTarget(
<div className="list">
<div className="div1">
<h1>{this.props.title}</h1> <h4>{this.props.cards.length} PROJECTS</h4>
</div>
{cards}
</div>
);
}
};

List.propTypes = {
title: PropTypes.string.isRequired,
cards: PropTypes.arrayOf(PropTypes.object),
taskCallbacks: PropTypes.object,
cardCallbacks: PropTypes.object,
connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);