import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { useId } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addContact } from "../../redux/contactsSlice";

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Name must contain only letters")
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^[0-9\-]+$/, "Number must contain only digits and dashes")
    .max(12, "Too Long")
    .required("Required"),
});

function ContactForm() {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      validationSchema={ContactFormSchema}
      onSubmit={(values, actions) => {
        dispatch(addContact(values.name, values.number));
        actions.resetForm();
      }}
    >
      <Form className={css.formContainer}>
        <div className={css.box}>
          <label className={css.label} htmlFor={nameFieldId}>
            Name:
          </label>
          <Field
            className={css.field}
            type="text"
            htmlFor={nameFieldId}
            name="name"
          />
          <ErrorMessage name="name" />
        </div>

        <div className={css.box}>
          <label className={css.label} htmlFor={numberFieldId}>
            Number:
          </label>
          <Field
            className={css.field}
            id={numberFieldId}
            type="text"
            name="number"
          />
          <ErrorMessage name="number" />
        </div>

        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
