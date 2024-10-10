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

const fakeCredentials = {
  email: 'example@example.com',
  password: 'password',
};

function LoginScreen() {
  const router = useIonRouter();
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
  const [showAlert, setShowAlert] = React.useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address.')
      .required('Email is required.'),
    password: Yup.string().required('Password is required.'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await IonicCapacitorBiometric.requestBiometricPermissions();

        const authResult = await IonicCapacitorBiometric.authenticate();
        console.log('Biometric authentication successful', authResult);
      } catch (error) {
        console.error('Biometric authentication failed:', error);
      }
    },
  });

  React.useEffect(() => {
    const checkStoredCredentials = async () => {
      try {
        const credentials = await IonicCapacitorBiometric.retrieveCredentials();
        if (credentials) {
          formik.setValues({
            email: credentials.username,
            password: '',
          });
        }
      } catch (error) {
        console.error('Failed to retrieve credentials:', error);
      }
    };

    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      router.push('/home', 'root', 'replace');
    } else {
      checkStoredCredentials();
    }
    setIsCheckingAuth(false);
  }, [router]);

  if (isCheckingAuth) {
    return null;
  }

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
