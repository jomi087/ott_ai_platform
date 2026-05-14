export const emailpasswordvalidation = (email,password)=>{
    
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)           // will return a boolean value
    // const isPasswordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
    const isPasswordValid = password && password.length == 10

    if(!isEmailValid) return "Email is not valid";
    if(!isPasswordValid) return "Password is not valid"; //At least one uppercase letter , At least one lowercase letter , At least one digit (0-9) , At least one special character (@$!%*?&) , Minimum length of 8 characters, allowing letters, digits, and special characters ,
    
    return null ; // i mean no error 
}


export const namevalidation = (name)=>{

    name = name.trim();
    
    if (!name) return "Name field cannot be empty.";
    if (name.length < 4) return "Name must be at least 4 characters long.";
    
    return null;

}


