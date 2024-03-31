import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import Loader from "../../components/ui/loader";
import AuthService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useUi } from "../../providers/UiProvider";

const formSchema = z
  .object({
    name: z.string({
      required_error: "name is required",
      invalid_type_error: "invalid input type",
    }),
    email: z
      .string({
        required_error: "email is required",
        invalid_type_error: "invalid input type",
      })
      .email("Please enter a valid email address.")
      .max(255, { message: "email must not exceed 255 characters." }),
    password: z
      .string({
        required_error: "password is required",
        invalid_type_error: "invalid input type",
      })
      .min(2, {
        message: "password must be at least 2 characters.",
      }),
    password_confirmation: z
      .string({
        required_error: "Password confirmation is required",
        invalid_type_error: "Invalid input type",
      })
      .min(2, {
        message: "Password must be at least 2 characters.",
      }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

const Register = () => {
  const { isLoading, setIsLoading } = useUi();
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await AuthService.register(values);
      const { data } = await AuthService.login({email: values.email, password: values.password}); //data is bearerToken
      localStorage.setItem("accessToken", JSON.stringify(data));
      login();
      navigate("/dashboard", { replace: true });
      setIsLoading(false);
    } catch (error) {
      toast.error(
        "Failed to Register. Please check your credentials and try again."
      );
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <main>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4 md:space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john doe"
                            {...field}
                            autoComplete="name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@company.com"
                            {...field}
                            autoComplete="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            {...field}
                            type="password"
                            autoComplete="current-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            {...field}
                            type="password"
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!isLoading ? (
                    <Button
                      type="submit"
                      className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Register
                    </Button>
                  ) : (
                    <Loader />
                  )}
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
