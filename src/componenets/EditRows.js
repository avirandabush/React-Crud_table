import React from "react";

export default function EditRows({editFormData, handleEditFormChange, handleCancelClick})
{
    return(
        <tr>
            <td>
                {editFormData.id}
            </td>
            <td>
                <input 
                    type="text"
                    name="firstName"
                    placeholder="enter first name"
                    required
                    value={editFormData.firstName}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input 
                    type="text"
                    name="lastName"
                    placeholder="enter last name"
                    required
                    value={editFormData.lastName}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <button type="submit">save</button>
                <button type="button" onClick={handleCancelClick}>cancel</button>
            </td>
        </tr>
    )
}