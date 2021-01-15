import React, { Component } from 'react';
import CardList from './Components/CardList';
import Scroll from './Components/Scroll';
import SearchBox from './Components/SearchBox';
import './CSS/App.css';
import ErrorBoundry from './Components/ErrorBoundry';

class App extends Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchField: ''
        }
    }
    componentDidMount(){
        (async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await res.json();
            this.setState({robots: users});
        })();
    }

   onSearchChange = (event) => {
       this.setState({searchField: event.target.value})
   }
    render(){
        const { robots, searchField} = this.state;
        const filteredRobots = robots.filter((robot,i) => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        });
        return !robots.length ? <h1>Loading my PP</h1> : 
        (
        <div className='tc'>
            <h1 className='f1'>Robots</h1>
            <SearchBox searchChange = {this.onSearchChange} />
            <Scroll>
                <ErrorBoundry>
            <CardList robots={filteredRobots}/>
                </ErrorBoundry>
            </Scroll>
        </div>
    );
        }
    }

export default App;