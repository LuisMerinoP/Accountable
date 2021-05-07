import { ProyectType } from './../store/types/projectTypes';

type ProyectTypeKeys = Array<keyof typeof ProyectType | number>;
// type ProyectTypeKeys = (number | "time" | "hits" | "value" | "results")[]

export const useProjectTypes = () => {
 return (Object.keys(ProyectType) as ProyectTypeKeys)
 .filter((k): k is keyof typeof ProyectType => typeof ProyectType[k] === "number");
}
// const values: ("time" | "hits" | "value" | "results")[]

//const keys = values.map(k => ProyectType[k]);
// const keys: ProyectType[]
export const getProjectTypes = (Object.keys(ProyectType) as ProyectTypeKeys)
.filter((k): k is keyof typeof ProyectType => typeof ProyectType[k] === "number");
