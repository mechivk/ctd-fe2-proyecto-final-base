import {
  BotonLectura,
  DescripcionTarjetaNoticia,
  FechaTarjetaNoticia,
  ImagenTarjetaNoticia,
  TarjetaNoticia,
  TituloTarjetaNoticia,
} from "./styled";
import { INoticiasNormalizadas } from "./types";

export interface PropsTipadas {
  noticia: INoticiasNormalizadas;
  setModal: (noticia: INoticiasNormalizadas) => void;
}

const TarjetaNoticiaComponent = ({ noticia, setModal }: PropsTipadas) => {
  return (
    <TarjetaNoticia>
      <ImagenTarjetaNoticia src={noticia.imagen} />
      <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
      <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
      <DescripcionTarjetaNoticia>
        {noticia.descripcionCorta}
      </DescripcionTarjetaNoticia>
      <BotonLectura onClick={() => setModal(noticia)}>Ver más</BotonLectura>
    </TarjetaNoticia>
  );
};

export default TarjetaNoticiaComponent;
