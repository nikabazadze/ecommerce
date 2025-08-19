import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { login } from "../../API";
import AuthButton from "../AuthButton";
import Input from "../Input";
import { setUser, setIsLoggedIn } from "../../store/UserSlice";
import { loadUserCart } from "../../store/CartSlice";
import { loadUserOrders } from "../../store/OrdersSlice";
import { checkGuestCart } from "../../utils/guestCartChecker";

function LoginForm() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email, password) {
            const response = await login(email, password);
            if (response.success) {
                dispatch(setUser(response.user));
                dispatch(setIsLoggedIn(true));
                checkGuestCart(response.user.id);
                dispatch(loadUserCart(response.user.id));
                dispatch(loadUserOrders(response.user.id));
                navigate("/");
            } else {
                console.log(response.message);
            }

            setEmail("");
            setPassword("");
        } else {
            console.log("Fill all required fields in the log in form!");
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input label="Email" inputId="email" inputType="email" state={email} setState={setEmail} isRequired="true" />
            <Input label="Password" inputId="password" inputType="password" state={password} setState={setPassword} isRequired="true" />
            <AuthButton type="submit" action="Log in" />
        </form>
    );
};

export default LoginForm;