import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const name = useInput("");
  const lastName = useInput("");
  const firstName = useInput("");
  const email = useInput("");
  const requestSecret = useMutation(LOG_IN, {
    update: (_, data) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        toast.error("계정이 없으신가요? 가입하기");
        setTimeout(() => {
          setAction("signUp");
        }, 3000);
      }
    },
    variables: { email: email.value }
  });

  const createAccount = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      name: name.value,
      lastName: lastName.value,
      firstName: firstName.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          await requestSecret();
        } catch (error) {
          toast.error("Can't request secret, try again!");
        }
      } else {
        toast.error("이메일을 입력해주세요");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        name.value !== "" &&
        lastName.value !== "" &&
        firstName.value !== ""
      ) {
        createAccount();
      } else {
        toast.error("모든 항목을 기입해주세요");
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      name={name}
      lastName={lastName}
      firstName={firstName}
      email={email}
      onSubmit={onSubmit}
    />
  );
};
