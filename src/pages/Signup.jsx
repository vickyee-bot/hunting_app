import ImageSection from "../components/ImageSection";
import SignupForm from "../components/SignupForm";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex bg-teal-500 rounded-xl shadow-lg overflow-hidden max-w-5xl w-full p-4">
        <ImageSection />
        <SignupForm />
      </div>
    </div>
  );
}
