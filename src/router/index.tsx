import { lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ParallaxContainer from "../components/ParallaxContainer";
import routes from "./config";
import { Styles } from "../styles/styles";

const Router = () => {
  const location = useLocation();
  // Only show ParallaxContainer for "/" or "/home"
  const showParallax = location.pathname === "/" || location.pathname === "/home";

  return (
    <Suspense fallback={null}>
      <Styles />
      {showParallax && <ParallaxContainer />}
      {showParallax && <Header className="home"/>}
      {!showParallax && <Header className="sub"/>}
      <Switch>
        {routes.map((routeItem) => {
          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              exact={routeItem.exact}
              component={lazy(() => import(`../pages/${routeItem.component}`))}
            />
          );
        })}
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default Router;
