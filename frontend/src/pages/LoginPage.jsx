import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { loginSchema } from "../lib/yup";
import {MailIcon,
  MessageSquare,
  Eye,
  EyeOff,
  Lock,
  Loader2,} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoggingIn, login } = useAuthStore();

  const validateForm = async () => {
    try {
      await loginSchema.validate(formData);
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    console.log(isValid)
    if (isValid) {
      login(formData);
    }
  };
  return <div className="min-h-screen flex items-center justify-center">
     <div className="flex flex-col items-center justify-center sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary   flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 " />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">
               Sign in to your account
              </p>
            </div>
          </div>
          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-6">
           
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                  <MailIcon className="size-5 " />
                </div>
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  className="input input-bordered w-full pl-10"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <Loader2 className="animate-spin size-5" />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center ">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
  </div>;
};

export default LoginPage;
