import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import * as yup from "yup";

const schema = yup.object().shape({
  picture: yup.mixed()
    .required("You need to provide a file")
    .test("fileSize", "The file is too large", function(value) {
      console.log('*',value)
      return false
      return value && value[0].size <= 2;
    })
    .test("type", "We only support jpeg", function(value) {
      return value && value[0].type === "image/jpeg";
    }),
});

function App() {
  const { register, handleSubmit, errors, watch } = useForm({
    validationSchema: schema,
  });

  console.log(errors);
  console.log('====',watch("picture")); 
  console.log('-----',watch()); 



  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="picture">Picture</label>
      <input id="picture" ref={register} type="file" name="picture" />
      {errors.picture && <p>{errors.picture.message}</p>}
      <button>Submit</button>
    </form>
  );
}

export default App;
