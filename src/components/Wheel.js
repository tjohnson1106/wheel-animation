import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { GestureHandler, Svg } from "expo";
import * as d3Shape from "d3-shape";
import { snap } from "@popmotion/popcorn";
import { resolveNs } from "dns";

const { PanGestureHandler, State } = GestureHandler;
const { Path, G, Text, TSpan } = Svg;
const { width } = Dimensions.get("screen");

const numberOfSegments = 10;
const makeWheel = () => {
  const data = Array.from({
    length: numberOfSegments
  }).fill(1);
  const arcs = d3Shape.pie()(data);
  const colors = color({
    luminosity: "dark",
    count: numberOfSegments
  });

  return arcs.map((arc, index) => {
    const instance = d3Shape
      .arc()
      .padAngle(0.01)
      .outerRadius(width / 2)
      .innerRadius(20);

    return {
      path: instance(arc),
      color: colors[index],
      value: Math.round(Math.random())
    };
  });
};

class Wheel extends Component {
  state = {};
  render() {
    return (
      <View>
        <Text>Wheel Component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Wheel;
