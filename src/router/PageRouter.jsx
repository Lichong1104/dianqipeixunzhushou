import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PageLoading from "@/components/PageLoading/PageLoading";

const Home = lazy(() => import("../views/Home/Home"));

function PageRouter() {
  return (
    <Suspense fallback={<PageLoading height="100%" />}>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/" exact render={() => <Redirect to="/home" />} />
      </Switch>
    </Suspense>
  );
}

export default PageRouter;
