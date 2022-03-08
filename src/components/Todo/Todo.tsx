import React, { useState } from 'react';
import { typeTodo } from '../../type/TypeTodo';
import AddTodo from '../AddTodo/AddTodo';
import './Todo.css'
interface TodoProps {
    item: typeTodo,
    handleDelete: (id: string) => void,
    handleUpdateTodo: (newTodo: typeTodo) => void,
    handleCheck: (id: string) => void,
    checked: string[],
}

function Todo(props: TodoProps) {
    const { item, handleDelete, handleUpdateTodo, handleCheck, checked } = props;
    const [showTodoDetail, setShowTodoDetail] = useState(false);

    return (
        <div>
            <div className="todo">
                <div className="todo-title">
                    <div>
                        <input 
                            type="checkbox" 
                            onChange={() => handleCheck(item.id)} 
                            checked={checked.includes(item.id)} 
                        />
                    </div>

                    <p>{item.taskName}</p>
                </div>
                <div>
                    <button className="btn btn-detail" onClick={() => setShowTodoDetail(!showTodoDetail)}>Detail</button>
                    <button className="btn btn-delete" onClick={() => handleDelete(item.id)}>Remove</button>
                </div>
            </div>

            {showTodoDetail &&
                <div className='update-todo'>
                    <AddTodo todo={item} handleUpdateTodo={handleUpdateTodo} setShowTodoDetail={setShowTodoDetail} />
                </div>
            }



        </div>
    )
}

export default Todo