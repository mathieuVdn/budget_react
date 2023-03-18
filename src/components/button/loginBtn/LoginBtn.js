import mc from './loginBtn.module.scss';

const LoginBtn = (props) => {
    return (
        <button className={mc.loginBtn} type="button">{props.name}</button>
    );
};

export default LoginBtn;