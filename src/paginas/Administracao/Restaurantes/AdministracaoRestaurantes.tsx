import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { httpAdmin } from "../../../http";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const excluirRestaurante = (id: number) => {
    if (window.confirm("Deseja realmente excluir este restaurante?")) {
      httpAdmin
        .delete(`restaurantes/${id}/`)
        .then(() => {
          const listaRestaurantes = restaurantes.filter(
            (restaurante) => restaurante.id !== id
          );
          setRestaurantes([...listaRestaurantes]);
          alert("Restaurante excluído com sucesso!");
        })
        .catch((erro) => {
          console.log(erro);
          alert("Erro ao excluir o restaurante!");
        });
    }
  };

  useEffect(() => {
    httpAdmin.get<IRestaurante[]>("restaurantes/").then((response) => {
      setRestaurantes(response.data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [
                <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>
                ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluirRestaurante(restaurante.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoRestaurantes;
