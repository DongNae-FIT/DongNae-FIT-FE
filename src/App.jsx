import "./App.css";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

import { AuthProvider } from "@/contexts/AuthContext";
import { MyPageProvider } from "@/contexts/MyPageContext";
import { ProgramProvider } from "@/contexts/ProgramContext";
import { CommunityProvider } from "@/contexts/CommunityContext";

import DefaultHeader from "@/layouts/Header/DefaultHeader";
import BackHeader from "@/layouts/Header/BackHeader";
import EditorHeader from "@/layouts/Header/EditorHeader";

import Home from "@/pages/Home";
import Login from "@/pages/LoginPages/Login";
import KakaoRedirect from "@/pages/LoginPages/KakaoRedirect";
import AdditionalInfo from "@/pages/LoginPages/AdditionalInfo";

import ProgramMain from "@/pages/ProgramPages/ProgramMain";
import ProgramDetail from "@/pages/ProgramPages/ProgramDetail";
import NewReview from "@/pages/ProgramPages/NewReview";

import FacilityMain from "@/pages/FacilityPages/FacilityMain";
import FacilityDetail from "@/pages/FacilityPages/FacilityDetail";

import CommunityMain from "@/pages/CommunityPages/CommunityMain";
import CommunityPost from "@/pages/CommunityPages/CommunityPost";
import NewPost from "@/pages/CommunityPages/NewPost";

import MyPageMain from "@/pages/MyPages/MyPageMain";

import EditProfile from "@/pages/MyPages/User/EditProfile";
import SetLocation from "@/pages/MyPages/User/SetLocation";
import DeletedAccount from "@/pages/MyPages/User/DeletedAccount";

import SavedProgram from "@/pages/MyPages/Program/SavedProgram";
import ReviewedProgram from "@/pages/MyPages/Program/ReviewedProgram";

import MyPost from "@/pages/MyPages/Community/MyPost";
import CommentedPost from "@/pages/MyPages/Community/CommentedPost";
import SavedPost from "@/pages/MyPages/Community/SavedPost";

import SearchMain from "@/pages/SearchPages/SearchIMain";
import SearchResultAll from "@/pages/SearchPages/SearchResultAll";

function App() {
  const { t } = useTranslation();
  const location = useLocation();

  const headerConfig = {
    default: ["/", "/program", "/facility", "/community", "/mypage"],
    back: [
      "/program/:programId",
      "/facility/:facilityId",
      "/login",
      "/community/post/:postId",
      "/mypage/program/save",
      "/mypage/program/review",
      "/mypage/community/post",
      "/mypage/community/comment",
      "/mypage/community/save",
      "/delete/account",
    ],
    // editor: {
    //   "/program/new/review": t("program.review_write"),
    //   "/community/new/post": t("community.write"),
    //   "/mypage/edit/profile": t("mypage.edit_profile"),
    //   "/mypage/set/location": t("mypage.set_location"),
    // },
  };

  const isPathMatched = (pathList, currentPath) =>
    pathList.some((path) => matchPath(path, currentPath));

  // const editorHeaderTitle = headerConfig.editor[location.pathname] || "";
  return (
    <AuthProvider>
      <MyPageProvider>
        <ProgramProvider>
          <CommunityProvider>
            <Helmet>
              <title>{t("title")}</title>
            </Helmet>
            {isPathMatched(headerConfig.default, location.pathname) && (
              <DefaultHeader />
            )}
            {isPathMatched(headerConfig.back, location.pathname) && (
              <BackHeader />
            )}
            {/* {editorHeaderTitle && <EditorHeader title={editorHeaderTitle} />} */}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth" element={<KakaoRedirect />} />
              <Route path="/login/info" element={<AdditionalInfo />} />

              <Route path="/program" element={<ProgramMain />} />
              <Route path="/program/:programId" element={<ProgramDetail />} />
              <Route path="/program/new/review" element={<NewReview />} />

              <Route path="/facility" element={<FacilityMain />} />
              <Route
                path="/facility/:facilityId"
                element={<FacilityDetail />}
              />

              <Route path="/community" element={<CommunityMain />} />
              <Route
                path="/community/post/:postId"
                element={<CommunityPost />}
              />
              <Route path="/community/new/post" element={<NewPost />} />

              <Route path="/mypage" element={<MyPageMain />} />
              <Route path="/mypage/edit/profile" element={<EditProfile />} />
              <Route path="/mypage/set/location" element={<SetLocation />} />

              <Route path="/mypage/program/save" element={<SavedProgram />} />
              <Route
                path="/mypage/program/review"
                element={<ReviewedProgram />}
              />

              <Route path="/mypage/community/post" element={<MyPost />} />
              <Route
                path="/mypage/community/comment"
                element={<CommentedPost />}
              />
              <Route path="/mypage/community/save" element={<SavedPost />} />

              <Route path="/delete/account" element={<DeletedAccount />} />

              <Route path="/search" element={<SearchMain />} />
              <Route path="/search/result/all" element={<SearchResultAll />} />

              <Route path="*" />
            </Routes>
          </CommunityProvider>
        </ProgramProvider>
      </MyPageProvider>
    </AuthProvider>
  );
}

export default App;
