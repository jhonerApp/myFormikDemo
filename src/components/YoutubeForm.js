import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'


const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    //Nested Object
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', '']
}

const onSubmit = values => {
    console.log('Form data', values)
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Required!'),
    channel: Yup.string().required('Required!')
})

function YoutubeForm() {


    console.log('Visited Field', Formik.touched)
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <div className='form-control'>
                    <label htmlFor='name'>Name</label>
                    <Field type='text' id='name' name='name'
                    />
                    <ErrorMessage name='name' component={TextError} />
                </div>
                <div className='form-control'>
                    <label htmlFor='name'>Email</label>
                    <Field type='email' id='email' name='email'
                    />
                    <ErrorMessage name='email'  >
                        {
                            (errorMsg) => <div className='error'>{errorMsg}</div>
                        }
                    </ErrorMessage>
                </div>
                <div className='form-control'>
                    <label htmlFor='name'>Channel</label>
                    <Field type='text' id='channel' name='channel'
                    />
                    <ErrorMessage name='channel' />
                </div>
                <div className='form-control'>
                    <label htmlFor='comments'>Comments</label>
                    <Field as='textarea' type='text' id='comments' name='comments'
                    />
                    <ErrorMessage name='comments' />
                </div>
                <div className='form-control'>
                    <label htmlFor='address'>Address</label>
                    <Field name='address'>
                        {
                            (props) => {
                                const { field, form, meta } = props
                                console.log('render props', props)
                                return (
                                    <div>
                                        <input type='text' id='address' {...field} />
                                        { meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                    </div>
                                )

                            }
                        }
                    </Field>
                    <ErrorMessage name='address' />
                </div>
                <div className='form-control'>
                    <label htmlFor='facebook'>Facebook Comments</label>
                    <Field as='input' type='text' id='facebook' name='social.facebook'
                    />
                    <ErrorMessage name='facebook' />
                </div>

                <div className='form-control'>
                    <label htmlFor='twitter'>Twitter Comments</label>
                    <Field as='input' type='text' id='twitter' name='social.twitter'
                    />
                    <ErrorMessage name='twitter' />
                </div>

                <div className='form-control'>
                    <label htmlFor='primaryPh'>Primary Phone numbers</label>
                    <Field as='input' type='text' id='primaryPh' name='phoneNumbers[0]'
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor='secondaryPh'>Secondary Phone numbers</label>
                    <Field as='input' type='text' id='secondaryPh' name='phoneNumbers[1]'
                    />

                </div>
                <button type='Submit'>Submit</button>
            </Form>
        </Formik>
    )
}

export default YoutubeForm