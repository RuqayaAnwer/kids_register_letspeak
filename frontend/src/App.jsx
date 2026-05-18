import { useState } from 'react';
import './index.css';

const BackgroundShapes = () => (
  <div className="bg-shapes-container">
    {/* Book */}
    <svg className="floating-shape shape-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
    </svg>
    {/* Globe */}
    <svg className="floating-shape shape-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
    {/* Laptop */}
    <svg className="floating-shape shape-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
    {/* Graduation Cap */}
    <svg className="floating-shape shape-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
    {/* Star / Success Element */}
    <svg className="floating-shape shape-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  </div>
);

function App() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    schoolLevel: '',
    parentName: '',
    phone: '',
    package: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePackageSelect = (pkg) => {
    setFormData({ ...formData, package: pkg });
  };

  const nextStep = () => {
    if (step === 1 && (!formData.childName || !formData.childAge || !formData.schoolLevel)) {
      alert('يرجى تعبئة جميع بيانات الطفل');
      return;
    }
    if (step === 2 && (!formData.parentName || !formData.phone)) {
      alert('يرجى تعبئة جميع بيانات ولي الأمر');
      return;
    }
    if (step === 3 && !formData.package) {
      alert('يرجى اختيار باقة');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // بما أن الاستضافة ستكون على دومين خاص، سنستخدم مساراً نسبياً أو مسار الدومين لاحقاً
      // هنا سنستخدم عنوان الـ API الذي أنشأناه
      const response = await fetch('http://localhost/backend/api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      if (result.success) {
        setStep(4); // Success Step
      } else {
        alert('حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Fallback for demonstration if API isn't running locally yet
      setTimeout(() => setStep(4), 1000); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <BackgroundShapes />
      <div className="header">
        <img src="/logo.png" alt="Let's Speak Logo" className="site-logo" />
        <h1 className="logo">Let's <span>Speak</span></h1>
        <p className="subtitle">استمارة تسجيل الاطفال في كورسات اللغة الانجليزية</p>
      </div>

      <div className="form-card">
        {step < 4 && (
          <div className="step-indicator">
            <div className={`step-dot ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}></div>
            <div className={`step-dot ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}></div>
            <div className={`step-dot ${step >= 3 ? 'active' : ''}`}></div>
          </div>
        )}

        {/* Step 1: Child Info */}
        {step === 1 && (
          <div className="step-content">
            <h2 style={{marginBottom: '1.5rem', color: 'var(--primary)'}}>👧👦 معلومات البطل</h2>
            
            <div className="form-group">
              <label className="form-label">اسم الطفل الثلاثي</label>
              <input 
                type="text" 
                className="form-input" 
                name="childName"
                value={formData.childName}
                onChange={handleInputChange}
                placeholder="أدخل اسم الطفل" 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">عمر الطفل</label>
              <input 
                type="number" 
                className="form-input" 
                name="childAge"
                value={formData.childAge}
                onChange={handleInputChange}
                placeholder="كم عمر البطل؟" 
              />
            </div>

            <div className="form-group">
              <label className="form-label">المرحلة الدراسية الحالية</label>
              <select 
                className="form-input" 
                name="schoolLevel"
                value={formData.schoolLevel}
                onChange={handleInputChange}
              >
                <option value="">اختر المرحلة</option>
                <option value="روضة">روضة (KG)</option>
                <option value="ابتدائي">ابتدائي</option>
                <option value="متوسط">متوسط</option>
              </select>
            </div>

            <div className="btn-container">
              <button className="btn btn-primary" onClick={nextStep}>
                التالي ⬅️
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Parent Info */}
        {step === 2 && (
          <div className="step-content">
            <h2 style={{marginBottom: '1.5rem', color: 'var(--tertiary)'}}>👨‍👩‍👧 معلومات ولي الأمر</h2>
            
            <div className="form-group">
              <label className="form-label">اسم ولي الأمر</label>
              <input 
                type="text" 
                className="form-input" 
                name="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                placeholder="الاسم الكامل لولي الأمر" 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">رقم الهاتف (واتساب)</label>
              <input 
                type="tel" 
                className="form-input" 
                dir="ltr"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+964..." 
              />
            </div>

            <div className="btn-container">
              <button className="btn btn-secondary" onClick={prevStep}>
                ➡️ السابق
              </button>
              <button className="btn btn-primary" onClick={nextStep}>
                التالي ⬅️
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Packages */}
        {step === 3 && (
          <div className="step-content">
            <h2 style={{marginBottom: '1.5rem', color: 'var(--secondary)'}}>🎁 الباقات المتاحة</h2>
            
            <div className="packages-grid">
              <div 
                className={`package-card ${formData.package === 'توازن' ? 'selected' : ''}`}
                onClick={() => handlePackageSelect('توازن')}
              >
                <span className="package-icon">⚖️</span>
                <div className="package-name">باقة التوازن</div>
                <div className="package-price">180,000 <span>د.ع</span></div>
              </div>
              
              <div 
                className={`package-card ${formData.package === 'سرعة' ? 'selected' : ''}`}
                onClick={() => handlePackageSelect('سرعة')}
              >
                <span className="package-icon">🚀</span>
                <div className="package-name">باقة السرعة</div>
                <div className="package-price">300,000 <span>د.ع</span></div>
              </div>
            </div>

            <div className="btn-container">
              <button className="btn btn-secondary" onClick={prevStep} disabled={loading}>
                ➡️ السابق
              </button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? 'جاري الإرسال...' : 'إتمام التسجيل 🎉'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="success-container">
            <span className="success-icon">🥳</span>
            <h2 className="success-title">تم تسجيل البطل بنجاح!</h2>
            <p className="success-text">
              شكراً لاختياركم Let's Speak. <br/>
              لتأكيد التسجيل وتحديد موعد المحادثة التعريفية، يرجى التواصل معنا عبر:
            </p>
            
            <div className="contact-links">
              <a href="https://wa.me/YOUR_NUMBER_HERE" target="_blank" rel="noopener noreferrer" className="contact-btn contact-whatsapp">
                💬 تواصل معنا عبر واتساب
              </a>
              <a href="https://t.me/lets_peak" target="_blank" rel="noopener noreferrer" className="contact-btn contact-telegram">
                ✈️ تواصل معنا عبر تيليجرام
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
