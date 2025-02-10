import ImageSection from "../components/ImageSection";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex bg-teal-500 rounded-xl shadow-lg overflow-hidden max-w-5xl w-full p-4">
        <ImageSection />
        <LoginForm />
      </div>
    </div>
  );
}
