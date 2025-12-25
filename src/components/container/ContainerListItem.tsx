import type { Container } from "../../types/containerTypes";

type ContainerListItemProps = {
  container: Container;
};

const ContainerListItem = ({ container }: ContainerListItemProps) => {
  return (
    <div
      key={container.id}
      className="border p-4 rounded shadow hover:shadow-md"
    >
      <h3 className="font-semibold">{container.title}</h3>
      <p className="text-sm text-gray-600">{container.parent?.title ?? "-"}</p>
    </div>
  );
};

ContainerListItem.propTypes = {};

export default ContainerListItem;
