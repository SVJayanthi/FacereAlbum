import React from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import TaskListItem from './TaskListItem'
import SelectList from '../menu/Select'

// Map from sorting index to query title
const orderMap = ['id', 'title', 'progress', 'priority', 'due_date']

// Displays list of tasks from server and allows user interaction
export default class TaskList extends React.Component {
    constructor(props){
        super()
        this.reorder = this.reorder.bind(this)
        this.reload = this.reload.bind(this)
        this.state = {
            items: [],
            sort: 0,
            update: false
        }
        
    }

    // Updating state from user interaction
    reload(){
        this.setState({update: true})
    }

    reorder(val) {
        this.setState({sort: val, items: [], update: true})
        console.log("change state")
    }

    // Component lifecycle updates
    componentDidMount(){
        console.log('component mounted')
        this.loadTasks()
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.update || (prevState.sort !== this.state.sort)) {
            console.log("did update")
            this.loadTasks()
            this.setState({update: false})
        }
    }

    // Fetch tasks from database
    loadTasks = () =>{
        let _tasks = []

        let headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        console.log("state is " + this.state.sort)
        fetch(('http://localhost:3001/api/' + orderMap[this.state.sort]),
            {
            method: "get",
            headers: headers
            }
        ).then(response => response.json())
        .then((data) =>{
            console.log(data)
            _tasks = data.map(item => <TaskListItem item = {item} func = {this.reload}/>)
            this.setState({items: _tasks})
        })
    }

    // Return title and task list
    render(){
        return (
            <div style={{ marginLeft: '20px'}}>
                <Typography variant="h6" style={{backgroundColor: 'LightSteelBlue'}}>
                    Task List
                </Typography>
                <SelectList list = {['Created', 'Title','Progress', 'Priority', 'Due Date']} 
                selected = {this.state.sort} 
                func = {this.reorder}/>
                <List>
                    {this.state.items}
                </List>
            </div>
        )
        
    }
}