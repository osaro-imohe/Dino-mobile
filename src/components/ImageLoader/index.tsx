import React from "react";
import { Image, View } from "react-native";
import Icon from "../../assets/icons";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { colors, getHeight } from "../../utils";

type Props = {
  width: string;
  height: number;
  borderRadius?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  marginTop?: number;
  colorScheme: string;
};

const ImageLoader = ({
  width,
  height,
  marginTop,
  marginLeft,
  marginRight,
  colorScheme,
  borderRadius,
  marginBottom,
}: Props) => {
  return (
    <View
      style={{
        width,
        height,
        marginLeft: marginLeft ? marginLeft : 0,
        marginRight: marginRight ? marginRight : 0,
        marginBottom: marginBottom ? marginBottom : 0,
        marginTop: marginTop ? marginTop : 0,
        padding: 0,
        position: "absolute",
        justifyContent: "center",
      }}
    >
      <View style={{ position: "absolute", zIndex: 2, alignSelf: "center" }}>
        <Icon
          name="image"
          color={colorScheme === "light" ? colors.white : colors.black}
        />
      </View>
      <SkeletonPlaceholder
        backgroundColor={
          colorScheme === "light" ? colors.whitesmoke : colors.shadeGray
        }
        highlightColor={
          colorScheme === "light" ? colors.silver : colors.darkGray
        }
      >
        <SkeletonPlaceholder.Item
          width="100%"
          height={height}
          borderRadius={borderRadius ? borderRadius : 0}
        />
      </SkeletonPlaceholder>
    </View>
  );
};

export default ImageLoader;
