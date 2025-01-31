import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import FaceCapture from "@/components/FaceCapture";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isUsingFace, setIsUsingFace] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();

  const translations = {
    en: {
      login: "Login",
      backToHome: "Back to Home",
      email: "Email",
      password: "Password",
      loginWithFace: "Login with Face",
      loginWithCredentials: "Login with Email",
      noAccount: "Don't have an account?",
      register: "Register",
      switchToFace: "Use Face Recognition",
      switchToEmail: "Use Email & Password",
    },
    ar: {
      login: "تسجيل الدخول",
      backToHome: "العودة للرئيسية",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      loginWithFace: "تسجيل الدخول بالوجه",
      loginWithCredentials: "تسجيل الدخول بالبريد الإلكتروني",
      noAccount: "ليس لديك حساب؟",
      register: "تسجيل",
      switchToFace: "استخدم التعرف على الوجه",
      switchToEmail: "استخدم البريد الإلكتروني وكلمة المرور",
    }
  };

  const t = translations[language];

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Logged in successfully!",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFaceLogin = async (faceBlob: Blob) => {
    setIsSubmitting(true);
    try {
      // First, upload the captured face image
      const fileName = `login-attempt-${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from("face_images")
        .upload(fileName, faceBlob, {
          contentType: "image/jpeg",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get the URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from("face_images")
        .getPublicUrl(fileName);

      // TODO: Here you would typically make a call to your backend to:
      // 1. Compare the uploaded face image with stored face images
      // 2. If a match is found, get the corresponding user's email
      // 3. Log in that user

      // For now, we'll show a message indicating this feature is in development
      toast({
        title: "Face Login",
        description: "Face recognition login is currently in development. Please use email login for now.",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Face login error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to process face login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t.login}</h2>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-900"
          >
            {t.backToHome}
          </Button>
        </div>

        <Button
          onClick={() => setIsUsingFace(!isUsingFace)}
          variant="outline"
          className="w-full mb-4"
        >
          {isUsingFace ? t.switchToEmail : t.switchToFace}
        </Button>

        {isUsingFace ? (
          <div className="space-y-4">
            <FaceCapture onCapture={handleFaceLogin} />
          </div>
        ) : (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder={t.email}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder={t.password}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-secondary hover:bg-secondary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : t.loginWithCredentials}
            </Button>
          </form>
        )}

        <p className="mt-4 text-center text-sm text-gray-600">
          {t.noAccount}{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-secondary hover:underline"
          >
            {t.register}
          </button>
        </p>
      </Card>
    </div>
  );
};

export default Login;