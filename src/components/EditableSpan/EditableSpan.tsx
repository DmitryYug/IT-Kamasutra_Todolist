import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({title, onChange}) => {

    console.log('EDITABLESPAN is called ')

    let [editMode, setEditMode] = useState<boolean>(false)
    let [newTitle, setNewTitle] = useState<string>(title)

    const editModeEnabled = () => {
        setEditMode(true)
    }

    const viewModeEnabled = () => {
        setEditMode(false)
        setNewTitle(newTitle)
        onChange(newTitle)
    }

    const viewModeEnabledOnKeyPress = (e: KeyboardEvent<HTMLSpanElement>) => {
        if(e.key === 'Enter') {
          viewModeEnabled()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    let elements = editMode
        ? <input type="text" value={newTitle} onChange={onChangeHandler} autoFocus/>
        : <span> {newTitle} </span>

    return (
        <span
            onDoubleClick={editModeEnabled}
            onBlur={viewModeEnabled}
            onKeyPress={viewModeEnabledOnKeyPress}
        >
            {elements}
        </span>
    )
})

export default EditableSpan
