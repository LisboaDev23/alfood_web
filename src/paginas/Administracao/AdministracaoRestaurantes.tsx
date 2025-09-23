import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const AdministracaoRestaurantes = () => {
  const urlAdmin = "http://localhost:8000/api/v2/restaurantes/";
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    axios.get<IRestaurante[]>(urlAdmin).then((response) => {
      setRestaurantes(response.data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoRestaurantes;
