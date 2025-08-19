import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './SignUpForm.module.css';
import { addUser } from "../../API";
import AuthButton from "../AuthButton";
import Input from "../Input";
import { checkGuestCart } from "../../utils/guestCartChecker";

function SignUpForm() {
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (firstName, lastName, email, password) {
            const response = await addUser(firstName, lastName, email, password);
            
            if (response.status === 201) {
                console.log("Sign up completed successfuly!");

                const jsonResponse = await response.json();
                const userId = jsonResponse.user.id;
                checkGuestCart(userId);

                navigate("/account/login");
            } else {
                console.log("Error! Sign up wasn't processed.");
            }

            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
        } else {
            console.log("Fill all required fields in the sign up form!");
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.name} >
                <Input label="First Name" inputId="firstName" state={firstName} setState={setFirstName} isRequired="true" />
                <Input label="Last Name" inputId="lastName" state={lastName} setState={setLastName} isRequired="true" />
            </div>
            <Input label="Email" inputId="email" inputType="email" state={email} setState={setEmail} isRequired="true" />
            <Input label="Password" inputId="password" inputType="password" state={password} setState={setPassword} isRequired="true" />
            <AuthButton type="submit" action="Sign up" />
        </form>
    );
};

export default SignUpForm;