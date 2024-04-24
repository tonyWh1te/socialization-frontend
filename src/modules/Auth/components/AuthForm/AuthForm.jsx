import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import { useLoginMutation, useLazyGetUserInfoQuery } from '../../api/authApiSlice';
import { setToken, setUserCredentials } from '../../slice/authSlice';
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

  const [login, { isLoading: isLoadingTokens }] = useLoginMutation();
  const [getUserInfo, { isLoading: isLoadingUserInfo }] = useLazyGetUserInfoQuery();

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
      const tokenData = await login(formData).unwrap();
      dispatch(setToken({ ...tokenData }));

      const user = await getUserInfo().unwrap();
      dispatch(setUserCredentials(user));

      resetForm();
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error?.data?.detail || 'Что-то пошло не так');
    }
  };

  return (
    <AuthFormLayout
      isMobile={isMobile}
      isLoading={isLoadingTokens || isLoadingUserInfo}
      formData={formData}
      onChangeFormData={onChangeFormData}
      onSubmit={onSubmit}
      onShowPassword={onShowPassword}
      showPassword={showPassword}
    />
  );
};

export default AuthForm;
