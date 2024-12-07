export const validateNickname = (nickname, t) => {
  if (!nickname) {
    return t("nickname_message.empty_error"); // 닉네임이 비어있을 경우 메시지 반환
  }

  // 정규식: 한글, 영문 혼합 가능, 길이 2~7
  const nicknameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z]{2,7}$/;
  if (!nicknameRegex.test(nickname)) {
    if (nickname.length < 2 || nickname.length > 7) {
      return t("nickname_message.length_error"); // 길이 검사
    }
    return t("nickname_message.type_error"); // 형식 검사
  }

  return ""; // 유효성 통과
};
