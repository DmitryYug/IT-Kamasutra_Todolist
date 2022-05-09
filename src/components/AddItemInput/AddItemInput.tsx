import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import classes from "../Todolist.module.css";
import {Button} from "@mui/material";




type AddItemInputProps = {
    addItem: (newItemValue: string) => void
    // id?: string
}

const AddItemInput: React.FC<AddItemInputProps> = ({addItem}) => {

    let [newItemValue, setNewItem] = useState('')
    let [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setNewItem(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newItemValue.trim() === '') {
                setError('! No tasks added !')
                return
            } else {
                setError('')
            }
            addItem(newItemValue)
            setNewItem('')
        }
    }
    const addItemOnclickHandler = () => {
        if (newItemValue.trim() === '') {
            setError('! No tasks added !')
            return
        } else {
            setError('')
        }
        addItem(newItemValue)
        setNewItem('')
    }
    const currentClass = error ? classes.error : ''

    return (
        <div>
            {/*<InputUnstyled/>*/}
            <input
                // placeholder='add new task'
                value={newItemValue}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={currentClass}
            />
            <Button variant="contained">Text</Button>
            <button onClick={addItemOnclickHandler}>+</button>
            {/*<Button onClick={addItemOnclickHandler}>+</Button>*/}
            <div>{error}</div>
        </div>
    )
}

export default AddItemInput