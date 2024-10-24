import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "@/config/tw";
import Input from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";
import * as yup from "yup";
import { toast } from "@backpackapp-io/react-native-toast";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFormik } from "formik";
import AuthLayout from "../../components/AuthLayout";
import Checkbox from "expo-checkbox";
import Button from "../../components/Button";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("El correo es invalido")
    .required("El correo es requerido"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener almenos 8 caracteres")
    .required("La contraseña es requerida"),
});

interface SignInData {
  email: string;
  password: string;
}

export default function SignInScreen() {
  const { isLoaded, signIn, setActive  } = useSignIn();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { isSignedIn,signOut, getToken, userId } = useAuth();
  const [isChecked, setChecked] = useState(false);

  // const {
  // 	control,
  // 	handleSubmit,
  // 	trigger,
  // 	getValues,
  // 	formState: { errors, isValid },
  // } = useForm({
  // 	resolver: yupResolver(schema),
  // });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    values,
    isValid,
    validateField,
  } = useFormik({
    initialValues: {
      email: "mndelsero@gmail.com",
      password: "12345678QA",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  const onSubmit = async (data: SignInData) => {
    if(!isSignedIn){
      try {
        if (!isLoaded) {
          return;
        }
        setLoading(true);
  
        
        const result = await signIn.create({
          identifier: data.email,
          password: data.password,
        });
  
        if (result?.status === "complete") {
          toast.success("Inicio de sesión exitoso");
          await setActive({ session: result.createdSessionId });
          router.push("/(authed)/(location)/(tabs)/(home)");
          setLoading(false);
          return;
        }
      } catch (e) {
        console.log();
        toast.error("Creedenciales incorrectas");
        setLoading(false);
      }
    // }else{ router.push("/(authed)/(drawer)/(tabs)/(home)");

    }

  
  };

  return (
    <View style={[tw`bg-white h-full items-center`]}>
      <AuthLayout>
        <>
          <View style={tw`flex flex-col items-start justify-start mb-4`}>
            <Text
              style={[
                tw`text-black  tablet:text-3xl text-3xl  tracking-normal`,
              ]}
            >
              BIENVENIDO A
            </Text>
            <Text
              style={[
                tw`text-black font-black tablet:text-3xl text-3xl ml-auto italic 	 `,
              ]}
            >
              WinApp
            </Text>
          </View>
          <Text style={tw`text-gray-700  text-base tablet:text-xl  mt-4`}>
            la aplicación que necesitas
          </Text>

          <View style={tw`w-6/6 flex`}>
            <Input
              placeholder="E-mail/Username"
              onFocus={handleBlur("email")}
              onChangeText={handleChange("email")}
              value={values.email}
              error={!!errors.email}
              errorMessage={errors.email}
            />

            <Input
              placeholder="Contraseña"
              onFocus={handleBlur("password")}
              onChangeText={handleChange("password")}
              value={values.password}
              error={!!errors.password}
              errorMessage={errors.password}
              secureTextEntry
            />

            <View
              style={tw`flex flex-row items-center justify-between w-full ml-2 mt-6 `}
            >
              <View style={tw`flex flex-row items-center`}>
                <Checkbox
                  value={isChecked}
                  onValueChange={setChecked}
                  style={tw`border-2 border-primary bg-white rounded-lg shadow-sm`}
                />
                <Text style={tw`ml-2 text-xs`}>Recordarme</Text>
              </View>

              <Text
                onPress={async () => {
                  const validate = await validateField("email");
                  if (!errors.email) {
                    const email = values.email;
                    await signIn
                      ?.create({
                        strategy: "reset_password_email_code",
                        identifier: email,
                      })
                      .catch((e) => {
                        console.log(e);
                      });

                    toast.success(
                      "Se envio un correo para restablecer tu contraseña"
                    );
                    router.push("/(auth)/forgot-password");
                  }
                }}
                style={tw`text-xs tablet:text-lg text-black text-right font-bold  underline`}
              >
                ¿Olvidaste tu contraseña?
              </Text>
            </View>

            <View style={tw`mt-4 tablet:mt-8 flex  items-center mt-10`}>
              <Button
                title="Iniciar sesión"
                loading={loading}
                textColor="#000"
                disabled={!isValid}
                onPress={() => {
                  handleSubmit();
                }}
              />
            </View>
            <View
              style={tw`mt-20 flex flex-row  items-end justify-center `}
            >
              <Text style={tw`text-black text-base tablet:text-lg text-center`}>
                ¿Todavía no tienes una cuenta?
              </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
                <Text
                  style={tw`text-black text-base tablet:text-lg text-center font-bold hover:underline ml-2`}
                >
                  Crea una Ya
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </AuthLayout>
    </View>
  );
}

const styles = StyleSheet.create({});
