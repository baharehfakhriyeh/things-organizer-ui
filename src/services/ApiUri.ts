export const ApiUri = {
    container: {
        getContainerList: "/thing/containers",
        getContainerPlan: "/thing/containers/parent-id",
        updateContainerLocation: "/thing/containers/location",
        getContainersInAreaStream: "/ws/thing/containers/area/location-stream",
        getContainersByParentId: "/thing/containers/parent-id",
    },
    thing: {
        getThingsByContainerId: "/thing/things/container-id"
    }
}