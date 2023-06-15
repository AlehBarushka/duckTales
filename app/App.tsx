import React, {useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import {Provider} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';

import Navigation from './navigation';
import {store} from './store';

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
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
