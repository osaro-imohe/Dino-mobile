import { makeVar } from "@apollo/client";

export const currentGroupVar = makeVar({
  id: 0,
  name: "",
  photoUrl: "",
  inviteCode: "",
  description: "",
  adminUserId: 0,
  numberOfMembers: 0,
});
