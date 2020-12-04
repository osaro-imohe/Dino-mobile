import { makeVar } from "@apollo/client";

type CurrentGroup = {
  id: number;
  name: string;
  photoUrl: string;
  inviteCode: string;
  description: string;
  adminUserId: number;
  numberOfMembers: number;
};

type CurrentPost = {
  id: number;
  firstName: string;
  lastName: string;
  message: string;
  numberOfLikes: number;
  numberOfComments: number;
  postImageUrl: string;
  profileImageUrl: string;
};

export const currentGroupVar = makeVar<CurrentGroup>({
  id: 0,
  name: "",
  photoUrl: "",
  inviteCode: "",
  description: "",
  adminUserId: 0,
  numberOfMembers: 0,
});

export const currentPostVar = makeVar<CurrentPost>({
  id: 0,
  firstName: "",
  lastName: "",
  message: "",
  numberOfLikes: 0,
  numberOfComments: 0,
  postImageUrl: "",
  profileImageUrl: "",
});
