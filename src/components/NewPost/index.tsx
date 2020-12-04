import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  Alert,
} from "react-native";
import getStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import { Image } from "react-native";
import { colors } from "../../utils";
import { Context } from "../../context";
import { NewPostError } from "../Errors/index";
import { useMutation, useReactiveVar } from "@apollo/client";
import { CreatePost } from "../../graphql/mutations/Posts";
import { currentGroupVar } from "../../graphql/reactivevariables";
import Icon from "../../assets/icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Loader from "react-native-three-dots-loader";

type Props = {
  showModal: boolean;
  setShowModal: any;
  setData: any;
  data: any;
};

type imageProps = any | null;

const NewPost = ({ showModal, setShowModal, data, setData }: Props) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  const { state, setState } = useContext(Context);

  const [post, setPost] = useState("");

  const [uploadingImage, setUploadingImage] = useState(false);

  const [image, setImage] = useState<imageProps>(null);

  const [uploadImage, setUploadImage] = useState({
    error: false,
    error_message: "",
  });

  useEffect(() => {
    console.log(state);
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
    return () => {
      setImage(null);
      setPost("");
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const clearImage = () => {
    setImage(null);
  };
  const [
    createPost,
    {
      loading: createPostLoading,
      error: createPostError,
      data: createPostData,
    },
  ] = useMutation(CreatePost, {
    onError: (error) => {
      console.log(`error: ${error.message}`);
    },
    onCompleted: () => {
      setPost("");
      setShowModal(!showModal);
    },
  });

  const currentGroup = useReactiveVar(currentGroupVar);

  const cloudinaryUpload = async (photo: any) => {
    const data = {
      file: `data:image/jpg;base64,${image.base64}`,
      upload_preset: "school_app",
      cloud_name: "dcdaexqwu",
    };
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dcdaexqwu/upload",
        data
      );
      return res.data.secure_url;
    } catch (error) {
      throw new Error(error);
    }
  };

  const submitPost = async () => {
    if (image) {
      try {
        setUploadImage({
          error: false,
          error_message: "",
        });
        setUploadingImage(true);
        const url = await cloudinaryUpload(image);
        setUploadingImage(false);
        const newPost = await createPost({
          variables: {
            message: post,
            user_id: parseInt(state.userId),
            group_id: currentGroup.id,
            image_url: url,
          },
        });
        console.log(newPost);
        setData([newPost.data.CreatePost.posts, ...data]);
      } catch (error) {
        setUploadImage({
          error: true,
          error_message: error.message,
        });
        setUploadingImage(false);
      }
    } else {
      setUploadImage({
        error: false,
        error_message: "",
      });
      const newPost = await createPost({
        variables: {
          message: post,
          user_id: parseInt(state.userId),
          group_id: currentGroup.id,
          image_url: "",
        },
      });
      console.log(newPost);
      setData([newPost.data.CreatePost.posts, ...data]);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.newPostContainer}>
        <View style={styles.newPostContainerInner}>
          <View style={styles.align}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(!showModal);
              }}
            >
              <Text style={styles.newPostCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                post.length > 0 && !createPostLoading && !uploadingImage
                  ? styles.newPostSend
                  : styles.newPostSendDisabled
              }
              disabled={
                post.length > 0 && !createPostLoading && !uploadingImage
                  ? false
                  : true
              }
              onPress={submitPost}
            >
              {createPostLoading || uploadingImage ? (
                <Loader />
              ) : (
                <Text style={styles.newPostSendText}>Send</Text>
              )}
            </TouchableOpacity>
          </View>
          {createPostError ? (
            <NewPostError errorMessage="Couldn't upload post, try again :)" />
          ) : null}
          {uploadImage.error ? (
            <NewPostError errorMessage="Couldn't upload image, try again :)" />
          ) : null}
          <View style={styles.newPostAlign}>
            {state.profilePictureUrl === "" ||
            state.profilePictureUrl === null ? (
              <View style={styles.noPostProfileImage}>
                <Icon name="user" color={colors.dork} />
              </View>
            ) : (
              <Image
                source={{ uri: "hello" }}
                style={styles.newPostUserImage}
              />
            )}
            <TextInput
              value={post}
              multiline={true}
              style={styles.newPostInput}
              selectionColor={colors.cherry}
              placeholder="What's going on?"
              placeholderTextColor={colors.dork}
              onChangeText={(text) => setPost(text)}
            />
          </View>
          <TouchableOpacity
            style={
              !image
                ? styles.imageIconContainer
                : styles.imageIconContainerSuccess
            }
            onPress={() => (!image ? pickImage() : clearImage())}
          >
            {!image ? (
              <Icon
                name="camera"
                style={styles.imageIcon}
                color={colorScheme === "light" ? colors.grok : colors.lightGray}
              />
            ) : (
              <Icon name="clear" style={styles.imageIcon} color={colors.dork} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NewPost;
