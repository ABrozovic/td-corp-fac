import {
  Button,
  Center,
  Flex,
  Modal,
  NumberInput,
  Select,
  Stack,
  Table,
  Text,
  Textarea,
} from '@mantine/core';
import { useMemo, useRef, useState } from 'react';

import { postFacturar } from '../api/post-facturar';
import { Directorio } from '../types/directorio';
import { Producto, SelectedProduct } from '../types/producto';
import { isImpuestosResponse } from '../utils/type-helpers';
import { useFuse } from './hooks/use-fuse';

const fuseDir = {
  keys: ['dirNombre', 'dirRazonSocial'],
  includeMatches: true,
  threshold: 0.1,
};
const fuseProd = {
  keys: ['artNombre'],
  includeMatches: true,
  threshold: 0.1,
};
const Facturar = ({
  clientes,
  productos,
}: {
  clientes: Directorio[];
  productos: Producto[];
}) => {
  const { hits: dirHits, onSearch: dirOnSearch } = useFuse(
    clientes,
    false,
    { limit: -1 },
    fuseDir,
  );
  const { hits: prodHits, onSearch: prodOnSearch } = useFuse(
    productos,
    false,
    { limit: -1 },
    fuseProd,
  );

  const clientesSelect = useMemo(() => {
    if (dirHits.length === 0) return [{ value: 'empty', label: 'Introduce algun texto' }];
    const data = dirHits.map((hit) => ({
      value: hit.item.dirId || crypto.randomUUID(),
      label: hit.item.dirNombre || crypto.randomUUID(),
    }));
    return data;
  }, [dirHits]);

  const productosSelect = useMemo(() => {
    if (prodHits.length === 0)
      return [{ value: 'empty', label: 'Introduce algun texto' }];
    const data = prodHits.map((hit) => ({
      value: hit.item.artId || crypto.randomUUID(),
      label: hit.item.artNombre || crypto.randomUUID(),
    }));
    return data;
  }, [prodHits]);

  const [currentClient, setCurrentClient] = useState<Directorio>();
  const [tableProducts, setTableProducts] = useState<SelectedProduct[]>([]);
  const [currentProduct, setCurrentProduct] = useState<SelectedProduct>();
  const [cantProduct, setCantProduct] = useState<number | undefined>();
  const [precioUnitario, setPrecioUnitario] = useState<number | undefined>();
  const descRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState('');
  const [impuestosResponse, setImpuestosResponse] = useState('');

  const prodRef = useRef<HTMLInputElement>(null);

  const handleSelectClient = (value: string) => {
    if (!value) return;
    const client = clientes.find((cli) => cli.dirId === value);
    if (!client) {
      setCurrentClient(undefined);
      return;
    }
    setCurrentClient(client);
  };
  const handleSelectProduct = (value: string) => {
    const prod = (productos as Producto[]).find((prod) => prod.artId === value);
    if (!prod) {
      setCurrentProduct(undefined);
      return;
    }

    setCurrentProduct((prev) =>
      prev
        ? { ...prev, producto: { ...prod } }
        : {
            producto: { ...prod },
          },
    );
  };
  const handleCantChange = (value: number) => {
    if (value === undefined) value = 0;
    setCantProduct(value);
    setCurrentProduct((prev) =>
      prev ? { ...prev, cantidad: value.toString() } : { cantidad: value.toString() },
    );
  };
  const handlePrecioChange = (value: number) => {
    if (value === undefined) value = 0;
    setPrecioUnitario(value);
    setCurrentProduct((prev) =>
      prev
        ? { ...prev, precioUnitario: value.toString() }
        : { precioUnitario: value.toString() },
    );
  };
  const handleAddProduct = () => {
    if (!currentProduct || !currentProduct.producto || !currentProduct.cantidad) {
      setError('Revisa los datos de producto.');
      return;
    }

    if (!currentProduct.precioUnitario) {
      setCurrentProduct((prev) =>
        prev
          ? {
              ...prev,
              precioUnitario: (prev.producto?.artPrecio as number).toString(),
            }
          : { precioUnitario: '0' },
      );
    }
    const productData = {
      ...currentProduct,
      precioUnitario:
        precioUnitario?.toString() ??
        (currentProduct.producto?.artPrecio as number).toString(),
    };
    setTableProducts((prev) => {
      return prev
        ? [
            ...prev,
            {
              ...productData,
            },
          ]
        : [
            {
              ...productData,
            },
          ];
    });
    setCurrentProduct(undefined);
    setCantProduct(undefined);
    setPrecioUnitario(undefined);
    setError('');
    prodRef.current?.focus();
  };

  const handleDescription = () => {
    const productos = [...tableProducts];
    const lastProduct = productos[productos.length - 1].producto;
    if (!lastProduct) return productos;
    lastProduct.artDescripcion =
      lastProduct.artDescripcion + '\n' + descRef.current?.value;

    return productos;
  };
  const handleFacturar = async () => {
    if (!currentClient || !tableProducts) return;
    setLoading(true);
    const modifiedProduts = handleDescription();
    const products = modifiedProduts.map(({ producto, cantidad, precioUnitario }) => ({
      idfCodigoProducto: producto?.artId as string,
      idfDescripcion: producto?.artDescripcion as string,
      idfCantidad: cantidad as string,
      idfPrecioUnitario: precioUnitario
        ? precioUnitario
        : (producto?.artPrecio as number).toString(),
      idfMontoDescuento: '0',
    }));

    const data = {
      factura: [
        {
          facId: crypto.randomUUID(),
          ttxId: 'FVE',
          facCodigoDocumentoSector: 'DS1',
          dirId: currentClient.dirId as string,
          facCodigoMetodoPago: 'MP1',
          facCodigoMoneda: 'MO1',
          sucId: '7',
          pveId: '0',
          facNumeroTarjeta: '',
          facTipoCambio: '1',
          facDescuentoAdicional: '0',
          facMontoGiftCard: '0',
          facUsuario: 'DEMO',
          facNombreEstudiante: '',
          facPeriodoFacturado: '',
          facEnviaFactura: '1',
          facturaDetalle: products,
        },
      ],
    };
    console.log('🚀 ~ file: index.tsx:249 ~ handleFacturar ~ data', JSON.stringify(data));

    const facturarResponse = await postFacturar(data);
    console.log('🚀 ~ file: index.tsx:251 ~ handleFacturar ~ data', JSON.stringify(data));
    console.log(
      '🚀 ~ file: index.tsx:251 ~ handleFacturar ~ facturarResponse',
      facturarResponse,
    );
    if (facturarResponse.state === 'error') return;
    const result = facturarResponse.result[0];
    try {
      isImpuestosResponse(result);

      setImpuestosResponse(result.Qr);
    } catch (err) {
      console.log('🚀 ~ file: fac-form.tsx:226 ~ handleFacturar ~ err:', err);
      setImpuestosResponse(`Error:  ${facturarResponse.code} - ${facturarResponse.msg}`);
    }
    setOpened(true);
    setLoading(false);
  };

  const rows = useMemo(
    () =>
      tableProducts?.map(({ producto, cantidad, precioUnitario }, index) => (
        <tr key={(producto?.artId as string) + index}>
          <td>{index + 1}</td>
          <td>{producto?.artNombre}</td>
          <td>{cantidad}</td>
          <td>{precioUnitario}</td>
          <td>
            {producto?.artDescripcion
              ? producto?.artDescripcion
              : producto?.artNombre
              ? producto?.artNombre
              : '-'}
          </td>
          <td>
            <Center>
              <Button compact onClick={() => handleRemoveItem(producto as Producto)}>
                -
              </Button>
            </Center>
          </td>
        </tr>
      )),
    [tableProducts],
  );

  const handleRemoveItem = (itemToRemove: Producto) => {
    const newTableProducts = tableProducts.filter(
      (item) => item.producto !== itemToRemove,
    );
    setTableProducts(newTableProducts);
  };
  return (
    <>
      <Modal
        size={'70%'}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Impuestos"
      >
        <a href={impuestosResponse}>{impuestosResponse}</a>
      </Modal>

      <Stack>
        <Select
          label="Cliente"
          placeholder="Pick one"
          searchable
          onChange={handleSelectClient}
          onKeyUp={dirOnSearch}
          nothingFound="No options"
          value={currentClient ? currentClient.dirId : ''}
          data={clientesSelect}
        />
        <Flex justify="flex-end" align="flex-end" gap="lg">
          <Select
            onKeyUp={prodOnSearch}
            label="Producto"
            ref={prodRef}
            placeholder="Pick one"
            onChange={handleSelectProduct}
            value={currentProduct ? currentProduct.producto?.artId : ''}
            searchable
            nothingFound="No options"
            data={productosSelect}
            sx={{ flex: 1 }}
          />
          <NumberInput
            startValue={0}
            placeholder={'0'}
            onChange={handleCantChange}
            value={cantProduct ? cantProduct : 0}
            label="Cantidad"
          />
          <NumberInput
            startValue={0}
            placeholder={'0'}
            onChange={handlePrecioChange}
            value={precioUnitario ? precioUnitario : 0}
            precision={2}
            min={-1}
            step={0.05}
            label="Precio U"
          />
          <Button onClick={handleAddProduct}>Agregar</Button>
        </Flex>
        <Text color={'red'} align="center">
          {error}
        </Text>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio U</th>
              <th>Descripcion</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <Textarea label="Modificar Descripccion del ultio producto" ref={descRef} />
        <Button onClick={handleFacturar} loading={loading}>
          Facturar
        </Button>
      </Stack>
    </>
  );
};

export default Facturar;
