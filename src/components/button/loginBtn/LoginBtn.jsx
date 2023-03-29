import mc from './loginBtn.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLoginModal} from '../../../redux/reducers/loginModal.slice';
import {signIn} from "../../../redux/reducers/login.slice";

const LoginBtn = (props) => {
    const {namebtn} = props;
    const {visible, email, password} = useSelector((store) => {
        return {
            visible: store.loginModalSlice.visible, email: store.login.email, password: store.login.password
        }
    })

    const dispatch = useDispatch();

    const handleLoginForm = (e) => {
        console.log(e)
        console.log('salut')
        e.preventDefault()
        !visible ? (dispatch(signIn({email, password}))) : (dispatch(toggleLoginModal(visible)))
    }

    return (<button className={mc.loginBtn} type="submit" onClick={(e) => handleLoginForm(e)}>{namebtn}</button>);

};
export default LoginBtn;