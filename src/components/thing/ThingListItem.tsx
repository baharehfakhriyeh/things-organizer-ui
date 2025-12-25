import type { Thing } from "../../types/thingTypes"
import "./../../app.css";
import "./Thing.css"

type ThingListItemProps = {
    thing: Thing
}

const ThingListItem = ({thing}: ThingListItemProps) => {
  return (
    <div key={thing.id} className="card thing-card">
        <p className="font-semibold">{thing.title}</p>
        <p className="text-gray-700">{thing.weight}</p>
      
    </div>
  )
}

export default ThingListItem
