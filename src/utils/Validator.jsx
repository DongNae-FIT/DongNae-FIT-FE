export const validateNickname = (nickname) => {
  if (!nickname) {
    return "닉네임을 입력해주세요."; // 닉네임이 비어있을 경우 메시지 반환
  }

  // 정규식: 한글, 영문 혼합 가능, 길이 2~7
  const nicknameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z]{2,7}$/;
  if (!nicknameRegex.test(nickname)) {
    if (nickname.length < 2 || nickname.length > 7) {
      return "닉네임은 2~7글자이어야 합니다."; // 길이 검사
    }
    return "닉네임은 한글과 영문만 가능합니다."; // 형식 검사
  }

  return ""; // 유효성 통과
};
