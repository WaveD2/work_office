import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './loginPage.scss';
import logo from '../../../logoPng.png';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

// Load language resources
interface Country {
  code: number;
  data: [{ createdAt: string; id: number; name: string; pid: number | string }];
  message: string;
  error: Boolean;
}

const SignUpPage = () => {
  const { i18n } = useTranslation();

  const history = useHistory();
  const [country, setCountry] = useState<Country>();
  const [city, setCity] = useState<Country>();
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [idCountry, setIdCountry] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/location`).then((response) => {
      setCountry(response.data);
    });
  }, []);
  useEffect(() => {
    idCountry &&
      axios.get(`${process.env.REACT_APP_API_URL}/api/v1/location?pid=${idCountry}`).then((response) => {
        setCity(response.data);
      });
  }, [idCountry]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  });

  const handleLanguageChange = (lng: string) => {
    console.log(lng);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
    if (event.target.value !== password) {
      console.log('error');
      setError('Mật khẩu không khớp !');
    } else {
      setError('');
    }
  };

  const onSubmit = async (data: any) => {
    if (submitting) {
      return;
    }

    setSubmitting(true);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/auth/register`, data)
      .then(function (response) {
        if (response?.data.code === 200 && !response?.data.error) {
          toast.success('Tạo tài khoản thành công !');
          setTimeout(() => {
            history.push('/');
          }, 2000);
          return;
        }
        return toast.error('Tạo tài khoản thất bại !');
      })
      .catch(function (error) {
        if (error?.toString()?.indexOf('500')) {
          return toast.error('Tài khoản đã có !');
        }
        return toast.error('Tạo tài khoản thất bại !');
      });

    setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  };

  return (
    <section
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: '120px',
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '40px 0' }} />
      <ToastContainer />

      <select
        className="box-lang"
        onChange={(e) => {
          e.preventDefault();
          handleLanguageChange(e.target.value);
        }}
        style={{ maxWidth: '150px', position: 'absolute', top: '20px', right: '20px' }}
      >
        <option value="vn">Tiếng Việt</option>
        <option value="en">English</option>
      </select>

      <form
        style={{ maxWidth: '560px', width: '100%' }}
        onSubmit={handleSubmit(onSubmit)}
        className="row g-3 needs-validation"
      >
        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input type="text" className="form-control" id="inputEmail" {...register('email', { required: true })} />
        </div>

        <div className="col-md-12">
          <label htmlFor="inputPassword" className="form-label">
            Mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            {...register('password', { required: true, minLength: 4, maxLength: 20 })}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="repeatPassword" className="form-label">
            Xác nhận lại mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="repeatPassword"
            {...register('repeatPassword', { required: true })}
            onChange={handleRepeatPasswordChange}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        <div className="col-md-12">
          <label htmlFor="nameUser" className="form-label">
            Họ và tên
          </label>
          <input type="text" className="form-control" id="nameUser" {...register('name', { required: true })} />

          {errors.exampleRequired && <span>This field is required</span>}
        </div>

        <div className="col-md-12">
          <label htmlFor="genderSelect">Giới tính</label>
          <select id="genderSelect" {...register('gender', { required: true })}>
            <option value="" defaultChecked>
              --Select an option--
            </option>
            <option value="men">Boy</option>
            <option value="girl">Girl</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div className="col-md-12">
          <label htmlFor="countrySelect">Quốc gia</label>
          <select
            id="countrySelect"
            {...register('region', { required: true })}
            onChange={(e) => {
              setIdCountry(e.target.value);
            }}
          >
            <option value="" defaultChecked>
              --Select an option--
            </option>
            {country?.data?.map((item, index) => (
              <option value={item.id} key={index}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-12">
          <label htmlFor="citySelect">Thành phố</label>
          <select id="citySelect" {...register('state', { required: true })}>
            <option value="" defaultChecked>
              --Select an option--
            </option>
            {city?.data?.map((item, index) => (
              <option value={item.id} key={index}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Đăng ký</button>
      </form>
    </section>
  );
};

export default SignUpPage;
