import { MdDone } from 'react-icons/md';
import "../App.css"

export const TodoListItem = ({list, onClick}) => {
    const resetStyleListGroup = {
        margin: "20px 0px",
        height: "200px",
        overflowY: (list.length > 4? "scroll" : "")
      }
    const renderListTask = list.map((task, index) => 
        <li className="list-group-item" key = {index}>
            <p onClick={(e) => onClick(e)}>{task.status?<del>{task.todo}</del> :task.todo}</p>
            {task.status?<MdDone size="25px" color="green"/>:""}
        </li>
    )
    return (
        <ul className="list-group list-group-flush" style={resetStyleListGroup}>
        {renderListTask}
    </ul>
    )
}

      
      
      
      
      
