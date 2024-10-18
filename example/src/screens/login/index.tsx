import React from 'react';
import {
  IonContent,
  IonPage,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  useIonRouter,
  IonToolbar,
  IonHeader,
  IonAlert,
} from '@ionic/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IonicCapacitorBiometric } from 'ionic-capacitor-biometric';

// This is a fake set of credentials that we will use to authenticate the user
const fakeCredentials = {
  email: 'example@example.com',
  password: 'password',
};

function LoginScreen() {
  const router = useIonRouter();
  const [showAlert, setShowAlert] = React.useState(false);
  const [biometricAvailable, setBiometricAvailable] = React.useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address.')
      .required('Email is required.'),
    password: Yup.string().required('Password is required.'),
  });

  const onAuthSuccess = React.useCallback(async () => {
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/home', 'root', 'replace');
  }, [router]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (values.email === fakeCredentials.email && values.password === fakeCredentials.password) {
        try {
          await IonicCapacitorBiometric.requestBiometricPermissions();
          await IonicCapacitorBiometric.storeCredentials({
            username: values.email,
            trustedToken: fakeCredentials.password,
          });
          onAuthSuccess();
        } catch (error) {
          console.error('Failed on Biometric:', error);

          // We can still proceed with the login even if the biometric storage fails
          onAuthSuccess();
        }
      }
    },
  });

  const isBiometricAvailable = React.useCallback(async () => {
    try {
      await IonicCapacitorBiometric.isAvailable();
      setBiometricAvailable(true);
    } catch (error) {
      console.error('Biometric is not available:', error);
      setBiometricAvailable(false);
    }
  }, []);

  const onBiometricAuth = React.useCallback(async () => {
    try {
      await IonicCapacitorBiometric.requestBiometricPermissions();
      const { username, trustedToken } = await IonicCapacitorBiometric.retrieveCredentials();

      if (username === fakeCredentials.email && trustedToken === fakeCredentials.password) {
        onAuthSuccess();
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Failed on Biometric Auth:', error);
      setShowAlert(true);
    }
  }, [biometricAvailable]);

  React.useEffect(() => {
    isBiometricAvailable();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar />
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <IonCol size="12">
              <IonText>
                <h2>Login</h2>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <IonCol>
              <form onSubmit={formik.handleSubmit}>
                <IonGrid>
                  <IonRow>
                    <IonLabel position="stacked">Email</IonLabel>
                  </IonRow>
                  <IonRow>
                    <IonInput
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formik.values.email}
                      onIonChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onClick={() => {
                        if (biometricAvailable) {
                          onBiometricAuth();
                        }
                      }}
                    />
                  </IonRow>
                  <IonRow>
                    {formik.touched.email && formik.errors.email && (
                      <IonText color="danger">
                        <small className="ion-padding-start">
                          {formik.errors.email}
                        </small>
                      </IonText>
                    )}
                  </IonRow>
                </IonGrid>

                <IonGrid>
                  <IonRow>
                    <IonLabel position="stacked">Password</IonLabel>
                  </IonRow>
                  <IonRow>
                    <IonInput
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formik.values.password}
                      onIonChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </IonRow>
                  <IonRow>
                    {formik.touched.password && formik.errors.password && (
                      <IonText color="danger">
                        <small className="ion-padding-start">
                          {formik.errors.password}
                        </small>
                      </IonText>
                    )}
                  </IonRow>
                </IonGrid>

                <IonButton
                  expand="block"
                  type="submit"
                  className="ion-margin-top"
                >
                  Login
                </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Authentication Failed"
          message="Please check your credentials or biometric authentication."
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
}

export default LoginScreen;
