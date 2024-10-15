import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "@/config/tw";
import Input from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";
import * as yup from "yup";
import { toast } from "@backpackapp-io/react-native-toast";
import { useFormik } from "formik";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

const schema = yup.object().shape({
  confirmPassword: yup
    .string()
    .min(8, "La contraseña debe tener almenos 8 caracteres")
    .required("La contraseña es requerida")
    .test("passwords-match", "Las contraseñas no coinciden", function (value) {
      return this.parent.password === value;
    }),
  password: yup
    .string()
    .min(8, "La contraseña debe tener almenos 8 caracteres")
    .required("La contraseña es requerida"),
  code: yup
    .string()
    .min(6, "El codigo debe tener almenos 6 caracteres")
    .required("El codigo es requerido"),
});

interface NewPasswordData {
  confirmPassword: string;
  password: string;
  code: string;
}

export default function CodeScreen() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const { handleBlur, handleChange, handleSubmit, errors, values, isValid } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
        code: "",
      },
      validationSchema: schema,
      onSubmit: async (values) => {
        await onSubmit(values);
      },
    });

  const onSubmit = async (data: NewPasswordData) => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.code,
        password: data.password,
      });
      if (result?.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/(authed)/(drawer)/(tabs)/(home)");
        setLoading(false);
        return;
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error al cambiar la contraseña");
      setLoading(false);
    }
  };

  return (
    <View style={[tw`bg-white h-full`]}>
      <View style={tw`bg-white mx-4 rounded-lg px-4 tablet:px-8 py-5 flex`}>
        <Text style={[tw`text-black font-bold tablet:text-3xl text-lg`]}>
          Reset de contraseña
        </Text>

        <View style={tw`w-6/6 flex`}>
          <Input
            placeholder="Contraseña"
            onFocus={handleBlur("password")}
            onChangeText={handleChange("password")}
            value={values.password}
            error={!!errors.password}
            errorMessage={errors.password}
            secureTextEntry
          />

          <Input
            placeholder="Confirmar contraseña"
            onFocus={handleBlur("confirmPassword")}
            onChangeText={handleChange("confirmPassword")}
            value={values.confirmPassword}
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword}
            secureTextEntry
          />

          <Input
            placeholder="Código"
            onFocus={handleBlur("code")}
            onChangeText={handleChange("code")}
            value={values.code}
            error={!!errors.code}
            errorMessage={errors.code}
          />

          <View style={tw`mt-4 tablet:mt-8 flex  items-center`}>
            <Button
              loading={loading}
              disabled={!isValid}
              onPress={() => handleSubmit()}
              title="Cambiar contraseña"
			  textColor="#000"
            />

            <Text
              onPress={() => router.push("/(auth)/sign-in")}
              style={tw`text-sm tablet:text-lg text-black text-center font-bold mt-6`}
            >
              Ya tienes una cuenta?{" "}
              <Text style={tw`text-primary`}>Inicia sesión</Text>
            </Text>
            {/* <TouchableOpacity
							activeOpacity={0.8}
							disabled={loading}
							onPress={() => handleSubmit()}
							style={tw`bg-primary rounded-full w-12 h-12 tablet:w-20 tablet:h-20 flex items-center justify-center`}
						>
							{loading ? (
								<ActivityIndicator size={20} color="white" />
							) : (
								<Ionicons
									color={tw.color("white")}
									name="chevron-forward"
									style={tw`text-3xl tablet:text-5xl	`}
								/>
							)}
						</TouchableOpacity> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
