import {
    useState,
    useEffect
} from 'react';
import { Input } from 'rsuite';
import { useQuery } from '@tanstack/react-query';
import { instanceAxios } from '../../services/axios/axios';
import {
    Table,
    Button
} from 'rsuite';

const {
    Column,
    HeaderCell,
    Cell
} = Table;

interface Product {
    id: number;
    p_name: string;
    sale_price: number;
    supplier: string;
    qty_stock: number;
}

interface AddedItem {
    id: number;
    p_name: string;
    price: number;
    quantity: number;
}

interface SearchProductProps {
    onAddItems: (items: AddedItem[]) => void;
}

export function SearchProduct({ onAddItems }: SearchProductProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Product[]>([]);
    const [addedItems, setAddedItems] = useState<AddedItem[]>([]);
    const { data, isError, error, refetch } = useQuery<Product[]>({
        queryKey: ['searchProduct'],
        queryFn: async () => {
            const response = await instanceAxios.get('/products');
            return response.data;
        },
    });

    useEffect(() => {
        if (data && searchTerm) {
            const filtered = data.filter(item =>
                item.p_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData([]);
        }
    }, [data, searchTerm]);

    useEffect(() => {
        onAddItems(addedItems);
    }, [addedItems, onAddItems]);

    const handleAddItem = (id: number, price: number, quantity: number, p_name: string) => {
        setAddedItems(prevItems => [...prevItems, { id, price, quantity, p_name }]);
    };

    const handleRemoveItem = (id: number) => {
        setAddedItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    return (
        <div className="w-full h-full">
            <Input
                placeholder="Buscar Produto"
                value={searchTerm}
                onChange={(value: string) => setSearchTerm(value)}
            />
            <Table
                height={400}
                data={filteredData}
            >
                <Column width={60} align="center" fixed>
                    <HeaderCell hidden={true}>Id</HeaderCell>
                    <Cell hidden={true} dataKey="id" />
                </Column>

                <Column width={150}>
                    <HeaderCell>Produto</HeaderCell>
                    <Cell dataKey="p_name" />
                </Column>

                <Column width={150}>
                    <HeaderCell>Valor</HeaderCell>
                    <Cell dataKey="sale_price" />
                </Column>

                <Column width={100}>
                    <HeaderCell>Fornecedor</HeaderCell>
                    <Cell dataKey="supplier" />
                </Column>

                <Column width={100}>
                    <HeaderCell>Estoque</HeaderCell>
                    <Cell dataKey="qty_stock" />
                </Column>

                <Column width={250} fixed="right">
                    <HeaderCell>...</HeaderCell>
                    <Cell style={{ padding: '6px' }}>
                        {(rowData: Product) => {
                            const addedItem = addedItems.find(item => item.id === rowData.id);
                            return (
                                <div className="flex items-center">
                                    <Button
                                        className="mx-2"
                                        appearance="link"
                                        onClick={() => addedItem ? handleRemoveItem(rowData.id) : handleAddItem(rowData.id, rowData.sale_price, 1, rowData.p_name)}
                                    >
                                        {addedItem ? 'Remover' : 'Adicionar'}
                                    </Button>
                                    {addedItem && (
                                        <Input
                                            placeholder="qty"
                                            className="ml-2 w-24"
                                            value={addedItem.quantity.toString()}
                                            onChange={(value) => {
                                                const quantity = parseInt(value, 10);
                                                if (!isNaN(quantity) && quantity <= rowData.qty_stock) {
                                                    setAddedItems(prevItems =>
                                                        prevItems.map(item =>
                                                            item.id === rowData.id
                                                                ? { ...item, quantity }
                                                                : item
                                                        )
                                                    );
                                                } else if (value === '') {
                                                    setAddedItems(prevItems =>
                                                        prevItems.map(item =>
                                                            item.id === rowData.id
                                                                ? { ...item, quantity: 0 }
                                                                : item
                                                        )
                                                    );
                                                } else {
                                                    alert(`Quantidade não pode ser maior que o estoque (${rowData.qty_stock})`);
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        }}
                    </Cell>
                </Column>
            </Table>
        </div>
    );
}
