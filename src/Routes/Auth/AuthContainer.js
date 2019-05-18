import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");

  const name = useInput("");
  const lastName = useInput("");
  const firstName = useInput("");
  const secret = useInput("");
  const email = useInput("");
  const requestSecretMutatin = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      name: name.value,
      lastName: lastName.value,
      firstName: firstName.value
    }
  });

  const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  });

  const localLogInMutation = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutatin();
          if (!requestSecret) {
            toast.error("계정이 없으신가요? 가입하기");
            setTimeout(() => {
              setAction("signUp");
            }, 3000);
          } else {
            toast.success("가입시 기재된 이메일을 확인해주세요");
            setAction("confirm");
          }
        } catch (error) {
          toast.error("비밀코드를 얻을 수 없습니다. 다시 시도해 주세요");
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
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("계정을 생성할 수 없습니다");
          } else {
            toast.success("계정 생성에 성공했습니다. 로그인해주세요 ");
            setTimeout(() => setAction("로그인"), 3000);
          }
        } catch (e) {
          toast.error(
            console.log(e.message),
            "계정을 생성할 수 없습니다. 다시 시도해주세요"
          );
        }
      } else {
        toast.error("모든 항목을 기입해주세요");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation();
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch {
          toast.error("비밀코드를 잘못 입력했습니다. 다시 시도해주세요");
        }
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
      secret={secret}
      email={email}
      onSubmit={onSubmit}
    />
  );
};
