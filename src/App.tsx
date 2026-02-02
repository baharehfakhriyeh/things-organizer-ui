import ViewContainersOnOutdoorMap from "./components/container/ViewContainersOnOutdoorMap";
import ContainerBoard from "./components/container/ContainerBoard";
import "leaflet/dist/leaflet.css";
import "./app.css";
import ViewOutdoorMap from "./components/container/ViewOutdoorMap";
import MainMap from "./pages/MainMap";

const App = () => {
  return (
    <div>
      <div className="min-h-screen">
        <h1 className="flex items-center justify-center h-14 bg-amber-400 font-bold">
          Container Land
        </h1>
        <MainMap />
      </div>
    </div>
  );
};

App.propTypes = {};

export default App;
