import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./App.css";
import * as yup from "yup";

const schema = yup.object().shape({
  picture: yup.mixed()
    .test('required', "You need to provide a file", (value) =>{
      return value && value.length
    } )
    .test("fileSize", "The file is too large", (value, context) => {
      return value && value[0] && value[0].size <= 200000;
    })
    .test("type", "We only support jpeg", function (value) {
      return value && value[0] && value[0].type === "image/jpeg";
    }),
});

function App() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="picture">Picture</label>
      <input id="picture" {...register("picture")} type="file" />
      {errors.picture && <p>{errors.picture.message}</p>}
      <button>Submit</button>
    </form>
  );
}

export default App;
