import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const logoUrl = 'https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg'; // Use your image URL (PNG or JPG)
const backgroundUrl = 'https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg';
const logoPosition = { x: 63.328125, y: 214.2985076904297 };

const App = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: backgroundUrl }} style={styles.backgroundImage} resizeMode="cover" />
      
      <Image
        source={{ uri: logoUrl }}
        style={[styles.logo, { left: logoPosition.x, top: logoPosition.y }]}
        // style={[styles.logo, { left: 10, top: 10 }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '50%',
  },
  logo: {
    width: 50,     // Adjust to your logo's desired width
    height: 50,    // Adjust to your logo's desired height
    position: 'absolute',
  },
});

export default App;
