export const ApiUri = {
    container: {
        getContainerList: "/thing/containers",
        updateContainerLocation: "/thing/containers/location",
        getContainersInAreaStream: "/ws/thing/containers/area/location-stream",
        getContainersLocationByParentId: "/ws/thing/containers/parent-id/location-stream",
        getContainersByParentId: "/thing/containers/parent-id",
    },
    thing: {
        getThingsByContainerId: "/thing/things/container-id"
    }
}