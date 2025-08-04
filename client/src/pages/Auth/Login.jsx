import { Link, useNavigate } from "react-router-dom";
import loginSchema from "../../validations/loginSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/shared/Form/InputField";
import { useEffect } from "react";
import { getToken } from "../../utils/helpers";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { LogIn } from "lucide-react";
import Navbar from "../../components/layout/Navbar";

const Login = () => {
  const form = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const onSubmit = async (data) => {
    const res = await login(data);
    if (res.success) {
      toast.success("Login successful");
      navigate("/");
    } else {
      toast.error(error || "Something went wrong");
    }
  };

  useEffect(() => {
    if (getToken()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <Navbar isAuthPage={true} />
      <div className=" min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center ">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="flex items-center gap-4 w-fit mx-auto">
            <p className="text-5xl font-bold">LOGIN</p>
            <div className=" mt-1 h-12 w-12 bg-primary-600 rounded-xl flex items-center justify-center">
              <LogIn className="h-6 w-6 text-white" />
            </div>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <InputField
              label="Email address"
              name="email"
              type="email"
              form={form}
              inputProps={{ placeholder: "Enter email" }}
              labelClassName="block text-sm font-medium !text-gray-700"
            />
            <InputField
              name="password"
              label="Password"
              form={form}
              isPassword={true}
              inputProps={{ placeholder: "Enter password" }}
              labelClassName="block text-sm font-medium !text-gray-700"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-2 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
