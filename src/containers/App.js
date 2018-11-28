import React, { Component } from 'react';
import classes from './App.module.css';
import Person from '../components/Persons/Person/Person';

class App extends Component {

  state = {
    persons: [
      { id: 'asdf', name: 'Geoffrey', age: 53 },
      { id: 'afds', name: 'Jane', age: 50 },
      { id: 'fdsa', name: 'Diego', age: 5 }
    ],
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons })
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {

    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map(
              (person, index) => {
                return <Person 
                click={() => this.deletePersonHandler(index)}
                key={person.id}
                name={person.name} 
                age={person.age}
                changed={(event) => this.nameChangeHandler(event, person.id)} />
              }
            )
          }
      </div>
      )
      btnClass = classes.Red;
      }
    

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button 
          className={btnClass}
          onClick={this.togglePersonHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
