export type Container = {
    id: number
    title: string
    parent: Container
}

export type GetContainerPlanRequestType = {
    id: number | null;
}
