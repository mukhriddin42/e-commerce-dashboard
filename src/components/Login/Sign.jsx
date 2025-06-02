import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../hooks/useContext';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/authContext';

const Sign = () => {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    const [form, setForm] = React.useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate(); 
    
    const { login } = useAuth(); 

    
    
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(form.email, form.password);
            navigate('/'); // Redirect to home 
        }
        catch (err) {
            console.error("Login failed:", err);
            alert('Login failed: ' + err.response?.data?.message);
        }
        
    }




    const containerClass = theme === 'black'
        ? 'flex items-center justify-center bg-black text-white'
        : 'flex items-center justify-center bg-gray-100 text-black';

    const cardClass = theme === 'black'
        ? 'bg-gray-900 text-white p-8 rounded-xl shadow-md w-full max-w-md'
        : 'bg-white text-black p-8 rounded-xl shadow-md w-full max-w-md';

    const inputClass = `w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${theme === 'black' ? 'bg-black text-white' : 'bg-white text-black'
        }`;

    const secondaryText = theme === 'black' ? 'text-gray-400' : 'text-gray-600';
    const hoverBg = theme === 'black' ? 'hover:bg-gray-800' : 'hover:bg-gray-100';

    return (
        <div className={containerClass}>
            <div className={cardClass}>
                <h2 className="text-2xl font-semibold !mb-10 text-center">{t('sign.title')}</h2>

                <form onSubmit={handleLogin}
                className="flex flex-col gap-10 w-80">
                    <input
                        type="text"
                        placeholder={t('sign.usernamePlaceholder')}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                        required
                    />

                    <input
                        type="password"
                        autocomplete="username"
                        placeholder={t('sign.passwordPlaceholder')}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className={inputClass}
                        required
                    />

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="accent-green-500" />
                            <span>{t('sign.remember')}</span>
                        </label>
                        <a href="#" className="text-blue-500 hover:underline">{t('sign.forgotPassword')}</a>
                    </div>

                    
                        <button
                            type="submit"
                            className="w-full bg-green-500 !text-white py-2 !rounded-md hover:bg-green-600 transition"
                        >
                            {t('sign.loginBtn')}
                        </button>
                    
                </form>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className={`px-2 ${secondaryText} text-sm`}>{t('sign.orSignupWith')}</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <div className="flex flex-col gap-5 mb-5">
                    <button className={`w-full !border !border-green-300 py-2 !rounded-md flex items-center justify-center ${hoverBg}`}>
                        <img src="https://yt3.googleusercontent.com/K8WVrQAQHTTwsHEtisMYcNai7p7XIlyEAdZg86qYw78ye57r5DRemHQ9Te4PcD_v98HB-ZvQjQ=s900-c-k-c0x00ffffff-no-rj" alt="Google" className="w-5 h-5 mr-2" />
                        {t('sign.signInGoogle')}
                    </button>

                    <button className={`w-full !border !border-green-300 py-2 !rounded-md flex items-center justify-center ${hoverBg}`}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s" alt="Facebook" className="w-5 h-5 mr-2" />
                        {t('sign.signInFacebook')}
                    </button>
                </div>

                <p className={`text-center text-sm ${secondaryText} mt-4`}>
                    {t('sign.dontHaveAccount')} <Link to='/login/createAkk' className="text-green-600 hover:underline">{t('sign.signUpLink')}</Link>
                </p>
            </div>
        </div>
    );
}

export default Sign;
