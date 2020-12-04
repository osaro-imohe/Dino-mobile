import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import { useColorScheme } from "react-native-appearance";
import { Context } from "../../context";
import { View, Text, TouchableOpacity } from "react-native";
import getStyles from "./styles";
import { useLazyQuery } from "@apollo/client";
import { GetGroups } from "../../graphql/queries/Groups";
import { colors } from "../../utils";

type Props = {
  errorMessage: string;
};

export const AuthError = ({ errorMessage }: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return (
    <View style={styles.authErrorContainer}>
      <Text style={styles.authErrorMessage}>{errorMessage}</Text>
    </View>
  );
};

export const GroupError = ({ errorMessage }: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const { state, setState } = useContext(Context);
  const [getGroups, { data, loading, error }] = useLazyQuery(GetGroups);
  return (
    <TouchableOpacity
      onPress={() =>
        getGroups({
          variables: {
            user_id: parseInt(state.userId),
          },
        })
      }
    >
      <View style={styles.authErrorContainer}>
        <Text style={styles.authErrorMessage}>{errorMessage}</Text>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={colorScheme === "light" ? colors.black : colors.white}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export const NewGroupError = ({ errorMessage }: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return <Text style={styles.joinErrorMessage}>{errorMessage}</Text>;
};

export const NewPostError = ({ errorMessage }: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return (
    <View style={styles.newPostErrorContainer}>
      <Text style={styles.newPostErrorMessage}>{errorMessage}</Text>
    </View>
  );
};

export const GetPostsError = ({ errorMessage }: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return (
    <View style={styles.newPostErrorContainer}>
      <Text style={styles.newPostErrorMessage}>{errorMessage}</Text>
    </View>
  );
};

export const LoadCommentsError = ({ errorMessage }: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  return (
    <>
      <Text style={styles.loadCommentsErrorMessage}>{errorMessage} :(</Text>
      <Text style={styles.loadCommentsErrorMessageSub}>Try again</Text>
    </>
  );
};
