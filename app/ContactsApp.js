import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';

// Main (stateful) component.
// Renders a SearchBar and a ContactList
// Passes down filterText state and handleUserInput callback as props

class ContactsAppContainer extends Component {
constructor(){
super();
this.state={
contacts: []
};
}

componentDidMount(){
fetch('./contacts.json')
.then((response) => { return response.json();})
.then((responseData) => { this.setState({contacts: responseData});})
.catch((error) => {
console.log('Error fetching and parsing data', error);
});
}

render(){
return (
<ContactsApp contacts={this.state.contacts} />
);
}
}

class ContactsApp extends Component {
constructor(){
super();
this.state={
filterText: ''
};
}
handleUserInput(searchTerm){
this.setState({filterText:searchTerm})
}
render(){
return(
<div>
<SearchBar filterText={this.state.filterText}
onUserInput={this.handleUserInput.bind(this)} />
<ContactList contacts={this.props.contacts}
filterText={this.state.filterText}/>
</div>
)
}
}

ContactsApp.propTypes = {
contacts: PropTypes.arrayOf(PropTypes.object)
}

// Pure component that receives 2 props from the parent
// filterText (string) and onUserInput (callback function)

class SearchBar extends Component {
handleChange(event){
this.props.onUserInput(event.target.value)
}
render(){
return <input className="form-control" type="search"
placeholder="search"
value={this.props.filterText}
onChange={this.handleChange.bind(this)} />
}
}

SearchBar.propTypes = {
onUserInput: PropTypes.func.isRequired,
filterText: PropTypes.string.isRequired
}

// Pure component that receives both contacts and filterText as props
// The component is responsible for actualy filtering the
// contacts before displaying them.
// It's considered a pure component because given the same
// contacts and filterText props the output will always be the same.

class ContactList extends Component {
render(){
let filteredContacts = this.props.contacts.filter(
(contact) => contact.name.indexOf(this.props.filterText) !== -1
);
return(
<ul className="list-group">
{filteredContacts.map(
(contact,index) => { let rtli = "list-group-item list-group-item-action list-group-item-info"; 
if(index%2==0) {rtli = "list-group-item list-group-item-action list-group-item-success";} 
return <ContactItem cls={rtli} key={contact.email}
name={contact.name}
email={contact.email} /> }
)}
</ul>
)
}
}

ContactList.propTypes = {
contacts: PropTypes.arrayOf(PropTypes.object),
filterText: PropTypes.string.isRequired
}

class ContactItem extends Component {
render() {
return <li className={this.props.cls}>{this.props.name} - {this.props.email}</li>
}
}

ContactItem.propTypes = {
name: PropTypes.string.isRequired,
email: PropTypes.string.isRequired
}


render(<ContactsAppContainer />, document.getElementById('rootContactsApp'));

