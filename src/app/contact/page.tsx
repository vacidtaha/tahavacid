"use client"

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import I18nProvider from '@/components/I18nProvider';
import FileUpload from '@/components/FileUpload';
import LanguageSwitcher from '@/components/LanguageSwitcher';

function ContactForm() {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  // URL'den dil parametresini oku
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      if (langParam && i18n.language !== langParam) {
        i18n.changeLanguage(langParam);
      }
    }
  }, [i18n]);

  const handleFilesChange = (files: File[]) => {
    console.log('Files changed:', files);
    setUploadedFiles(files);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) error = t('requiredField');
        else if (value.trim().length < 2) error = t('nameMinLength');
        break;
      case 'email':
        if (!value.trim()) error = t('emailRequired');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = t('emailInvalid');
        break;
      case 'country':
        if (!value.trim()) error = t('countryRequired');
        break;
      case 'primaryReason':
        if (!value) error = t('reasonRequired');
        break;
      case 'urgencyLevel':
        if (!value) error = t('urgencyRequired');
        break;
      case 'subject':
        if (!value.trim()) error = t('subjectRequired');
        else if (value.trim().length < 5) error = t('subjectMinLength');
        break;
      case 'detailedMessage':
        if (!value.trim()) error = t('messageRequired');
        else if (value.trim().length < 20) error = t('messageMinLength');
        break;
    }
    
    return error;
  };

  const handleFieldChange = (name: string, value: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (formData: FormData): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    const requiredFields = [
      'fullName', 'email', 'country', 'primaryReason', 
      'urgencyLevel', 'subject', 'detailedMessage'
    ];
    
    requiredFields.forEach(field => {
      const value = formData.get(field) as string || '';
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });
    
    if (!formData.get('verification')) {
      newErrors.verification = t('verificationRequired');
    }
    
    setErrors(newErrors);
    const allTouchedFields = [...requiredFields, 'verification'].reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouchedFields);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    
    if (!validateForm(formData)) {
      setSubmitMessage(t('formValidationError'));
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');

    const submission = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || undefined,
      country: formData.get('country') as string,
      organization: formData.get('organization') as string || undefined,
      primaryReason: formData.get('primaryReason') as string,
      urgencyLevel: formData.get('urgencyLevel') as string,
      impactScope: formData.get('impactScope') as string || undefined,
      subject: formData.get('subject') as string,
      detailedMessage: formData.get('detailedMessage') as string,
      supportingInfo: formData.get('supportingInfo') as string || undefined,
      emergencyFlag: formData.get('emergencyFlag') === 'on',
      previousAttempts: formData.get('previousAttempts') as string || undefined,
      verificationConfirmed: formData.get('verification') === 'on',
      files: uploadedFiles
    };

    // Form verilerini console'a yazdır
    console.log('📝 Form Submission:', submission);
    
    // 2 saniye sonra başarı mesajı göster
    setTimeout(() => {
      setSubmitMessage('✅ ' + t('formSubmittedSuccessfully'));
      setIsSubmitting(false);
      
      // Form verilerini localStorage'a kaydet
      const formSummary = {
        fullName: submission.fullName,
        email: submission.email,
        country: submission.country,
        primaryReason: submission.primaryReason,
        urgencyLevel: submission.urgencyLevel,
        subject: submission.subject,
        filesCount: uploadedFiles.length,
        submittedAt: new Date().toISOString()
      };
      localStorage.setItem('lastSubmission', JSON.stringify(formSummary));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-black mb-6">
              {t('title')}
            </h1>
            <div className="bg-gray-100 border border-gray-300 p-6 mb-8">
              <p className="text-gray-800 leading-relaxed">
                <strong>{t('securityNotice')}</strong> {t('securityText')}
              </p>
              <p className="text-sm text-gray-600 mt-3">
                {t('securitySubtext')}
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-gray-50 border border-gray-300 p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    {t('fullName')} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="fullName"
                    className={`w-full px-3 py-2 border bg-white text-black focus:outline-none ${
                      errors.fullName && touched.fullName 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-black'
                    }`}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    onBlur={(e) => handleFieldChange('fullName', e.target.value)}
                    required
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    {t('emailAddress')} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    className={`w-full px-3 py-2 border bg-white text-black focus:outline-none ${
                      errors.email && touched.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-black'
                    }`}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    onBlur={(e) => handleFieldChange('email', e.target.value)}
                    required
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    {t('phoneNumber')}
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-black focus:outline-none focus:border-black"
                    placeholder="+1 (555) 123-4567"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    {t('phoneHelper')}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    {t('countryLocation')} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="country"
                    className={`w-full px-3 py-2 border bg-white text-black focus:outline-none ${
                      errors.country && touched.country 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-black'
                    }`}
                    placeholder={t('countryPlaceholder')}
                    onChange={(e) => handleFieldChange('country', e.target.value)}
                    onBlur={(e) => handleFieldChange('country', e.target.value)}
                    required
                  />
                  {errors.country && touched.country && (
                    <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    {t('organization')}
                  </label>
                  <input 
                    type="text" 
                    name="organization"
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-black focus:outline-none focus:border-black"
                    placeholder={t('organizationPlaceholder')}
                  />
                </div>
              </div>

              {/* Contact Reason */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('primaryReason')} <span className="text-red-500">*</span>
                </label>
                <select 
                  name="primaryReason" 
                  className={`w-full px-3 py-2 border bg-white text-black focus:outline-none ${
                    errors.primaryReason && touched.primaryReason 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-black'
                  }`}
                  onChange={(e) => handleFieldChange('primaryReason', e.target.value)}
                  onBlur={(e) => handleFieldChange('primaryReason', e.target.value)}
                  required
                >
                  <option value="">{t('selectReason')}</option>
                  <option value="emergency">{t('emergency')}</option>
                  <option value="breakthrough">{t('breakthrough')}</option>
                  <option value="ai-ethics">{t('aiEthics')}</option>
                  <option value="collaboration">{t('collaboration')}</option>
                  <option value="innovation">{t('innovation')}</option>
                  <option value="funding">{t('funding')}</option>
                  <option value="partnership">{t('partnership')}</option>
                  <option value="research">{t('research')}</option>
                  <option value="humanitarian">{t('humanitarian')}</option>
                  <option value="technology">{t('technology')}</option>
                  <option value="consultation">{t('consultation')}</option>
                  <option value="other">{t('other')}</option>
                </select>
                {errors.primaryReason && touched.primaryReason && (
                  <p className="text-red-500 text-xs mt-1">{errors.primaryReason}</p>
                )}
              </div>

              {/* Urgency Level */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('urgencyLevel')} <span className="text-red-500">*</span>
                </label>
                <select 
                  name="urgencyLevel" 
                  className={`w-full px-3 py-2 border bg-white text-black focus:outline-none ${
                    errors.urgencyLevel && touched.urgencyLevel 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-black'
                  }`}
                  onChange={(e) => handleFieldChange('urgencyLevel', e.target.value)}
                  onBlur={(e) => handleFieldChange('urgencyLevel', e.target.value)}
                  required
                >
                  <option value="">{t('selectUrgency')}</option>
                  <option value="critical">{t('critical')}</option>
                  <option value="high">{t('high')}</option>
                  <option value="moderate">{t('moderate')}</option>
                  <option value="low">{t('low')}</option>
                </select>
                {errors.urgencyLevel && touched.urgencyLevel && (
                  <p className="text-red-500 text-xs mt-1">{errors.urgencyLevel}</p>
                )}
              </div>

              {/* Scope of Impact */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('impactScope')}
                </label>
                <select name="impactScope" className="w-full px-3 py-2 border border-gray-300 bg-white text-black focus:outline-none focus:border-black">
                  <option value="">{t('selectImpact')}</option>
                  <option value="global">{t('global')}</option>
                  <option value="continental">{t('continental')}</option>
                  <option value="national">{t('national')}</option>
                  <option value="regional">{t('regional')}</option>
                  <option value="personal">{t('personal')}</option>
                  <option value="unknown">{t('unknown')}</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('subjectLine')} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="subject"
                  className={`w-full px-3 py-2 border bg-white text-black focus:outline-none ${
                    errors.subject && touched.subject 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-black'
                  }`}
                  placeholder={t('subjectPlaceholder')}
                  onChange={(e) => handleFieldChange('subject', e.target.value)}
                  onBlur={(e) => handleFieldChange('subject', e.target.value)}
                  required
                />
                {errors.subject && touched.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Detailed Message */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('detailedMessage')} <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={8}
                  name="detailedMessage"
                  className={`w-full px-3 py-2 border bg-white text-black focus:outline-none resize-none ${
                    errors.detailedMessage && touched.detailedMessage 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-black'
                  }`}
                  placeholder={t('messagePlaceholder')}
                  onChange={(e) => handleFieldChange('detailedMessage', e.target.value)}
                  onBlur={(e) => handleFieldChange('detailedMessage', e.target.value)}
                  required
                ></textarea>
                {errors.detailedMessage && touched.detailedMessage && (
                  <p className="text-red-500 text-xs mt-1">{errors.detailedMessage}</p>
                )}
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-black mb-4">
                  {t('supportingInfo')}
                </label>
                <FileUpload 
                  maxFileSize={50}
                  maxTotalSize={400}
                  maxFiles={8}
                  onFilesChange={handleFilesChange}
                />
                <p className="text-xs text-gray-600 mt-3">
                  {t('fileUploadHelper')}
                </p>
                <textarea 
                  rows={2}
                  name="supportingInfo"
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-black focus:outline-none focus:border-black resize-none mt-3"
                  placeholder={t('fileUploadPlaceholder')}
                ></textarea>
              </div>

              {/* Emergency Flag */}
              <div className="bg-red-50 border border-red-300 p-4">
                <label className="flex items-start">
                  <input type="checkbox" name="emergencyFlag" className="mr-3 mt-1" />
                  <div>
                    <span className="text-sm font-medium text-black">
                      {t('emergencyFlag')}
                    </span>
                    <p className="text-xs text-red-600 mt-1">
                      {t('emergencyWarning')}
                    </p>
                  </div>
                </label>
              </div>

              {/* Previous Attempts */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('previousAttempts')}
                </label>
                <textarea 
                  rows={3}
                  name="previousAttempts"
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-black focus:outline-none focus:border-black resize-none"
                  placeholder={t('attemptsPlaceholder')}
                ></textarea>
              </div>

              {/* Verification */}
              <div className={`bg-gray-100 border p-4 ${
                errors.verification && touched.verification 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}>
                <label className="flex items-start">
                  <input 
                    type="checkbox" 
                    name="verification" 
                    className="mr-3 mt-1" 
                    onChange={(e) => {
                      setTouched(prev => ({ ...prev, verification: true }));
                      if (e.target.checked) {
                        setErrors(prev => ({ ...prev, verification: '' }));
                      } else {
                        setErrors(prev => ({ ...prev, verification: t('verificationRequired') }));
                      }
                    }}
                    required 
                  />
                  <span className="text-sm text-black">
                    {t('verification')} <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.verification && touched.verification && (
                  <p className="text-red-500 text-xs mt-2">{errors.verification}</p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full font-medium py-4 px-4 border transition-all duration-300 flex items-center justify-center ${
                    isSubmitting 
                      ? 'bg-blue-600 text-white border-blue-600 cursor-not-allowed' 
                      : 'bg-black text-white border-black hover:bg-gray-900'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('processing')}
                    </div>
                  ) : t('submitButton')}
                </button>
                
                {submitMessage && (
                  <div className={`mt-4 p-3 rounded ${
                    submitMessage.includes('✅')
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    {submitMessage}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const ContactFormDynamic = dynamic(() => Promise.resolve(ContactForm), { 
  ssr: false 
});

export default function Contact() {
  return (
    <I18nProvider>
      <ContactFormDynamic />
    </I18nProvider>
  );
} 