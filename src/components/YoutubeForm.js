import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  //Nested Object
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const savedValuesValues = {
  name: "jhonnel",
  email: "jhonerApp@gmail.com",
  channel: "Sample Testing",
  comments: "Formik Testing",
  address: "3J PH MAKATI",
  //Nested Object
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values, onSubmitProps) => {
  console.log("Form data", values);
  console.log("onSubmitProps data", onSubmitProps);
  onSubmitProps.setSubmitting(false);

  //Reset forms
  onSubmitProps.resetForm();
};

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required Comments!";
  }
  return error;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required!"),
  channel: Yup.string().required("Required!"),
});

function YoutubeForm() {
  const [formValues, setFormValues] = useState(null);
  //   console.log("Visited Field", Formik.touched);
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      //These 2 property will trigger once the submit button clicked for validation events field to required
      //   validateOnChange={false}
      //   validateOnBlur={false}
      //   validateOnMount={false}
      enableReinitialize
    >
      {(formik) => {
        console.log("Formik props", formik);
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="name">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>
            <div className="form-control">
              <label htmlFor="name">Channel</label>
              <Field type="text" id="channel" name="channel" />
              <ErrorMessage name="channel" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                type="text"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {(props) => {
                  console.log("Field Render", props);
                  const { field, form, meta } = props;
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
              <ErrorMessage name="address" />
            </div>
            <div className="form-control">
              <label htmlFor="facebook">Facebook Comments</label>
              <Field
                as="input"
                type="text"
                id="facebook"
                name="social.facebook"
              />
              <ErrorMessage name="facebook" />
            </div>

            <div className="form-control">
              <label htmlFor="twitter">Twitter Comments</label>
              <Field
                as="input"
                type="text"
                id="twitter"
                name="social.twitter"
              />
              <ErrorMessage name="twitter" />
            </div>

            <div className="form-control">
              <label htmlFor="primaryPh">Primary Phone numbers</label>
              <Field
                as="input"
                type="text"
                id="primaryPh"
                name="phoneNumbers[0]"
              />
            </div>
            <div className="form-control">
              <label htmlFor="secondaryPh">Secondary Phone numbers</label>
              <Field
                as="input"
                type="text"
                id="secondaryPh"
                name="phoneNumbers[1]"
              />
            </div>
            <div className="form-control">
              <label htmlFor="primaryPh">List of phone numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayprops) => {
                  //   console.log("fieldArrayprops", fieldArrayprops);
                  const { push, remove, form } = fieldArrayprops;
                  const { values } = form;
                  const { phNumbers } = values;
                  console.log("Form Errors", form.errors);
                  return (
                    <div>
                      {phNumbers.map((phNumbers, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}`}></Field>
                          {index > 0 && (
                            <button type="Submit" onClick={() => remove(index)}>
                              -
                            </button>
                          )}
                          <button type="Submit" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            {/* 
            <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              Validate comments
            </button>
            <button type="button" onClick={() => formik.validateForm()}>
              Validate all
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              Visit comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                })
              }
            >
              Visit fields
            </button> */}
            <button
              type="button"
              onClick={() => setFormValues(savedValuesValues)}
            >
              Load saved data
            </button>
            <button type="reset">Reset</button>
            <button
              type="Submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;
