import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './loginPage.scss';
import logo from '../../../logoPng.png';
import { debounce } from '../../../utils/debounce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Country {
  code: number;
  data: [{ createdAt: string; id: number; name: string; pid: number | string }];
  message: string;
  error: Boolean;
}

const SignUpPage = () => {
  const [country, setCountry] = useState<Country>();
  const [city, setCity] = useState<Country>();
  const [idCountry, setIdCountry] = useState<string>();
  const [userRes, setUserRes] = useState();

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

  const onSubmit = async (data: any) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/auth/register`, data)
      .then(function (response) {
        console.log(response.data);
        if (response?.data.code === 200 && !response?.data.error) {
          toast.success('Tạo tài khoản thành công !');
          setUserRes(response.data);
        } else if (response?.data?.code === 500 && response?.data.error) {
          toast.error('Tài khoản đã có !');
          setUserRes(response.data);
        }
        toast.error('Tạo tài khoản thất bại !');
      })
      .catch(function (error) {
        console.log('register error', error);
        toast.error('Tạo tài khoản thất bại !');
      });
  };

  // hạn chế spam submit
  useEffect(() => {
    onSubmit;
  }, [userRes]);

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
      <form
        style={{ maxWidth: '560px', width: '100%' }}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="row g-3 needs-validation"
      >
        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label">
            <FormattedMessage id="email" />
          </label>
          <input type="text" className="form-control" id="inputEmail" {...register('email', { required: true })} />
          {errors.exampleRequired && <span>This field is required</span>}
        </div>

        <div className="col-md-12">
          <label htmlFor="inputPassword" className="form-label">
            Mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            {...register('password', { required: true })}
          />

          {errors.exampleRequired && <span>This field is required</span>}
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
          />

          {errors.exampleRequired && <span>This field is required</span>}
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
