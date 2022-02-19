export interface Encuesta{
    _id?:string;
    estado?:boolean;
    titulo?: string;
    opcionesVoto?: string[];
    inicio?: Date;
    fin?: Date;
    isAbierta?:Boolean;
    usuario?:string;
}
export interface Resultado{
    encuestas: Encuesta[];
}