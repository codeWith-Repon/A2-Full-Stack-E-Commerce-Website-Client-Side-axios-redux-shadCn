import CommonForm from "@/components/common/CommonForm";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initalState = {
  userName : "",
  email : "",
  password : ""
}

const AuthRegister = () => {

  const [formData, setFormData] = useState(initalState)
  // console.log(formData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  function onSubmit(event){
    event.preventDefault()
    dispatch(registerUser(formData)).then((data)=> {
      if(data?.payload?.success) navigate('/auth/login')
    })
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium text-primary ml-2 hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm 
      formControls={registerFormControls}
      buttonText={"Sign Up"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
        
      />
    </div>
  );
};

export default AuthRegister;
