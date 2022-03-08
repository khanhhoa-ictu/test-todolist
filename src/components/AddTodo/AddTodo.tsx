import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { typeTodo } from '../../type/TypeTodo';
import { v4 as uuid4 } from 'uuid';
import './AddTodo.css'
import Modal from '../Modal/Modal';

interface AddTodoProps {
    handleAddTodo?: (newTodo: typeTodo) => void;
    todo?: typeTodo,
    handleUpdateTodo?: (newTodo: typeTodo) => void;
    setShowTodoDetail?: (show: boolean) => void;
    onClose?:()=>void;
}

function AddTodo(props: AddTodoProps) {
    const { 
        todo, 
        handleAddTodo = () => { },
        onClose = () => {},
        handleUpdateTodo = () => { }, 
        setShowTodoDetail = () => { } } = props;
    const defaultDate = () => {
        var someDate = new Date();
        var date = someDate.getTime() + 25200000;
        return new Date(date).toISOString().split("T")[0];
    }
    const defaultTodo = {
        id: '',
        taskName: '',
        description: '',
        date: defaultDate(),
        piority: 'Normal'
    }
    const [newTodo, setNewTodo] = useState<typeTodo>(defaultTodo);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const compareDate = (daySelect: Date, today: Date) => {
        if (daySelect.getFullYear() >= today.getFullYear()
            && daySelect.getMonth() >= today.getMonth()
            && daySelect.getDate() >= today.getDate()
        )
            return true
    }
    
    const AddTodo = (newTodo: typeTodo, e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newTodo.id) {
            const time = new Date(newTodo.date)
            const today = new Date();
            if (compareDate(time, today)) {
                handleUpdateTodo(newTodo)
                setShowTodoDetail(false)
                setNewTodo(defaultTodo)
            } else {
                setIsOpenModal(true);
            }

        } else {
            const time = new Date(newTodo.date)
            const today = new Date();
            if (compareDate(time, today)) {
                newTodo.id = uuid4()
                handleAddTodo(newTodo);
                setNewTodo(defaultTodo)
                onClose();
            } else {
                setIsOpenModal(true);
            }


        }


    }

    useEffect(() => {
        if (todo) {
            setNewTodo(todo);
        } else {
            setNewTodo(defaultTodo)
        }
    }, [todo])

    const onSubmit = (e:FormEvent<HTMLFormElement>) =>{
        AddTodo(newTodo, e)
    }
    return (
        <div>
            <form onSubmit={onSubmit }>
                <input type="text"
                    placeholder="Add new task..."
                    value={newTodo.taskName}
                    required
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodo({
                        ...newTodo,
                        taskName: e.target.value,
                    })} />
                <div className='form-group'>
                    <label>Description</label>
                    <textarea value={newTodo.description} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewTodo({
                        ...newTodo,
                        description: e.target.value,
                    })} />
                </div>
                <div className='task-group'>
                    <div className='form-group'>
                        <label>Due Date</label>
                        <input
                            type="date"
                            value={newTodo.date} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setNewTodo({
                                    ...newTodo,
                                    date: e.target.value,
                                })
                            }} />
                    </div>
                    <div className='form-group'>
                        <label>Piority</label>
                        <select value={newTodo.piority} onChange={(e:ChangeEvent<HTMLSelectElement>) => setNewTodo({
                            ...newTodo,
                            piority: e.target.value,
                        })}>
                            <option value="Low">Low</option>
                            <option value="Normal">Normal</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
                {
                    todo ? <button type="submit" className='btn-add'>Update</button>
                        : <button type="submit" className='btn-add'>Add</button>
                }

            </form>
            <Modal
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                title='Warning'
                content='Invalid date'
            />
        </div>
    )
}

export default AddTodo