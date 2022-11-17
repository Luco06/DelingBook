import React, { useState } from "react";
import Step1 from "../StepPresentation/Step1";
import Step2 from "../StepPresentation/Step2";
import Step3 from "../StepPresentation/Step3";
import Step4 from "../StepPresentation/Step4";
import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Presentations() {
  return (
    <LinearGradient colors={["#287DC0", "#13A484"]} style={styles.container}>
      <Step1 />
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
