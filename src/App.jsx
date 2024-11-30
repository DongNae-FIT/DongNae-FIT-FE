import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

import { AuthProvider } from "@/contexts/AuthContext";

import DefaultHeader from "@/layouts/Header/DefaultHeader";
import BackHeader from "@/layouts/Header/BackHeader";
import EditorHeader from "@/layouts/Header/EditorHeader";

import Home from "@/pages/Home";
import Login from "@/pages/LoginPages/Login";
import KakaoRedirect from "@/pages/LoginPages/KakaoRedirect";
import AdditionalInfo from "@/pages/LoginPages/AdditionalInfo";

import ClassMain from "@/pages/ClassPages/ClassMain";
import ClassDetail from "@/pages/ClassPages/ClassDetail";
import NewReview from "@/pages/ClassPages/NewReview";

import GymMain from "@/pages/GymPages/GymMain";
import GymDetail from "@/pages/GymPages/GymDetail";

import CommunityMain from "@/pages/CommunityPages/CommunityMain";
import CommunityPost from "@/pages/CommunityPages/CommunityPost";
import NewPost from "@/pages/CommunityPages/NewPost";

import MyPageMain from "@/pages/MyPages/MyPageMain";

import EditProfile from "@/pages/MyPages/User/EditProfile";
import SetLocation from "@/pages/MyPages/User/SetLocation";
import DeletedAccount from "@/pages/MyPages/User/DeletedAccount";

import SavedClass from "@/pages/MyPages/Class/SavedClass";
import ReviewedClass from "@/pages/MyPages/Class/ReviewedClass";

import MyPost from "@/pages/MyPages/Community/MyPost";
import CommentedPost from "@/pages/MyPages/Community/CommentedPost";
import SavedPost from "@/pages/MyPages/Community/SavedPost";

import SearchMain from "@/pages/SearchPages/SearchIMain";
import SearchResultAll from "@/pages/SearchPages/SearchResultAll";

function App() {
  const { t } = useTranslation();
  const location = useLocation();

  // 경로별 헤더 관리
  const headerConfig = {
    default: ["/", "/class", "/gym", "/community", "/mypage", "/search"],
    back: [
      "/class/detail",
      "/gym/detail",
      "/login",
      "/community/post",
      "/mypage/class/save",
      "/mypage/class/review",
      "/mypage/community/post",
      "/mypage/community/comment",
      "/mypage/community/save",
      "/delete/account",
    ],
    editor: {
      "/class/review/new": t("class.review_write"),
      "/community/post/new": t("community.write"),
      "/mypage/edit/profile": t("mypage.edit_profile"),
      "/mypage/set/location": t("mypage.set_location"),
    },
  };

  const editorHeaderTitle = headerConfig.editor[location.pathname] || "";

  return (
    <AuthProvider>
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      {headerConfig.default.includes(location.pathname) && <DefaultHeader />}
      {headerConfig.back.includes(location.pathname) && <BackHeader />}
      {editorHeaderTitle && <EditorHeader title={editorHeaderTitle} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<KakaoRedirect />} />
        <Route path="/login/info" element={<AdditionalInfo />} />

        <Route path="/class" element={<ClassMain />} />
        <Route path="/class/detail" element={<ClassDetail />} />
        <Route path="/class/review/new" element={<NewReview />} />

        <Route path="/gym" element={<GymMain />} />
        <Route path="/gym/detail" element={<GymDetail />} />

        <Route path="/community" element={<CommunityMain />} />
        <Route path="/community/post" element={<CommunityPost />} />
        <Route path="/community/post/new" element={<NewPost />} />

        <Route path="/mypage" element={<MyPageMain />} />
        <Route path="/mypage/edit/profile" element={<EditProfile />} />
        <Route path="/mypage/set/location" element={<SetLocation />} />

        <Route path="/mypage/class/save" element={<SavedClass />} />
        <Route path="/mypage/class/review" element={<ReviewedClass />} />

        <Route path="/mypage/community/post" element={<MyPost />} />
        <Route path="/mypage/community/comment" element={<CommentedPost />} />
        <Route path="/mypage/community/save" element={<SavedPost />} />

        <Route path="/delete/account" element={<DeletedAccount />} />

        <Route path="/search" element={<SearchMain />} />
        <Route path="/search/result/all" element={<SearchResultAll />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
