import React from 'react';
import { setupIonicReact, IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { HomeScreen, LoginScreen } from './screens';
import { ProtectedRoute } from './components';

import '@ionic/react/css/core.css';
import { AppRoutes } from './constants';

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path={AppRoutes.Login}
            component={LoginScreen}
            exact
          />
          <ProtectedRoute path={AppRoutes.Home}
            component={HomeScreen}
          />
          <Redirect from="/"
            to="/login"
            exact
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
