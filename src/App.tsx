import React from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'

function later(delay: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

type FormInputs = {
  fullName: string;
};


const validationSchema = yup.object().shape({
  fullName: yup.string().required()
})

function Form() {
  const {
    register,
    handleSubmit,
    errors,
    formState,
    reset
  } = useForm<FormInputs>({
    mode:'onSubmit',
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = async (data: FormInputs) => {
    console.log(data);
    await later(3000);
    alert("Thank you for Register");
    reset();
  };
  return (
    <div>
      <h1> Create an Account </h1>
      <form>
        <label> Fullname * </label>
        <input
          type="text"
          name="fullName"
          ref={register()}
        />
        {errors.fullName && (
          <p className="error"> {errors.fullName.message} </p>
        )}

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={formState.isSubmitting}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

function App() {
  return <Form />;
}

export default App;