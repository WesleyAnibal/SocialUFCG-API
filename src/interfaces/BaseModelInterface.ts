import { ModelsInterface } from "./ModelsInterface";

export interface BaseModelInterface {

    prototype?; //serve pra criar métodos de instancia
    associate?(models: ModelsInterface): void; //serve pra conseguir associar um model com outro

}