import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  useIonRouter,
} from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';

function HomeScreen() {
  const router = useIonRouter();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login', 'root', 'replace');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12"
              sizeMd="8"
              sizeLg="6"
            >
              <IonButton
                expand="block"
                color="primary"
                onClick={handleLogout}
              >
                <IonIcon icon={logOutOutline}
                  slot="start"
                />
                Logout
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default HomeScreen;
