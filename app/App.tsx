import React, {useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import {Provider} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import {PersistGate} from 'redux-persist/integration/react';

import Navigation from './navigation';
import {persistor, store} from './store';

const App: React.FC = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });

    RNBootSplash.hide({fade: true, duration: 500});

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    //Для android плохо работает когда status bar стоит prop translucent
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </PersistGate>
  );
};

export default App;
