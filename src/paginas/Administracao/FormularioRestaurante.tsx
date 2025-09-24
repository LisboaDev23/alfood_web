import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const urlAdmin = "http://localhost:8000/api/v2/restaurantes/";
  //buscar todos os parametros da determinada rota
  const parametros = useParams();

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      axios
        .put(urlAdmin + `${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante atualizado com sucesso!");
          setNomeRestaurante("");
        })
        .catch((erro) => {
          alert("Erro ao cadastrar o restaurante!");
        });
    } else {
      axios
        .post(urlAdmin, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante cadastrado com sucesso!");
          setNomeRestaurante("");
        })
        .catch((erro) => {
          alert("Erro ao cadastrar o restaurante!");
        });
    }
  };

  useEffect(() => {
    if (parametros.id) {
      axios
        .get<IRestaurante>(urlAdmin + `${parametros.id}/`)
        .then((response) => {
          setNomeRestaurante(response.data.nome);
        })
        .catch((erro) => {
          console.log(erro);
          alert("Erro ao buscar o restaurante!");
        });
    }
  }, [parametros]);

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField
        value={nomeRestaurante}
        onChange={(e) => setNomeRestaurante(e.target.value)}
        label="Nome do Restaurante"
        variant="standard"
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
};

export default FormularioRestaurante;
