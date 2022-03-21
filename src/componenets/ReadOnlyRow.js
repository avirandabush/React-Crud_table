import React from "react";

export default function ReadOnlyRow({user, handleEditClick, handleDeleteClick})
{
    return(
        <tr>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>
                <button type="button" onClick={(event)=> handleEditClick(event, user)}>edit</button>
                <button type="button" onClick={()=> handleDeleteClick(user.id)}>delete</button>
            </td>
        </tr>
    )
}