import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import registerSchema from "../../validations/registerSchema";
import InputField from "../../components/shared/Form/InputField";
import { useEffect } from "react";
import { getToken } from "../../utils/helpers";
import { toast } from "react-hot-toast";
import { UserPlus } from "lucide-react";
import Navbar from "../../components/layout/Navbar";

const RegisterPage = () => {
  const form = useForm({
    resolver: yupResolver(registerSchema),
  });

  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const onSubmit = async (data) => {
    const res = await register(data);
    if (res.success) {
      toast.success("Registration successful");
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
            <p className="text-5xl font-bold">REGISTER</p>
            <div className=" mt-1 h-12 w-12 bg-primary-600 rounded-xl flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <InputField
              label="Full name"
              name="name"
              inputProps={{ placeholder: "Enter name" }}
              form={form}
              labelClassName="block text-sm font-medium !text-gray-700"
            />

            <InputField
              label="Email address"
              name="email"
              type="email"
              form={form}
              inputProps={{ placeholder: "Enter email" }}
              labelClassName="block text-sm font-medium !text-gray-700"
            />

            <InputField
              label="Password"
              name="password"
              form={form}
              inputProps={{ placeholder: "Enter password" }}
              isPassword={true}
              labelClassName="block text-sm font-medium !text-gray-700"
            />

            <InputField
              label="Confirm password"
              name="cPassword"
              form={form}
              isPassword={true}
              inputProps={{ placeholder: "Enter confirm password" }}
              labelClassName="block text-sm font-medium !text-gray-700"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>

        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
