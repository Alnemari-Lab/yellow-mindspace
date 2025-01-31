import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    en: {
      createAccount: "Create Account",
      backToHome: "Back to Home",
      fullName: "Full Name",
      email: "Email",
      password: "Password",
      register: "Register",
      alreadyHaveAccount: "Already have an account?",
      login: "Login"
    },
    ar: {
      createAccount: "إنشاء حساب",
      backToHome: "العودة للرئيسية",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      register: "تسجيل",
      alreadyHaveAccount: "لديك حساب بالفعل؟",
      login: "تسجيل الدخول"
    }
  };

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will implement registration logic after Supabase connection
    console.log("Registration data:", formData);
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t.createAccount}</h2>
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-900"
        >
          {t.backToHome}
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder={t.fullName}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder={t.email}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder={t.password}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
          {t.register}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        {t.alreadyHaveAccount}{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-secondary hover:underline"
        >
          {t.login}
        </button>
      </p>
    </Card>
  );
};

export default RegisterForm;