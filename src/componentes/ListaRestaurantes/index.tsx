import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");

  const verMais = () => {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then((response) => {
        console.log(response.data.results);
        setRestaurantes([...restaurantes, ...response.data.results]);
        setProximaPagina(response.data.next);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const urlRestaurantes = "http://localhost:8000/api/v1/restaurantes/";

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(urlRestaurantes)
      .then((response) => {
        setRestaurantes(response.data.results);
        setProximaPagina(response.data.next);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Requisição feita!");
      });
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {proximaPagina && <button onClick={verMais}>Ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
