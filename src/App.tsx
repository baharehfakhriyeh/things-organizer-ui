
import ContainerPlan from "./components/container/ContainerPlan";

const App = () => {
  return (
    <div className="min-h-screen">
      <h1 className="flex items-center justify-center h-14 bg-amber-400 font-bold">
        Container Land
      </h1>
      <ContainerPlan parentId={null} />
    </div>
  );
};

App.propTypes = {};

export default App;
