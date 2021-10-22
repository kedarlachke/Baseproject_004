import React, { useState, useCallback,useEffect} from 'react'
import { M_LeftIconRoundInput } from '../common/InputFields/RoundInput/RoundInput'
import {M_SocialMediaLogin} from './SocialMediaLogin'
import {connect} from 'react-redux'
import {ActionToDispatch,ActionToRedirect,handleSignInJWT, checkCurrentUsernameJWT} from '../Redux/reducers/actions'
import {displaySubmitError, runCheck,requiredCheck,maxLength128,minLength2} from '../common/validationlib';
import {checkTouched,nvl,checkItem,isCheckedbool,getDocumenForSave} from '../common/CommonLogic';
const initobj = {
  applicationid : "15001500", client: "45004500" ,  lang: "EN",
  username: '',
  password: '',
  validatemode:'touch'
}
export const handleSaveCheck=(currentdocument:any)=>{
const {touched,username,password,validatemode} = currentdocument ; 
currentdocument.formValid=true
   let isNew=false;
   let username_check=runCheck(nvl(username,''), [requiredCheck]);
   let password_check=runCheck(nvl(password,''), [requiredCheck]);
   if(validatemode=='save'  )
   {  currentdocument.errorsAll={
       password:password_check,
        username:username_check,
    }
   }
   if(validatemode=='touch' && touched!=null)
   {
        currentdocument.errorsAll={
        username:checkTouched(nvl(touched.username,false),username_check),
        password:checkTouched(nvl(touched.password,false),password_check) 
      }
   }
   if(username_check.length===0 && password_check.length===0){
    currentdocument.formValid=false
   }
  return currentdocument;
}
export function SignInForm(props:any) {
  const [user, setUser] = useState(initobj)
  const [state, setState] = useState(({}))
  function updateUser(doc:any) {
    handleClearErrors();
    setUser(doc)
    //console.log(newuser)
  }
 
  // useEffect(() => {
  //   updateUser(handleSaveCheck(user))
    
  //   return () => {
      
  //   }
  // }, [user])
  
    const M_updateUser = useCallback((e)=>updateUser(e), [user])
    const handleClearErrors=()=>{
      setState({formErrorMessage: '',formErrors: []});
    }

    async function handleProcessSubmitSignIn(values:any) {
         var result='',errorMessage='',errors =new Array();
         props.ActionToDispatch({ type: 'AUTH_PENDING' ,payload : ['Signing In'] });
         setState({formErrorMessage: 'In process'});

       
         handleSignInJWT(values,async(err:any,result:any)=>{
      
            if(!err)
            {
         
              if(!result)
              {
                props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : errors });
                setState({formErrorMessage: errorMessage,formErrors : errors});  
              }
              else
              {

                console.log('result.signUpUsernameJWT.token');
          console.log(result.token);
          console.log('result.signUpUsernameJWT.token--end');
          sessionStorage.setItem('jwtToken', result.token);
          console.log('token added');
              
                checkCurrentUsernameJWT(async (err:any,result:any)=>
                {
                 if(!err)
                  {
                 
                            if(!result)
                            {
                              props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : errors });
                              setState({formErrorMessage: errorMessage,formErrors : errors}); 
                              
                            }
                            else
                            {
                            setState({formErrorMessage: 'Authenticated'});  
                            props.ActionToDispatch({ type: 'AUTH_USER' ,payload :  result  });
                            props.ActionToRedirect('/dashboard');
                            }

                  }
                }
                )
              }
           }
            else
            {
              props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : err.errors });
              setState({formErrorMessage: err.errorMessage,formErrors : err.errors}); 
            }
         })
        }
   
    const handleSubmit=(currentdocument:any)=>{
       handleClearErrors();
       currentdocument.validatemode = 'save'
       handleSaveCheck(currentdocument)
       if(currentdocument.formValid){
        setUser({...currentdocument})
        return
      }
       let { username, password, applicationid ,client,lang}=currentdocument
       let values={
        username, password, applicationid ,client,lang 
       }
       try{ handleProcessSubmitSignIn(values);   }
       catch(err:any)  {   setState({formErrorMessage: err.errorMessage,formErrors : err.errors});} 
      
    } 

    handleSaveCheck(user)
  return (
    <div className="form sign-in-form">
      <h2 className="title">Sign In</h2>
      <M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-user" name="username" placeholder="Username" currdoc={user} section={"username"} label="user name" wd={"12"}/>
      <M_LeftIconRoundInput  modifydoc={M_updateUser} iconClass="fas fa-lock" name="password" placeholder="Password" currdoc={user} section={"password"} label="user name" wd={"12"}/>
      <input type="button" value="Login" className="btn solid" onClick={()=>{handleSubmit(user)}} />
      <div  className="field-error">{state.formErrorMessage}</div>
      <M_SocialMediaLogin label="Login" />
      
    </div>
  )
}

const mapStateToProps = (state:any) => { 
  return { authenticated:state.auth.authenticated,authprocess:state.auth.authprocess,authuser:state.auth.authuser };
 };
export const M_SignInForm = React.memo(connect(mapStateToProps,{ ActionToDispatch,ActionToRedirect})(SignInForm))
