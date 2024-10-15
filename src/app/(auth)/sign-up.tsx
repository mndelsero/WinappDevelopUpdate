import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "@/config/tw";
import Input from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";
import * as yup from "yup";
import { toast } from "@backpackapp-io/react-native-toast";
import { useClerk, useOAuth, useSignIn, useSignUp,ClerkProvider } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import InputDatePicker from "@/components/InputDatePicker";
import { parse } from "date-fns";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheetRef, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { useFormik } from "formik";
import * as AppleAuthentication from "expo-apple-authentication";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking"

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Button from "@/components/Button";

const schema = yup.object().shape({
  username: yup.string().required("El username es requerido"),
  firstName: yup.string().required("El nombre es requerido"),
  lastName: yup.string().required("El apellido es requerido"),
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
  username: string;
  firstName : string;
  lastName : string;
  email: string;
  password: string;
}

export default function SignUpScreen() {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [visible, setVisible] = React.useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const router = useRouter();

  const { handleBlur, handleChange, handleSubmit, errors, isValid, values } =
    useFormik({
      initialValues: {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },

      validationSchema: schema,
      onSubmit: async (values) => {
        await onSubmit(values);
      },
    });





     const useWarmUpBrowser = () => {
      React.useEffect(() => {
        // Warm up the android browser to improve UX
        // https://docs.expo.dev/guides/authentication/#improving-user-experience
        void WebBrowser.warmUpAsync();
        return () => {
          void WebBrowser.coolDownAsync();
        };
      }, []);
    };
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const handleSignInWithGoogle = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow({ redirectUrl: Linking.createURL("/(authed)/(drawer)/(tabs)/(home)", { scheme: "myapp" })});
  
        if (createdSessionId) {
          setActive!({ session: createdSessionId });
        } else {
         
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    }, []);



  const onSubmit = async (data: SignInData) => {
    try {
      setVisible(true);
      if (!isLoaded) {
        return;
      }
      setLoading(true);
      await signUp.create({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.email,
        password: data.password,
      });

      const result = await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      console.log(result);
      bottomSheetRef.current?.expand();
      setLoading(false);
    } catch (e) {
      let error = "";
      // @ts-ignore
      console.log("Error completo:", e); // Imprime el error completo para más detalles

      if (e && e.errors && e.errors.length > 0) {
        switch (e.errors[0].code) {
          case "form_identifier_exists":
            error = "El correo ya está registrado";
            break;
          case "form_password_pwned":
            error = "La contraseña es muy débil";
            break;
          case "form_password_length_too_short":
            error = "La contraseña es muy corta";
            break;
          default:
            error = "No se pudo registrar el usuario";
            break;
        }
      } else {
        error = "Error desconocido: " + (e.message || e.toString());
      }
      toast.error(error);
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
   useEffect(() => {
    (async () => {
      if (value.length === 6) {
        if (!isLoaded) {
          return;
        }
        setLoading(true);
        console.log("Verificando código:", value); // Verifica el valor del código
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: value,
        });
        console.log("Respuesta de verificación:", completeSignUp); // Verifica la respuesta de la API
  
      // Verifica si hay campos faltantes
      if (completeSignUp.status === "missing_requirements") {
        toast.error("Faltan campos requeridos: " + completeSignUp.missingFields.join(", "));
        setLoading(false);
        return;
      }

        if (completeSignUp.status !== "complete") {
          toast.error("Código incorrecto");
          bottomSheetRef.current?.close();

          setLoading(false);
          return;
        }
  
        if (completeSignUp.status === "complete") {
          bottomSheetRef.current?.close();
          setLoading(false);
          await setActive({ session: completeSignUp.createdSessionId });
          toast.success("Usuario registrado correctamente");
          router.push("/(authed)/(drawer)/(tabs)/(home)");
        }
      }
    })();
  }, [value, isLoaded]);

  return (
    <BottomSheetModalProvider>
      <ScrollView style={[tw`bg-white h-full`]}>
        <View style={tw`bg-white mx-4 rounded-lg px-4 tablet:px-8 py-5 flex`}>
          <Text style={[tw`text-black font-bold tablet:text-3xl text-lg`]}>
            Crear una cuenta
          </Text>
          <Text style={tw`text-xs tablet:text-lg text-gray-500 mt-2 mb-10`}>
            para continuar, tienes que aceptar nuestra
            <Text style={tw`text-blue-500 `}> Politica de privacidad </Text>y
            <Text style={tw`text-blue-500 `}> Acuerdo y condiciones</Text>
          </Text>

          {Platform.OS === "ios" && AppleAuthentication.isAvailableAsync() && (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={5}
              style={{ width: "100%", height: 44 }}
              onPress={async () => {
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                  // signed in
                } catch (e) {
                  if (e.code === "ERR_CANCELED") {
                    // handle that the user canceled the sign-in flow
                  } else {
                    // handle other errors
                  }
                }
              }}
            />
          )}


		  


		  <Button
                title="Continuar con Google"
                loading={loading}
                textColor="#257be1"
				outline
                onPress={()=> handleSignInWithGoogle() }
				style={tw`w-full bg-white border-blue-500 text-blue-500 mt-2 tablet:mt-4 shadow-sm `}
              />
		  <Text style={tw`text-xs tablet:text-lg text-gray-500 my-4 text-center`}>
			O
		  </Text>



          <View style={tw`w-6/6 flex`}>
            <Input
              placeholder="username"
              onFocus={handleBlur("username")}
              onChangeText={handleChange("username")}
              value={values.username}
              error={!!errors.username}
              errorMessage={errors.username}
            />
            { <Input
							placeholder="Nombre"
              onFocus={handleBlur("firstName")}
              onChangeText={handleChange("firstName")}
              value={values.firstName}
              error={!!errors.firstName}
              errorMessage={errors.firstName}
              /> }
                   

            { <Input
							placeholder="Apellido"
							onFocus={handleBlur("lastName")}
							onChangeText={handleChange("lastName")}
							value={values.lastName}
							error={!!errors.lastName}
							errorMessage={errors.lastName}
						/> }

            <Input
              placeholder="Correo Electrónico"
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

            
					{/* 	<InputDatePicker
							placeholder="Fecha de nacimiento"
							onFocus={handleBlur("birthDate")}
							onChangeText={handleChange("birthDate")}
							value={values.birthDate === "" ? undefined : values.birthDate}
							error={!!errors.birthDate}
							errorMessage={errors.birthDate}
						/>

						<Input
							placeholder="Numero de Telefono"
							onFocus={handleBlur("phone")}
							onChangeText={handleChange("phone")}
							value={values.phone}
							error={!!errors.phone}
							errorMessage={errors.phone}
						/>
 */}
           

            <View style={tw`mt-4 tablet:mt-8 flex  items-center`}>
            

<TouchableOpacity
    activeOpacity={0.8}
    disabled={ false}
    onPress={() => handleSubmit()}
    style={tw.style(
        `border-2 border-primary rounded-full py-3 tablet:py-5 w-4/6 bg-primary shadow-lg px-4 `,
        ( !isValid) && "opacity-50"
    )}
>
    {loading ? (
        <ActivityIndicator size={20} color="white" />
    ) : (
        <View style={tw`flex items-center flex-row justify-between`}>
            <Text style={tw`text-white text-lg tablet:text-4xl`}>Continuar</Text>
            <Ionicons name="arrow-forward" style={tw`text-3xl tablet:text-5xl text-white self-center`} />
        </View>
    )}
</TouchableOpacity>

			  
            </View>
			<Text
              onPress={() => router.push("/(auth)/sign-in")}
              style={tw`text-sm tablet:text-lg text-black text-center font-bold mt-6`}
            >
              Ya tienes una cuenta?  <Text style={tw`text-primary`}>
			   Inicia sesión
			  </Text>
			  
            </Text>
          </View>
        </View>
      </ScrollView>
      <BottomSheet
        enableOverDrag
        ref={bottomSheetRef}
        snapPoints={["50%"]}
        index={-1}
      >
        <View style={tw`h-full w-full p-5`}>
          <Text style={tw`text-center text-2xl tablet:text-4xl`}>
            Verificacion de Correo
          </Text>
          <Text style={tw`text-center text-lg mt-2 tablet:text-2xl`}>
            Se ha enviado un codigo de verificacion a tu correo electronico
          </Text>

          {loading ? (
            <ActivityIndicator style={tw`mt-20 text-3xl tablet:text-8xl`} />
          ) : (
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={6}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={tw.style(
                    styles.cell,
                    isFocused && styles.focusCell,
                    "text-2xl tablet:text-4xl"
                  )}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          )}
        </View>
      </BottomSheet>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    flex: 1,
    justifyContent: "center",

    margin: "auto",
    alignItems: "center",
  },
  cell: {
    width: Dimensions.get("window").width / 8,
    margin: 5,
    height: Dimensions.get("window").width / 8,
    lineHeight: Dimensions.get("window").width / 8,
    borderWidth: 2,
    borderRadius: Dimensions.get("window").width / 25,
    borderColor: "grey",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});
