import React, {useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Navigation from './navigation';

const App: React.FC = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/active/) && nextAppState === 'background') {
      }

      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    //Для android плохо работает когда status bar стоит prop translucent
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
