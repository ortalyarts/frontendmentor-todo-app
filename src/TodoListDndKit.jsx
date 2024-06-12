import React, { useState, useEffect }  from "react"
import {DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors} from "@dnd-kit/core"

import { Column } from "./components/Column/Column.jsx";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Input } from "./components/Input/Input.jsx";

function ToDoListDndKit () {

    const[tasks, setTasks] = useState([
        {id:1, title: "Complete online JavaScript course", isComplited:true},
        {id:2, title: "Jog around the park 3x", isComplited:false},
        {id:3, title: "10 minutes meditation", isComplited:false},
        {id:4, title: "Read for 1 hour", isComplited:false},
        {id:5, title: "Pick up groceries", isComplited:false},
        {id:6, title: "Complete Todo App on Frontend Mentor", isComplited:false}
    ]);

    // Filter tasks
    const[filterTerm, setFilterTerm] = useState('All');

    const filteredTasksList = tasks.filter((item) => {
        if(filterTerm === 'Active'){
            return item.isComplited === false;
        } else if(filterTerm === 'Complited'){
            return item.isComplited === true;
        } else {
            return item;
        }
    })
    

    // Add new task
    const addTask = (title) => {
        setTasks((tasks) => [...tasks, {id:crypto.randomUUID(), title, isComplited:false}]);
    };

    // Remove task
    function handleRemoveItem(uniqueId) {
        setTasks(tasks.filter((item) => item.id !== uniqueId));
    }

    // update tasks if a task is completed
    function handleCompleted(uniqueId) {
        setTasks((tasks) => {
            const objIndex = tasks.findIndex(obj => obj.id == uniqueId);
            tasks[objIndex].isComplited = tasks[objIndex].isComplited ? false : true;
            return tasks;
        });
        // update number of uncompleted tasks (items left)
        setActiveLength(tasks.filter((item) => {return item.isComplited === false}).length)
    }

    // update number of uncompleted tasks (items left)
    const [activeLength, setActiveLength] = useState(tasks.filter((item) => {return item.isComplited === false}).length)
    useEffect(() => {
        setActiveLength(tasks.filter((item) => {return item.isComplited === false}).length)
    }, [tasks]);

    // Clear completed tasks (remove all checked)
    function clearCompleted() {
        setTasks(tasks.filter((item) => item.isComplited === false));
    }
      
    // dnd-kit === draggable  
    const getTaskPos = id => tasks.findIndex(task => task.id === id)

    const handleDragEnd = event => {
        const {active, over} = event;

        if(active.id === over.id) return;
        setTasks((tasks) => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);

            return arrayMove(tasks, originalPos, newPos);
        });
    };

    // Used instead of commented code to allow onClick-events for child elements of graggable items (like buttons)
    const sensors = useSensors(
        useSensor(MouseSensor, {
          activationConstraint: {
            distance: 8,
          },
        }),
        useSensor(TouchSensor, {
          activationConstraint: {
            delay: 200,
            tolerance: 6,
          },
        }),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        }),
      );
    // const sensors = useSensors(
    //     useSensor(PointerSensor),
    //     useSensor(TouchSensor),
    //     useSensor(KeyboardSensor, {
    //         coordinateGetter: sortableKeyboardCoordinates,
    //     })
    // );

    return (
        <>
            <Input submit={addTask}/>

            <div className="todo-holder">
                <DndContext 
                    sensors={sensors}
                    onDragEnd={handleDragEnd} 
                    collisionDetection={closestCorners}>
                    
                    <Column tasks={filteredTasksList} deleteClickedCall={handleRemoveItem} handleCompletedCall={handleCompleted}/>
                </DndContext>
                <div className="bottom">
                    <p className="textB">{activeLength} items left</p>
                    <div className="controls">
                        <fieldset role="radiogroup" aria-labelledby="legend1">
                            <legend id="legend1" className="screen-reader-only">Filter tasks</legend>
                            <label className="btn-control" htmlFor="option-0">                                
                                <input type="radio" name="option" id="option-0" onChange={() => {setFilterTerm('All')}} checked={filterTerm === "All"}/>
                                <span>All</span>
                            </label>
                            <label className="btn-control" htmlFor="option-1">                        
                                <input type="radio" name="option" id="option-1" onChange={() => {setFilterTerm('Active')}} checked={filterTerm === "Active"}/>
                                <span>Active</span>
                            </label>
                            <label className="btn-control" htmlFor="option-2">                                
                                <input type="radio" name="option" id="option-2" onChange={() => {setFilterTerm('Complited')}} checked={filterTerm === "Complited"}/>
                                <span>Completed</span>
                            </label>
                        </fieldset>
                    </div>
                    <button className="clear btn-control" onClick={clearCompleted}>Clear Completed</button>
                </div>
            </div>
        </>
    )
}

export default ToDoListDndKit