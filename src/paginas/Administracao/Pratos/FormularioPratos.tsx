import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpAdmin } from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPratos = () => {
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [tag, setTag] = useState("");

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState("");

  const [imagem, setImagem] = useState<File | null>(null);

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  useEffect(() => {
    httpAdmin.get<{ tags: ITag[] }>("tags/").then((response) => {
      setTags(response.data.tags);
    });

    httpAdmin.get<IRestaurante[]>("restaurantes/").then((response) => {
      setRestaurantes(response.data);
    });
  }, []);

  //buscar todos os parametros da determinada rota
  const parametros = useParams();

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();
    formData.append("nome", nomePrato);
    formData.append("descricao", descricao);
    formData.append("tag", tag);
    formData.append("restaurante", restaurante);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    httpAdmin
      .request({
        url: "pratos/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => {
        setDescricao("");
        setNomePrato("");
        setTag("");
        setRestaurante("");
        setImagem(null);
        alert("Prato cadastrado com sucesso!");
      })
      .catch((erro) => {
        console.log(erro);
        alert("Erro ao cadastrar o prato!");
      });
  };

  useEffect(() => {
    if (parametros.id) {
      httpAdmin
        .get<IPrato>(`pratos/${parametros.id}/`)
        .then((response) => {
          setNomePrato(response.data.nome);
        })
        .catch((erro) => {
          console.log(erro);
          alert("Erro ao buscar o restaurante!");
        });
    }
  }, [parametros]);

  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Typography component="h1" variant="h6">
                Formulario de Pratos
              </Typography>
              <Box
                component={"form"}
                sx={{ width: "100%" }}
                onSubmit={aoSubmeterForm}
              >
                <TextField
                  value={nomePrato}
                  onChange={(e) => setNomePrato(e.target.value)}
                  label="Nome do Prato"
                  variant="standard"
                  fullWidth
                  required
                  margin="dense"
                />
                <TextField
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  label="Descrição"
                  variant="standard"
                  fullWidth
                  required
                  margin="dense"
                />

                <FormControl margin="dense" fullWidth>
                  <InputLabel id="select-tag">Tag</InputLabel>
                  <Select
                    labelId="select-tag"
                    value={tag}
                    onChange={(event) => setTag(event.target.value)}
                  >
                    {tags.map((tag) => (
                      <MenuItem key={tag.id} value={tag.value}>
                        {tag.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl margin="dense" fullWidth>
                  <InputLabel id="select-restaurante">Restaurante</InputLabel>
                  <Select
                    labelId="select-restaurante"
                    value={restaurante}
                    onChange={(event) => setRestaurante(event.target.value)}
                  >
                    {restaurantes.map((restaurante) => (
                      <MenuItem key={restaurante.id} value={restaurante.id}>
                        {restaurante.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <input
                  type="file"
                  onChange={(event) => selecionarArquivo(event)}
                />

                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined">
                  Salvar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default FormularioPratos;
