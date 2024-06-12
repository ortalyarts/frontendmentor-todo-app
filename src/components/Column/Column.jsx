import React from "react";
// import Task from '../Task/Task.jsx';
import { Task } from "../Task/Task.jsx";
import "./Column.css";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";


export const Column = ({tasks, deleteClickedCall, handleCompletedCall})=>{


    function handleRemoveItem(uniqueId) {
        deleteClickedCall(uniqueId);
    }

    function handleCompleted(uniqueId) {
        handleCompletedCall(uniqueId);
    }

    return <ul className="column">
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                    
                    <Task id={task.id} title={task.title} isComplited={task.isComplited}
                        deleteClickedCall={handleRemoveItem} 
                        handleCompletedCall={handleCompleted} 
                        key={task.id} />
                ))}
            </SortableContext>
           </ul>
}