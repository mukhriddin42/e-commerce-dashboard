import React, { useContext, useState } from 'react';
import { ThemeContext } from '../hooks/useContext';
import { useTranslation } from 'react-i18next';

const SiteSettings = () => {
  const [registration, setRegistration] = useState("all");
  const [notify, setNotify] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <div className={theme === 'black'
      ? '!text-white !bg-black max-w-6xl mx-auto p-8 !rounded-lg shadow'
      : '!text-black !bg-white max-w-6xl mx-auto p-8 !rounded-lg shadow'}>

      {/* Website name */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">{t("sitesettings.websiteName")}</h2>
        <p className="text-sm text-gray-500 mb-4">{t("sitesettings.websiteDesc")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="homepage" className="block text-sm font-medium text-gray-700 my-3">
              {t("sitesettings.homeTitle")}
            </label>
            <input
              type="text"
              id="homepage"
              placeholder={t("sitesettings.homePlaceholder")}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="my-3 block text-sm font-medium text-gray-700">
              {t("sitesettings.descLabel")}
            </label>
            <textarea
              id="description"
              rows="3"
              placeholder={t("sitesettings.descPlaceholder")}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
      </div>

      {/* Access options */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">{t("sitesettings.access")}</h2>
        <p className="text-sm text-gray-500 !my-4">{t("sitesettings.accessDesc")}</p>
        <div className="space-y-2">
          {["all", "buyers", "sellers", "stop"].map((type) => (
            <div key={type}>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="access"
                  value={type}
                  checked={registration === type}
                  onChange={() => setRegistration(type)}
                />
                <span className="ml-2">{t(`sitesettings.${type}`)}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Notification */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">{t("sitesettings.notification")}</h2>
        <label className="inline-flex items-center mt-2">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={notify}
            onChange={() => setNotify(!notify)}
          />
          <span className="ml-2">{t("sitesettings.notifyText")}</span>
        </label>
      </div>
    </div>
  );
};

export default SiteSettings;
