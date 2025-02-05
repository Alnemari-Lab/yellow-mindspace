import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import FaceCapture from "./FaceCapture";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [faceImage, setFaceImage] = useState<Blob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();

  const translations = {
    en: {
      createAccount: "Create Account",
      backToHome: "Back to Home",
      fullName: "Full Name",
      email: "Email",
      password: "Password",
      register: "Register",
      alreadyHaveAccount: "Already have an account?",
      login: "Login",
      captureFace: "Capture Face",
      uploadImage: "Upload Image",
      faceRequired: "Please provide a face image",
      uploadOrCapture: "Upload or capture your face image",
    },
    ar: {
      createAccount: "إنشاء حساب",
      backToHome: "العودة للرئيسية",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      register: "تسجيل",
      alreadyHaveAccount: "لديك حساب بالفعل؟",
      login: "تسجيل الدخول",
      captureFace: "التقاط صورة",
      uploadImage: "رفع صورة",
      faceRequired: "يرجى تقديم صورة الوجه",
      uploadOrCapture: "قم برفع أو التقاط صورة الوجه",
    }
  };

  const t = translations[language];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Convert the uploaded file to a Blob
      const blob = new Blob([file], { type: file.type });
      setFaceImage(blob);
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!faceImage) {
      toast({
        title: "Error",
        description: t.faceRequired,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Register the user and get the session
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (!authData.user) throw new Error("User registration failed");

      // Get the session to use for upload
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) throw new Error("No session available");

      // 2. Upload the face image with the session
      const fileExt = "jpg";
      const fileName = `${authData.user.id}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("face_images")
        .upload(fileName, faceImage, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // 3. Get the public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from("face_images")
        .getPublicUrl(fileName);

      // 4. Create the user profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: authData.user.id,
          full_name: formData.name,
          face_image_url: publicUrl,
        });

      if (profileError) throw profileError;

      toast({
        title: "Success",
        description: "Registration successful! Please proceed to the MBTI test.",
      });

      // Navigate to MBTI test after successful registration
      navigate("/mbti-test");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: error.message || "Registration failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFaceCapture = (imageBlob: Blob) => {
    setFaceImage(imageBlob);
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
            required
          />
        </div>
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
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-2">{t.uploadOrCapture}</p>
          <Tabs defaultValue="capture" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="capture">{t.captureFace}</TabsTrigger>
              <TabsTrigger value="upload">{t.uploadImage}</TabsTrigger>
            </TabsList>
            <TabsContent value="capture">
              <FaceCapture onCapture={handleFaceCapture} />
            </TabsContent>
            <TabsContent value="upload">
              <div className="space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full"
                />
              </div>
            </TabsContent>
          </Tabs>
          {faceImage && (
            <p className="text-sm text-green-600">Face image captured successfully!</p>
          )}
        </div>
        <Button 
          type="submit" 
          className="w-full bg-secondary hover:bg-secondary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : t.register}
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