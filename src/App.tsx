
import ViewContainersOnMap from "./components/container/ViewContainersOnMap";
import ContainerPlan from "./components/container/ContainerPlan";
import "leaflet/dist/leaflet.css";
import "./app.css";
import ViewMap from "./components/container/ViewMap";

const App = () => {
  return (
     <div>
    <div className="min-h-screen">
      <h1 className="flex items-center justify-center h-14 bg-amber-400 font-bold">
        Container Land
      </h1>
      <ViewMap />
    </div>
   
      
      </div>
  );
};

App.propTypes = {};

export default App;
