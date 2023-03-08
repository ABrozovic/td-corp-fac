import { Stack, Text } from '@mantine/core';
import { useQuery } from 'react-query';

import { fetchClientes } from './api/fetch-directorio';
import { fetchProductos } from './api/fetch-productos';
import Facturar from './components/fac-form';

function App() {
  const { data: clientes } = useQuery(['directorio'], fetchClientes);
  const { data: productos } = useQuery(['productos'], fetchProductos, {
    select(data) {
      return data.map((producto) => ({
        ...producto,
        artDescripcion: producto.artNombre,
      }));
    },
  });

  if (!productos || !clientes) return null;

  return (
    <Stack align="center">
      <Text size="xl" pt={'xl'} weight={500}>
        Generar Factura
      </Text>
      <Facturar clientes={clientes} productos={productos} />
    </Stack>
  );
}

export default App;
