import React from 'react'
import { useFormik } from 'formik'


const initialValues = {
    name: '',
    email: '',
    channel: ''
}

const onSubmit = values => {
    console.log('Form data', values)
}

const validate = values => {
    let errors = {}
    if (!values.name) {
        errors.name = 'Required'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email format'
    }


    if (!values.channel) {
        errors.channel = 'Required'
    }


    return errors

}
function YoutubeForm() {

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    console.log('Visited Field', formik.touched)
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name' onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}></input>
                    {formik.touched.name && formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
                </div>
                <div className='form-control'>
                    <label htmlFor='name'>Email</label>
                    <input type='email' id='email' name='email' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.email}></input>
                    {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
                </div>
                <div className='form-control'>
                    <label htmlFor='name'>Channel</label>
                    <input type='text' id='channel' name='channel' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.channel}></input>
                    {formik.touched.channel && formik.errors.channel ? <div className='error'>{formik.errors.channel}</div> : null}
                </div>
                <button type='Submit'>Submit</button>
            </form>
        </div>
    )
}

export default YoutubeForm