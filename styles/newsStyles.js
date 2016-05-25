import React, { Dimensions } from 'react-native';
var { height } = Dimensions.get('window');

const PrayerStyles = React.StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 20
  },

  webView: {
    height: height
  }

});

export default PrayerStyles;