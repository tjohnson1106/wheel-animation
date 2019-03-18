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

const wheelSize = width * 0.9;

const fontSize = 26;

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
      value: Math.round(Math.random() * 10 + 1) * 200,
      centroid: instance.centroid(arc)
    };
  });
};

class Wheel extends Component {
  _wheelPaths = makeWheel();

  render() {
    return <View style={styles.root}>{this._renderSvgWheel()}</View>;
  }

  _renderSvgWheel = () => {
    return (
      <View style={styles.root}>
        <Svg
          width={wheelSize}
          height={wheelSize}
          viewBox={`0 0 ${width} ${width}`}
        >
          <G y={width / 2} x={width / 2}>
            {this._wheelPaths.map((arc, i) => {
              const [x, y] = arc.centroid;

              const number = arc.value.toString();

              return (
                <G key={`arc-${i}`}>
                  <Path d={arc.path} fill={arc.color} />

                  <Text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor="middle"
                    fontSize={fontSize}
                  >
                    {Array.from({
                      length: number.length
                    }).map((_, j) => {
                      return (
                        <TSpan x={x} dy={26} key={`arc-${i}-slice-${j}`}>
                          {number.charAt(j)}
                        </TSpan>
                      );
                    })}
                  </Text>
                </G>
              );
            })}
          </G>
        </Svg>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Wheel;
