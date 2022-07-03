import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


type AddItemInputProps = {
    addItem: (newItemValue: string) => void
    // id?: string
}

const AddItemInput: React.FC<AddItemInputProps> = React.memo(({addItem}) => {
    console.log('AddItemInput called')
    let [newItemValue, setNewItem] = useState('')
    let [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewItem(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newItemValue.trim() === '') {
                setError(true)
                return
            } else {
                setError(false)
            }
            addItem(newItemValue)
            setNewItem('')
        }
    }
    const addItemOnclickHandler = () => {
        if (newItemValue.trim() === '') {
            setError(true)
            return
        } else {
            setError(false)

        }
        addItem(newItemValue)
        setNewItem('')
    }

    const currentInput = error ?
        <TextField
            error
            id="outlined-error"
            label="Empty input"
            defaultValue="Hello World"
            value={newItemValue}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            size='small'
        /> :
        <TextField
            id="outlined-helperText"
            label="type..."
            value={newItemValue}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            size='small'
        />

    return (
        <div style={{margin: '10px 0 10px 0'}}>
            {currentInput}
            <Button onClick={addItemOnclickHandler} variant="contained"
                    style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}>
                <AddIcon fontSize='small'/>
            </Button>
            <div>{error}</div>
        </div>
    )
})

export default AddItemInput