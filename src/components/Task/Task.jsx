import React, { useEffect }  from "react"
import "./Task.css";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export const Task = ({id, title, isComplited, deleteClickedCall, handleCompletedCall}) => {
    
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    function deleteClicked() {
        deleteClickedCall(id);
    }

    function handleCompleted(e) {
        //console.log(id)
        handleCompletedCall(id);
    }
    return (
    <li 
        ref={setNodeRef} 
        
        {...attributes} 
        {...listeners} 
        
        className="task"
        style={style}>
            
            <input type="checkbox" id={`checkbox-${id}`} className="checkbox" defaultChecked={isComplited} onChange={handleCompleted}/>
            <label htmlFor={`checkbox-${id}`} className="task-title">
                {title}
            </label>

            <button onClick={deleteClicked} className="icon-delete" aria-label="Delete task">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
            </button>
    </li>
    );
}