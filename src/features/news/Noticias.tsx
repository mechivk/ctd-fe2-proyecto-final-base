import { useEffect, useState } from "react";
import { SuscribeImage } from "../../assets";
import { DESCRIPCION_MODAL_PREMIUM, TITULO_MODAL_PREMIUM } from "./constants";
import { obtenerNoticias } from "./fakeRest";
import Modal from "./Modal";
import TarjetaNoticiaComponent from "./TarjetaNoticiaComponent";
import {
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
  BotonSuscribir,
} from "./styled";
import { minTranscurridos, tituloEnMayuscula } from "./utils";

export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

function Noticias() {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const data = respuesta.map((n) => ({
        id: n.id,
        titulo: tituloEnMayuscula(n),
        descripcion: n.descripcion,
        fecha: `Hace ${minTranscurridos(n)} minutos`,
        esPremium: n.esPremium,
        imagen: n.imagen,
        descripcionCorta: n.descripcion.substring(0, 100),
      }));
      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((noticia: INoticiasNormalizadas) => (
          <TarjetaNoticiaComponent noticia={noticia} setModal={setModal} />
        ))}
        {modal && (
          <Modal
            imagen={modal.esPremium ? SuscribeImage : modal.imagen}
            titulo={modal.esPremium ? TITULO_MODAL_PREMIUM : modal.titulo}
            descripcion={
              modal.esPremium ? DESCRIPCION_MODAL_PREMIUM : modal.descripcion
            }
            altImagen="mr-burns-excelent"
            setModal={setModal}
          >
            {modal.esPremium && (
              <BotonSuscribir
                onClick={() =>
                  setTimeout(() => {
                    alert("Suscripto!");
                    setModal(null);
                  }, 1000)
                }
              >
                Suscríbete
              </BotonSuscribir>
            )}
          </Modal>
        )}
      </ListaNoticias>
    </ContenedorNoticias>
  );
}

export default Noticias;
