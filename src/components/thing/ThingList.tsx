import { useEffect, useState } from "react";
import { useAuth } from "../security/AuthContext";
import type { Thing } from "../../types/thingTypes";
import { ThingService } from "../../services/thingService";
import ThingListItem from "./ThingListItem";
import "./../../app.css";
import "./Thing.css"

type ThingListPorps = {
  containerId: number;
};
const ThingList = ({ containerId }: ThingListPorps) => {
  const { keycloak } = useAuth();
  const [things, setThings] = useState<Thing[]>([]);

  useEffect(() => {
    const loadThings = async () => {
      setThings(await ThingService.getThingsByContainerId(containerId, keycloak));
    };
    loadThings();
  }, []);

  const existThing = () => things.length > 0;

  return (
    <div className="component-flex-list">
      {existThing() && things.map((thing) => <ThingListItem thing={thing} />)}
    </div>
  );
};

export default ThingList;
