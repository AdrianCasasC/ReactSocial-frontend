import React, { useState } from 'react'

export const useForm = (initialObj = {}) => {

    const [form, setForm] = useState(initialObj);

    //Desestructuro directamente el target del evento
    const changed = ({ target }) => {
        let { name, value } = target;

        setForm({
            ...form,
            [name]: value
        })
    };



    return {
        form,
        changed
    }
}
