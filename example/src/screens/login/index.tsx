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
} from '@ionic/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { sayHello } from 'ionic-capacitor-biometric';

const fakeCredentials = {
  email: 'example@example.com',
  password: 'password',
};

function LoginScreen() {
  const router = useIonRouter();
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

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
    onSubmit: (values) => {
      sayHello();
      if (
        values.email === fakeCredentials.email
        && values.password === fakeCredentials.password
      ) {
        localStorage.setItem('isAuthenticated', 'true');
        router.push('/home', 'root', 'replace');
      }
    },
  });

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      router.push('/home', 'root', 'replace');
    }
    setIsCheckingAuth(false);
  }, []);

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
                    <IonText color="danger"
                      className="ion-padding"
                    >
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
      </IonContent>
    </IonPage>
  );
}

export default LoginScreen;
