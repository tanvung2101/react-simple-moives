import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layout/Main";
// import HomePage from "./page/HomePage";
import Banner from "./components/banner/Banner";
// import MoviePage from "./page/MoviePage";
// import MovieDetailsPage from './page/MovieDetailsPage';

const HomePage = lazy(() => import("./page/HomePage"));
const MoviePageV2 = lazy(() => import("./page/MoviePageV2"));
const MovieDetailsPage = lazy(() => import("./page/MovieDetailsPage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePageV2></MoviePageV2>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailsPage></MovieDetailsPage>}
            ></Route>
            <Route path="*" element={<>Not Found</>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
