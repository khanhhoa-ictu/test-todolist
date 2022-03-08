import React from 'react'
import { typeTodo } from '../../type/TypeTodo';
import AddTodo from '../AddTodo/AddTodo';
import './ModalAddTodo.css'
interface ModalAddTodoProps {
    isOpen?: boolean;
    onClose?: () => void;
    handleAddTodo: (newTodo: typeTodo) => void;
}
function ModalAddTodo(props: ModalAddTodoProps) {
    const { handleAddTodo, isOpen, onClose } = props
    return (
        <div className="modal">
            {isOpen &&
                <div>
                    <div className="overlay"></div>
                    <div className="modal-add">
                        <h3>New Task</h3>
                        <AddTodo handleAddTodo={handleAddTodo} onClose ={onClose} />
                        <button className="btn-close" onClick={onClose}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                </div>
            }
        </div>
    )
}

export default ModalAddTodo