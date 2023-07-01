import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Navigation from './navigation';
import {persistor, store} from './store';

const App: React.FC = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 500});
  }, []);

  return (
    <SafeAreaProvider>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </PersistGate>
    </SafeAreaProvider>
  );
};

export default App;
