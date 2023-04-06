import { Error } from './';
import { useSelectMonedas } from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas';

import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useState } from 'react';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`
const InputText = styled.input`
    border: none;
    width: 93%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
`
const Label = styled.label`
    color: #FFF;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`

export const Formulario = ({ setMonedas, setMonto, monto }) => {

    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas );
    const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Seleccionar tu Criptomoneda', criptos );
    
    useEffect(() => {
    
        const consultarApi = async() => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const data = await fetch(url);
            const respuesta = await data.json();

            const arrayCritpo = respuesta.Data.map ( cripto => {

                const objeto = {
                    id : cripto.CoinInfo.Name,
                    nombre :cripto.CoinInfo.FullName, 
                }
                
                return objeto;
            })
            
            setCriptos(arrayCritpo)
        }

        consultarApi();

    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if([moneda, criptomoneda].includes('')) {
            setError(true)
            return
        }
        setError(false);

        setMonedas({
            moneda,
            criptomoneda
        })
    }

  return (
    <>
        { error && <Error>Todos los campos son obligatorios</Error> }
        <form
            onSubmit={ handleSubmit }
        >
            <SelectMonedas />
            <SelectCriptomoneda />

            <Label> Ingresa un monto </Label>

        
            <InputText
                type='number'
                value={ monto }
                onChange={e => setMonto(e.target.value)}
            />
            <InputSubmit
                type='submit'
                value='Cotizar'
            />
        </form>
    </>
  )
}
