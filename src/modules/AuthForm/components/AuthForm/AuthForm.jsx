import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useLoginMutation } from '../../api/authApiSlice';
import { setCredentials } from '../../slice/authSlice';
import AuthFormLayout from '../AuthFormLayout/AuthFormLayout';

const DEFAULT_PATH = '/';

const AuthForm = () => {
  const initialState = {
    login: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || DEFAULT_PATH;

  const [login, { isLoading }] = useLoginMutation();

  const onShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login(formData).unwrap();

      dispatch(setCredentials({ ...userData }));
      resetForm();
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthFormLayout
      isMobile={isMobile}
      isLoading={isLoading}
      formData={formData}
      onChangeFormData={onChangeFormData}
      onSubmit={onSubmit}
      onShowPassword={onShowPassword}
      showPassword={showPassword}
    />
  );
};

export default AuthForm;
