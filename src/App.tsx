import React, {useState,useEffect}from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import {css} from '@emotion/css'
import ClipLoader from 'react-spinners/ClipLoader'

type FormInputs = {
  fullName: string;
};

const validationSchema = yup.object().shape({
  fullName: yup.string().required()
})

function Form() {
  let [loading, setLoading] = useState(false)
  let [color, setColor] = useState('#bf1650')

  function later(delay : number) {
    return new Promise(function(resolve) {
      setLoading(loading = true)
      setTimeout(resolve,delay)
    })
  }

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

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
  
  const onSubmit = async (data: FormInputs) => {
    await later(3000)
    setLoading(loading = false)
    alert(data.fullName)
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
          {
            loading ? 
            <ClipLoader color={color} loading={loading} css={override} size={10} />
            :
            'Sign Up'
          }
        </button>
      </form>
    </div>
  );
}

function App() {
  return <Form />;
}

export default App;