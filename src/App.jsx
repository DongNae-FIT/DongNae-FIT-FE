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
import EditProfile from "@/pages/MyPages/EditProfile";

import SearchMain from "@/pages/SearchPages/SearchIMain";
import SearchResultAll from "@/pages/SearchPages/SearchResultAll";

function App() {
  const { t } = useTranslation();
  const location = useLocation();

  // 헤더를 제외할 경로를 설정
  const excludeHeaderPaths = [
    "/search",
    "/search/result/all",
    "/class/detail",
    "/gym/detail",
    "/community/post",
    "/auth",
    "/community/post",
    "/class/review/new",
    "/community/post/new",
    "/login",
    "/mypage/edit/profile",
  ];

  const backHeaderPaths = ["/class/detail", "/gym/detail", "/login"];

  const editorHeaderTexts = {
    "/class/review/new": t("class.review_write"),
    "/community/post/new": t("community.write"),
    "/mypage/edit/profile": t("mypage.edit_profile"),
  };

  const editorHeaderTitle = editorHeaderTexts[location.pathname] || "";

  return (
    <AuthProvider>
      <Helmet>
        <title>{t("title")}</title>
      </Helmet>
      {!excludeHeaderPaths.includes(location.pathname) && <DefaultHeader />}
      {backHeaderPaths.includes(location.pathname) && <BackHeader />}
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

        <Route path="/search" element={<SearchMain />} />
        <Route path="/search/result/all" element={<SearchResultAll />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
