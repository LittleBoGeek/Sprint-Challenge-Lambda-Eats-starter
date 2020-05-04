import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

const MyForm = ({errors, status,touched, values}) => {
    const[users, setUsers] = useState([]);
    useEffect(() => {
        console.log("status has changed", status);
        status && setUsers(users => [...users, status])

    }, [status]);
    return (
        <div className ="formcont">

<Form>

    <label htmlFor = "name">
        Name: <Field
        id = "name"
        type = "text"
        name = "name"
        placeholder =  "Name"
        
        />
        {touched.name && errors.name && (
            <p> {errors.name}</p>
        )}
    </label>
<h2> Please select a size:</h2>
    <select onChange={`getSelectedValue()`}>
  <option value="small">small</option>
  <option value="med">medium</option>
  <option selected value="large">large</option>
  <option value="xl">xl</option>
</select>
<h2> Please select toppings
</h2>
    <label className="checkbox-container">
        Pepperoni
        <Field
          type="checkbox"
          name="opt"
          checked={false}
        />
        <span className="checkmark" />
      </label>  
      <label className="checkbox-container">
        Anchovies
        <Field
          type="checkbox"
          name="opt"
          checked={false}
        />
        <span className="checkmark" />
      </label>  
    <label className="checkbox-container">
        Pineapple 
        <Field
          type="checkbox"
          name="opt"
          checked={false}
        />
        <span className="checkmark" />
      </label>  
   
<label className="checkbox-container">
       Ham
        <Field
          type="checkbox"
          name="opt"
          checked={false}
        />
        <span className="checkmark" />
      </label>
      <label htmlFor = "specialInstructions">
      <h2> Use this box to add any special instructions </h2>
        <Field
        id = "name"
        type = "text"
        name = "specIn"
        placeholder =  "Please add any special instructions here"
        
        />
        {touched.name && errors.name && (
            <p> {errors.name}</p>
        )}
    </label>
  
        <button type = "submit">Submit</button>

</Form>



{users.map(user =>{
    return(
    <ul key = {user.id}>
        <li> name: {user.name} </li>
        <li> {user.specIn}</li>
     </ul>
    );
})}
</div>
    );
};


const FormikMyForm = withFormik({
    mapPropsToValues(props){

        return{
            name:props.name || "",
            tos:props.tos || true,

        }
    },
   

validationSchema: Yup.object().shape({
    name: Yup.string().required()
   // .matches(/^[0-9]+$/, "Must be only digits")
     .min(2, 'Must be at least two characters')

  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(MyForm);

function getSelectValue()
{
    var selectedValue = document.getElementById("list").value;
    console.log(selectedValue);
}
getSelectValue();

export default FormikMyForm;  



