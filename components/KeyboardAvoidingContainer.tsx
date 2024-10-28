// import {
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StatusBar,
//   View,
//   SafeAreaView,
// } from "react-native";
// import React from "react";

// const KeyboardAvoidingContainer = ({ children, style, backgroundColor }) => {
//   return (
//     <SafeAreaView
//       style={{ flex: 1}}
//     >
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={[styles.contentContainer, style]}
//         >
//           {children}
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default KeyboardAvoidingContainer;

// const styles = StyleSheet.create({
//   contentContainer: {
//     padding: 20,
//   },
// });
