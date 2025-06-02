import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../hooks/useContext';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/authContext';


const SignUp = () => {
    const { register } = useAuth(); // Assuming you have an AuthContext for registration
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();

    const navigate = useNavigate()


    const [form, setForm] = useState({
        firsname: '',
        lastname: '',
        email: '',
        password: ''
    })

    const inputClass = `w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${theme === 'black' ? 'bg-black text-white' : 'bg-white text-black'}`;
    const phoneInputClass = `flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${theme === 'black' ? 'bg-black text-white' : 'bg-white text-black'}`;


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await register(form.firsname, form.lastname, form.email, form.password);
            navigate('/'); // Redirect to login after successful registration
        }
        catch (err) {
            console.error("Registration failed:", err);
            // Optionally, you can set an error state to display an error message to the user
            // setError("Registration failed. Please try again.");
            alert('Registration failed: ' + err.response?.data?.message);
        }
        // console.log(form.firsname, form.lastname, form.email, form.password);

    }
    return (
        <div className={theme === 'black'
            ? '!bg-black !text-white flex items-center justify-center !rounded'
            : '!bg-white !text-black flex items-center justify-center'}>
            <div className={theme === 'black'
                ? '!bg-gray-900 !text-white p-8 rounded-xl shadow-md w-full max-w-md'
                : '!bg-white !text-black p-8 rounded-xl shadow-md w-full max-w-md'}>

                <h2 className="text-2xl font-semibold text-center">{t("createaccount.title")}</h2>

                <form onSubmit={handleSubmit}
                className={`${theme === 'black' ? '!bg-black !text-white' : '!bg-white'} flex flex-col gap-5 mt-5`}>

                    <input
                        type="text"
                        placeholder="First Name"
                        className={inputClass}
                        value={form.firsname}
                        onChange={(e) => setForm({ ...form, firsname: e.target.value })}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        className={inputClass}
                        value={form.lastname}
                        onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                        required
                    />


                    <input
                        type="email"
                        placeholder={t("createaccount.emailPlaceholder")}
                        className={inputClass}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />



                    <input
                        type="password"
                        placeholder={t("createaccount.passwordPlaceholder")}
                        className={inputClass}
                        // autocomplete="username"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />

                    <p className="text-xs text-gray-500">
                        {t("createaccount.confirmText")}{' '}
                        <span className="text-blue-600 underline cursor-pointer">{t("createaccount.userNotice")}</span> {' '}
                        {t("common.and")} {' '}
                        <span className="text-blue-600 underline cursor-pointer">{t("createaccount.privacyPolicy")}</span>.
                    </p>

                    <button
                        type="submit"
                        className="w-full bg-green-500 !text-white py-2 !rounded-md hover:bg-green-600 transition"
                    >
                        {t("createaccount.submitBtn")}
                    </button>
                </form>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500 text-sm">{t("createaccount.orText")}</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <div className="flex space-x-2 mb-3 gap-5">
                    <button className="flex-1 !border !border-green-300 py-2 !rounded-md flex items-center justify-center ">
                        <img src="https://yt3.googleusercontent.com/K8WVrQAQHTTwsHEtisMYcNai7p7XIlyEAdZg86qYw78ye57r5DRemHQ9Te4PcD_v98HB-ZvQjQ=s900-c-k-c0x00ffffff-no-rj" alt="Google" className="w-5 h-5 mr-2" />
                        {t("createaccount.google")}
                    </button>
                    <button className="flex-1 !border !border-green-300 py-2 !rounded-md flex items-center justify-center ">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s" alt="Facebook" className="w-5 h-5 mr-2" />
                        {t("createaccount.facebook")}
                    </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-4">
                    {t("createaccount.alreadyHaveAccount")}{' '}
                    <Link to='/login' className="text-green-600 hover:underline">
                        {t("createaccount.signin")}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
